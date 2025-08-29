import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register new user
export async function registerUser(
  email,
  password,
  firstName,
  lastName,
  username,
  phonenumber,
  province
) {
  // 1. Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // 2. Assign team based on location
  let teamId = "default";
  if (province.toLowerCase().includes("Gauteng")) teamId = "team_gauteng";
  if (province.toLowerCase().includes("Western Cape"))
    teamId = "team_western_cape";
  if (province.toLowerCase().includes("Eastern Cape"))
    teamId = "team_eastern_cape";
  if (province.toLowerCase().includes("Limpopo")) teamId = "limpopo";
  if (province.toLowerCase().includes("North West")) teamId = "north_west";
  if (province.toLowerCase().includes("Free State")) teamId = "free_state";
  if (province.toLowerCase().includes("Mpumalanga")) teamId = "team_mpumalanga";
  if (province.toLowerCase().includes("KwaZulu-Natal"))
    teamId = "team_kwazulu-natal";
  if (province.toLowerCase().includes("Northern Cape")) teamId = "northen_cape";

  // 3. Save profile in Firestore
  await setDoc(doc(db, "users", user.uid), {
    firstName,
    lastName,
    username,
    phonenumber,
    email,
    province,
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
