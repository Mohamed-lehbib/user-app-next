import UserTable from "@/components/userTable";
import { getAllUsers } from "@/queries/user/get-all-users/getAllUsers";
import SearchAndFilter from "@/components/searchAndFilter";
import CreateUserButton from "@/components/createUserButton";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string; role: string };
}) {
  // console.log(`search: ${searchParams.search}, role: ${searchParams.role}`);
  const users = await getAllUsers(searchParams.search, searchParams.role);

  return (
    // <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg">
    //   <SearchAndFilter />
    //   <div className="mt-8">
    //     <UserTable users={users} />
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">List of Users</h1>
        {/* <button
        onClick={() => router.push("/create-user")} // Adjust the path as necessary
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Create New User
      </button> */}
        <CreateUserButton />
      </div>
      <SearchAndFilter />
      <div className="mt-8">
        <UserTable users={users} />
      </div>
    </div>
  );
}
