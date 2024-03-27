import UserTable from "@/components/userTable";
import { getAllUsers } from "@/queries/user/get-all-users/getAllUsers";
import SearchAndFilter from "@/components/searchAndFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string; role: string };
}) {
  console.log(`search: ${searchParams.search}, role: ${searchParams.role}`);
  const users = await getAllUsers(searchParams.search, searchParams.role);

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-lg">
      <SearchAndFilter />
      <div className="mt-8">
        <UserTable users={users} />
      </div>
    </div>
  );
}
