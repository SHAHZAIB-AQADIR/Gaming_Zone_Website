"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-black/60 backdrop-blur-md">
      <div className="flex gap-6 text-sm">
        <Link href="/">HOME</Link>
        <Link href="/games">GAMES</Link>
      </div>

      <div className="flex gap-3">
        <Link href="/login" className="px-4 py-1 bg-primary rounded text-sm">
          LOGIN
        </Link>
        <Link href="/signup" className="px-4 py-1 bg-primary rounded text-sm">
          SIGNUP
        </Link>
        <button
          onClick={() => router.push("/admin/login")}
          className="px-4 py-1 bg-white text-black rounded text-sm font-bold"
        >
          Admin Login
        </button>
      </div>
    </nav>
  );
}
