import { supabase } from "@/lib/supabase";
import { uploadUserImage } from "../upload-user-image/uploadUserImage";
import { uploadUserFiles } from "../upload-user-files/uploadUserFiles";

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string,
  image?: File,
  documents?: File[]
): Promise<void> {
  try {
    let imageId: string | null = null;
    if (image) {
      imageId = await uploadUserImage(image);
    }

    let listFilesDocuments: string[] | null = null;
    if (documents && documents.length > 0) {
      listFilesDocuments = await uploadUserFiles(documents);
    }

    // Insert user into the "users" table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          role,
          image_id: imageId,
          files: listFilesDocuments,
        },
      ]);

    if (userError) {
      throw userError;
    }

    console.log("User created successfully:", userData);
  } catch (error) {
    console.error("Error creating user:", (error as Error).message);
    throw error;
  }

  // const { data, error } = await supabase
  // .storage
  // .listBuckets()
  // console.log(data);
}
