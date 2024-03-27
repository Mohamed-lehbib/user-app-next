"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function UpdateUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  //   const { id } = router.query;
  const id = params.id;
  // console.log(id);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const response = await fetch(`/api/users?id=${id}`);
      if (!response.ok) {
        console.error("Failed to fetch user.");
        return;
      }
      const data = await response.json();
      setUser(data);
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password || "");
      setRole(data.role);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Include the ID in the body
    const userData = {
      id: id,
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch(`/api/users/edit/${id}`, {
        // Adjusted URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      console.log("User updated successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-2">
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
            placeholder="Name"
          />
        </div>

        <div className="mb-2">
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
            placeholder="Email"
          />
        </div>

        <div className="mb-2">
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
            placeholder="Password"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="role" className="block mb-1">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value)
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="technician">Technician</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
