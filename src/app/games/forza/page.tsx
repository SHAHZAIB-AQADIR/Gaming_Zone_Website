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

export default function FORZAPage() {
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
        where("game", "==", "FORZA"),
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
        game: "FORZA",
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

      const timeLeft = endDateTime.getTime() - new Date().getTime();
      setTimeout(() => {
        toast.success("Booking finished, you can book again.");
      }, timeLeft);

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
    <div className="min-h-screen px-10 py-10 text-black">
      {/* Banner */}
      <img
        src="/forza.png"
        className="w-full h-[500px] object-cover rounded-xl"
      />

      {/* Info */}
      <div className="flex gap-6 mt-6">
        <img src="/forza.png" className="w-28 rounded-lg" />
        <div>
          <h1 className="text-2xl text-white font-bold">FORZA</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Forza is a racing franchise offering realistic car handling, detailed vehicles, and gorgeous environments. Forza Horizon focuses on open-world exploration and street festivals, while Forza Motorsport delivers competitive track-style simulation racing.
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
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input-field"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className="input-field"
            placeholder="No of Players"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            required
          />
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="input-field"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            className="input-field"
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
          className="mt-8 bg-blue-700 px-8 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
