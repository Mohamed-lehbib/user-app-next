"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const roles = ["admin", "user", "technician"];

export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const newPath = `/?${searchQuery ? `search=${searchQuery}` : ""}${
      selectedRole ? `&role=${selectedRole}` : ""
    }`;
    router.push(newPath);
  }, [searchQuery, selectedRole]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name..."
        className="form-input px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
      />
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="form-select px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto"
      >
        <option value="">Filter by Role</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
