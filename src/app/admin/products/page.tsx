"use client";

import AdminGuard from "@/components/AdminGuard";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

// Firestore product ka type
interface Product {
  id: string;
  name: string;
  createdAt: number; // Date.now() use kiya hai
}

export default function Products() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  // Add new product
  const addProduct = async () => {
    if (!name.trim()) return; // Empty name prevent
    await addDoc(collection(db, "products"), {
      name,
      createdAt: Date.now(),
    });
    setName("");
    fetchProducts();
  };

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    const data: Product[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Product, "id">),
    }));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminGuard>
      <div style={{ padding: 40 }}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <div className="flex gap-2 mb-6">
          <input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field px-2 py-1 rounded border"
          />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="bg-gray-800 text-white px-4 py-2 rounded">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </AdminGuard>
  );
}
