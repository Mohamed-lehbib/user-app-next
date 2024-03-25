import RoleFilter from "@/components/roleFilter";
import SearchBar from "@/components/searchBar";
import UserTable from "@/components/userTable";
import { User } from "@/data/types/user";
import { getAllUsers } from "@/queries/user/get-all-users/getAllUsers";
import { GetServerSideProps } from "next";
import Image from "next/image";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const searchQuery = Array.isArray(context.query.search)
//     ? context.query.search[0]
//     : context.query.search || "";
//   const selectedRole = Array.isArray(context.query.role)
//     ? context.query.role[0]
//     : context.query.role || "";

//   // Fetch your users based on these parameters
//   const users = await getAllUsers(searchQuery, selectedRole);

//   return { props: { users } };
// };

export default async function Home() {
  // { users }: { users: User[] }
  // const users = await getAllUsers(searchQuery, selectedRole);
  const users = await getAllUsers();
  return (
    <div>
      <SearchBar />
      <RoleFilter />
      <UserTable users={users} />
    </div>
  );
}
