// invite-helpers.js
// Shared by household.html, index.html, and trip.html — anywhere a new
// invite gets created. Prevents the same email from ending up as two
// disconnected `people` documents when they're invited to more than one
// context (a household AND a trip, say) before accepting either.
import {
  collection, doc, query, where, getDocs, addDoc, updateDoc, arrayUnion, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Looks up a person by email. Tries the normalized emailLower field first
// (used for anyone created through the invite flow), then falls back to an
// exact-match on the plain email field — needed for people whose record
// was created before emailLower existed, or via self-signup/household
// self-heal, which don't set it.
export async function findPersonByEmail(db, email) {
  const emailLower = email.trim().toLowerCase();
  const q1 = query(collection(db, 'people'), where('emailLower', '==', emailLower));
  const snap1 = await getDocs(q1);
  if (!snap1.empty) return { id: snap1.docs[0].id, ...snap1.docs[0].data() };

  const q2 = query(collection(db, 'people'), where('email', '==', email.trim()));
  const snap2 = await getDocs(q2);
  if (!snap2.empty) return { id: snap2.docs[0].id, ...snap2.docs[0].data() };

  return null;
}

// Resolves a person record for a new invite context (a household or a
// trip), reusing an existing unclaimed record for that email instead of
// creating a duplicate. `context` is { type: 'household'|'trip', id }.
//
// Returns { personId, authUid, alreadyLinked }.
// - alreadyLinked=true means this person already has an account — the
//   caller should add personId+authUid directly and skip sending an invite.
// - alreadyLinked=false means an invite still needs to be created/sent;
//   the returned personId is the one to attach it to.
export async function resolvePersonForInvite(db, { name, email, householdId, context }) {
  const emailLower = email.trim().toLowerCase();
  const existing = await findPersonByEmail(db, email);

  if (existing && existing.authUid) {
    return { personId: existing.id, authUid: existing.authUid, alreadyLinked: true };
  }

  if (existing) {
    const updates = { pendingUidTargets: arrayUnion(context) };
    if (householdId && !existing.householdId) updates.householdId = householdId;
    await updateDoc(doc(db, 'people', existing.id), updates);
    return { personId: existing.id, authUid: null, alreadyLinked: false };
  }

  const personRef = await addDoc(collection(db, 'people'), {
    name, email, emailLower, authUid: null,
    householdId: householdId || null, isProfileOnly: false,
    pendingUidTargets: [context],
    createdAt: serverTimestamp()
  });
  return { personId: personRef.id, authUid: null, alreadyLinked: false };
}
