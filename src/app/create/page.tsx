"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateUserForm() {
  const router = useRouter(); // Use Next.js useRouter hook for navigation
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Correctly include null as a type for the imageFile state
  const [documentFiles, setDocumentFiles] = useState<File[]>([]); // For document uploads

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // // Prepare FormData for file upload
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("role", role);
    // if (imageFile) {
    //   formData.append("imageFile", imageFile);
    // }
    // documentFiles.forEach((file, index) =>
    //   formData.append(`documentFiles[${index}]`, file)
    // );
    // // Convert single image file to Base64
    // const imageFileBase64 = imageFile ? await fileToBase64(imageFile) : null;

    // // Convert each document file to Base64
    // const documentFilesBase64Promises = documentFiles.map((file) =>
    //   fileToBase64(file)
    // );
    // const documentFilesBase64 = await Promise.all(documentFilesBase64Promises);

    const data = {
      name: name,
      email: email,
      password: password,
      role: role,
      // imageFile: imageFileBase64,
      // documentFiles: documentFilesBase64,
    };
    try {
      // console.log(formData);
      // console.log(data);
      const response = await fetch("/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
        // body: JSON.stringify(formData),
        // body: formData,
        // body: JSON.stringify({ name: "ahmed" }),
        body: JSON.stringify(data),
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

  const handleDocumentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentFiles(Array.from(e.target.files));
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
        {/* <div>
          <label htmlFor="imageFile" className="block mb-1">
            Profile Image
          </label>
          <input
            type="file"
            id="imageFile"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImageFile(
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : null
              )
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="documentFiles" className="block mb-1">
            Document Files
          </label>
          <input
            type="file"
            id="documentFiles"
            onChange={handleDocumentFileChange}
            multiple
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div> */}
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
