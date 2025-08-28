import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register new user
export async function registerUser(email, password, name, location) {
  // 1. Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // 2. Assign team based on location
  let teamId = "default";
  if (location.toLowerCase().includes("north")) teamId = "team_north";
  if (location.toLowerCase().includes("south")) teamId = "team_south";

  // 3. Save profile in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    location,
    teamId,
    createdAt: new Date(),
  });

  return user;
}

// Login existing user
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}
