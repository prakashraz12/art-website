import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter
} from "firebase/firestore";
import { Arts } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugGenerator = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

export async function loginWithGoogle() {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
}

export async function fetchArtsPosts(
  pageSize: number,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
) {
  const blogPostsRef = collection(db, "arts-gallery");
  const postsQuery = lastDoc
    ? query(
        blogPostsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      )
    : query(blogPostsRef, orderBy("createdAt", "desc"), limit(pageSize));

  const querySnapshot = await getDocs(postsQuery);

  const artPosts: Arts[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Arts[];

  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { artPosts, lastVisibleDoc };
}
