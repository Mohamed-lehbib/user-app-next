import { supabaseService } from "@/api/config/supabase";

export async function deleteUserImage(image_name: string): Promise<void> {
  try {
    const { data, error } = await supabaseService.storage
      .from("profil_image")
      .remove([image_name]);

    if (error) {
      throw error;
    }

    console.log("User image deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting user image:", (error as Error).message);
    throw error;
  }
}
