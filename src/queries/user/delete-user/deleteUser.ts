import { supabase } from "@/lib/supabase";
import { deleteUserImage } from "../delete-user-image/deleteUserImage";

export async function deleteUser(
  id: number,
  image_name?: string
): Promise<void> {
  try {
    // Delete the user from the users table
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);
    if (userError) {
      throw userError;
    }

    if (image_name) {
      // Delete the user image
      await deleteUserImage(image_name);
    }
    console.log("User deleted successfully:", id);

  } catch (error) {
    console.error("Error deleting user:", (error as Error).message);
  }
}
