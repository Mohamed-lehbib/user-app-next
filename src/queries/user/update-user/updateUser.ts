import { User } from "@/data/types/user";
import { uploadUserImage } from "../upload-user-image/uploadUserImage";
import { supabase, supabaseService } from "@/lib/supabase";
import { UserType } from "@/data/types/collection";

export async function updateUser(
  user: UserType,
  // addedFiles?: File[],
  // deletedFiles?: { file_id: string; file_name: string }[],
  // image?: File
): Promise<void> {
  try {
    // Extract user details
    const { id, name, email, password, role } = user;

    // Update user details
    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({ name, email, password, role })
      .eq("id", id);

    if (userError) {
      throw userError;
    }

    // console.log("User details updated successfully:", userData);

    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", (error as Error).message);
    throw error;
  }
}
