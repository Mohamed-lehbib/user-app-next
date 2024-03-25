"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  // const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // router.push(`/?search=${searchQuery}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
