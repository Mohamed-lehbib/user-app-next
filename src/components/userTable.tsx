import { User } from "@/data/types/user";
import Link from "next/link";
import DeleteUserButton from "./deleteUserButton";

export default function UserTable({ users }: Readonly<{ users: User[] }>) {
  // console.log("hello world");
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex justify-start space-x-2">
                  <Link href={`/edit/${user.id}`}>
                    {/* <a className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"> */}
                    Edit
                    {/* </a> */}
                  </Link>
                  <DeleteUserButton
                    userId={user.id}
                    imageName={user.image_name}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
