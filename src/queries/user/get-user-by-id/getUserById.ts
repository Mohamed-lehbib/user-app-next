import { supabase } from "@/lib/supabase";
import { User } from "@/data/types/user";
import { getPublicUrl } from "../get-public-url/getPublicUrl";

export async function getUserById(
  id: string | undefined
): Promise<User | null> {
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
      user.files_url = [];
      user.file_names = [];
      if (user.image_id) {
        const imageData = await getPublicUrl(user.image_id, "profil_image");
        user.image_url = imageData?.publicUrl;
        user.image_name = imageData?.fileName;
      }

      const files_id = user.files;
      if (files_id && files_id.length > 0) {
        for (let file_id of files_id) {
          const fileUrl = await getPublicUrl(file_id, "userFile");
          if (fileUrl) {
            user.files_url.push(fileUrl.publicUrl);
            // Extract only the file name without the file path
            const fileName = fileUrl.fileName.split("/").pop();
            if (fileName) {
              user.file_names.push(fileName);
            }
          }
        }
      }
      console.log(`file Name: ${user.file_names}`);
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
