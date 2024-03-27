"use client";
import { deleteUser } from "@/queries/user/delete-user/deleteUser";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteUserButton({
  userId,
  imageName,
}: {
  userId: number;
  imageName?: string;
}) {
  const router = useRouter();
  function handleDelete(id: number, imageName?: string) {
    if (imageName) {
      deleteUser(id, imageName);
      router.refresh();
    } else {
      deleteUser(id);
      router.refresh();
    }
  }
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
      onClick={() => handleDelete(userId, imageName)}
    >
      Delete
    </button>
  );
}
