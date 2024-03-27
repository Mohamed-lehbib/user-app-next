import { createUser } from "@/queries/user/create-user/createUser";
import { getUserById } from "@/queries/user/get-user-by-id/getUserById";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  // console.log(`this is from the api ${id}`);
  try {
    if (id) {
      const user = await getUserById(id);
      // console.log(user);
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
