"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Auth me signup
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Firestore me user info save
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        username,
        email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      alert("Signup successful!");
      router.push("/login"); // redirect to login page
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/signupb1.png')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* signup card */}
      <div className="relative z-10 bg-black/70 p-10 rounded-xl w-[420px] text-white">
        <h2 className="text-2xl mb-6 text-center font-bold">SIGN-UP AND PLAY!</h2>

        <input
          className="input w-full text-black mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input w-full text-black mb-3"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input w-full text-black mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input w-full text-black mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="input w-full text-black mb-3"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="mt-6 w-full bg-primary py-2 rounded disabled:opacity-50"
          onClick={signup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "SIGN UP"}
        </button>
      </div>
    </section>
  );
}
