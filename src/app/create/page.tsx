"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "@/data/types/collection";

export default function CreateUserForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Ensure role uses the specific type from UserType (assuming it's exposed/importable for typing here)
  const [role, setRole] = useState<UserType["role"] | undefined>(undefined); // Temporary use `""` to allow for a default/no-selection state

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Before creating a user, you might need to upload files/image and get their identifiers
    // This step is omitted here for simplicity but should be included in your implementation

    // Validation example
    if (!role) {
      console.error("Please select a role.");
      return;
    }

    // Ensure the submitted data fits the UserType structure, except for file handling
    const userData: Omit<
      UserType,
      "id" | "created_at" | "image_id" | "files"
    > & { role: string } = {
      name,
      email,
      password,
      role, // Ensure role matches the expected type, though this line temporarily coerces it back to string for simplicity
    };

    try {
      const response = await fetch("/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User created successfully!");
        router.push("/");
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1">
            Role
          </label>
          <select
            id="role"
            value={role || ""} // Use the role or fallback to an empty string for the select value
            onChange={(e) => setRole(e.target.value as UserType["role"])}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="technician">Technician</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
