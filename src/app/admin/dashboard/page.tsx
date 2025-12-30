"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

interface Booking {
  id: string;
  name: string;
  phone: string;
  game: string;
  players: string;
  date: string;
  startTime?: string;
  endTime?: string;
  screenshotName?: string;
  createdAt: Timestamp; // <-- Firebase Timestamp
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Timestamp; // <-- Firebase Timestamp
  lastLogin: Timestamp; // <-- Firebase Timestamp
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notifiedBookings, setNotifiedBookings] = useState<Set<string>>(new Set());

  // Load bookings and users
  useEffect(() => {
    const bookingsQuery = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const data: Booking[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Booking, "id">)
      }));
      setBookings(data);
    });

    const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const data: User[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">)
      }));
      setUsers(data);
    });

    return () => {
      unsubscribeBookings();
      unsubscribeUsers();
    };
  }, []);

  // Notify for active bookings only
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      bookings.forEach((b) => {
        if (b.startTime && b.endTime && !notifiedBookings.has(b.id)) {
          const startDateTime = new Date(`${b.date}T${b.startTime}`).getTime();
          const endDateTime = new Date(`${b.date}T${b.endTime}`).getTime();

          if (startDateTime <= now && endDateTime > now) {
            toast.success(`Booking for ${b.name} is active`);
            setNotifiedBookings((prev) => new Set(prev).add(b.id));
          }
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [bookings, notifiedBookings]);

  // Delete booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      toast.success("Booking deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking");
    }
  };

  // Delete user
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Bookings Table */}
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="min-w-full border border-gray-700 mb-10">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">Game</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Players</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Screenshot</th>
              <th className="px-4 py-2 border">Booked At</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="text-center bg-gray-900 text-white">
                <td className="px-4 py-2 border">{b.game}</td>
                <td className="px-4 py-2 border">{b.name}</td>
                <td className="px-4 py-2 border">{b.phone}</td>
                <td className="px-4 py-2 border">{b.players}</td>
                <td className="px-4 py-2 border">{b.date}</td>
                <td className="px-4 py-2 border">{b.startTime || "-"}</td>
                <td className="px-4 py-2 border">{b.endTime || "-"}</td>
                <td className="px-4 py-2 border">{b.screenshotName || "-"}</td>
                <td className="px-4 py-2 border">{b.createdAt.toDate().toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteBooking(b.id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Users Table */}
      <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Last Login</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="text-center bg-gray-900 text-white">
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.username}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">{u.createdAt.toDate().toLocaleString()}</td>
                <td className="px-4 py-2 border">{u.lastLogin.toDate().toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
