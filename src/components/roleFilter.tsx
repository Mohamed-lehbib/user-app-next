"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const roles = ["admin", "user", "technician"]; // Define roles as per your requirements

export default function RoleFilter() {
  const [selectedRole, setSelectedRole] = useState("");
  // const router = useRouter();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    // Update the URL search parameters, triggering server-side data fetching
    const newPath = `/?${e.target.value ? `role=${e.target.value}` : ""}`;
    // router.push(newPath);
  };

  return (
    <select value={selectedRole} onChange={handleRoleChange}>
      <option value="">Filter by Role</option>
      {roles.map((role, index) => (
        <option key={index} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}
