"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateUserButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/create")} // Adjust the path as necessary
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
    >
      Create New User
    </button>
  );
}
