"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";

export default function ValorantPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [players, setPlayers] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const startDateTime = new Date(`${date}T${startTime}`);
      const endDateTime = new Date(`${date}T${endTime}`);

      if (endDateTime <= startDateTime) {
        toast.error("End time must be after start time!");
        setLoading(false);
        return;
      }

      // Check if already booked
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("game", "==", "VALORANT"),
        where("date", "==", date)
      );
      const snapshot = await getDocs(q);

      let conflict = false;
      snapshot.forEach((doc) => {
        const data = doc.data();
        const bookedStart = new Date(`${data.date}T${data.startTime}`);
        const bookedEnd = new Date(`${data.date}T${data.endTime}`);
        if (
          (startDateTime >= bookedStart && startDateTime < bookedEnd) ||
          (endDateTime > bookedStart && endDateTime <= bookedEnd)
        ) {
          conflict = true;
        }
      });

      if (conflict) {
        toast.error("This time slot is already booked!");
        setLoading(false);
        return;
      }

      // Save booking
      await addDoc(collection(db, "bookings"), {
        game: "VALORANT",
        name,
        phone,
        players,
        date,
        startTime,
        endTime,
        screenshotName: screenshot?.name || null,
        createdAt: serverTimestamp(),
      });

      toast.success("Booking successful!");

      // Reset form
      setName("");
      setPhone("");
      setPlayers("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setScreenshot(null);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-10 py-10 bg-gray-900 text-white">
      {/* Banner */}
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
        <Image
          src="/VALORANT.png" // ✅ public folder path
          alt="VALORANT Banner"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col md:flex-row gap-6 mt-6 items-start">
        <Image
          src="/VALORANT.png"
          alt="Valorant Thumbnail"
          width={112}
          height={112}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold mt-4 md:mt-0">VALORANT</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Valorant is a competitive 5v5 tactical shooter developed by Riot Games.
            Players choose unique “Agents,” each with special abilities, and compete
            in fast-paced rounds focused on strategy, precise gunplay, and teamwork.
            One team attacks by planting a bomb-like “Spike,” while the other defends
            and tries to stop them. The first team to win the required number of rounds
            takes the match.
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-[#1f5b6b] p-8 rounded-xl max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="p-2 rounded text-black"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="p-2 rounded text-black"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className="p-2 rounded text-black"
            placeholder="No of Players"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            required
          />
          <input
            type="date"
            className="p-2 rounded text-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="p-2 rounded text-black"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            className="p-2 rounded text-black"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div className="mt-6">
          <p className="text-sm">
            PAYMENT (03125056411 EASYPAISA) : Add Screenshot
          </p>
          <input
            type="file"
            className="mt-2"
            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 bg-blue-700 px-8 py-2 rounded text-white"
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
