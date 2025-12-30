"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Firestore me record karo kaun login hua
      await setDoc(doc(db, "adminLogins", userCred.user.uid), {
        email: email,
        loginAt: serverTimestamp(),
      });

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      // TypeScript safe way, 'any' avoid karte hue
      console.error(err); // optional, error log karne ke liye
      alert("Sirf admin hi login kar sakta hai");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      {/* NAVBAR */}
      <div
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Admin Login
      </div>

      {/* LOGIN BOX */}
      <div
        style={{
          margin: "60px auto",
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ color: "#666", marginBottom: "20px" }}>
          ⚠️ Email aur Password sirf <b>Admin</b> ke paas hota hai
        </p>

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", color:"black" }}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px", color:"black" }}
        />

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
