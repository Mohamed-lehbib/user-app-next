import { supabase } from "@/lib/supabase";
import { User } from "@/data/types/user";
import { getPublicUrl } from "../get-public-url/getPublicUrl";
import { UserType } from "@/data/types/collection";

export async function getUserById(
  id: string | undefined
): Promise<UserType | null> {

  if (id === undefined) {
    console.error("getUserById was called with an undefined id.");
    return null;
  }

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    if (error) {
      throw error;
    }

    if (users && users.length === 1) {
      const user = users[0];
      // console.log(`file Name: ${user.file_names}`);
      return user;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", (error as Error).message);
    return null;
  }
}
