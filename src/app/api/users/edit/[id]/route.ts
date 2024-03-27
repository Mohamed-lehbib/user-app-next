import { updateUser } from "@/queries/user/update-user/updateUser";
import { User } from "@/data/types/user";

export async function PUT(request: Request) {
  try {
    const userData = await request.json();

    const updatedUser = await updateUser(userData as User);

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Failed to update user:", error.message);
    return new Response(
      JSON.stringify({ message: "Failed to update user", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
