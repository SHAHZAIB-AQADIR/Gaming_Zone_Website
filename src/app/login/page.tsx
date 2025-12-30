"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Firestore me last login update karo
      await updateDoc(doc(db, "users", userCred.user.uid), {
        lastLogin: serverTimestamp(),
      });

      alert("Login successful!");
      router.push("/"); // home page
    } catch (err: unknown) {
      // Type narrowing
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/login-main.jpg')`,
        backgroundBlendMode: "screen",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* login card */}
      <div className="relative z-10 bg-black/70 p-10 rounded-xl w-[400px] text-white">
        <h2 className="text-2xl mb-6 text-center font-bold">
          WELCOME BACK CHAMPION!
        </h2>

        <input
          className="input w-full text-black mb-3"
          placeholder="Email"
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

        <button
          className="mt-6 w-full bg-primary py-2 rounded disabled:opacity-50"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </div>
    </main>
  );
}
