import { supabaseService } from "@/api/config/supabase";

export async function uploadUserImage(image: File): Promise<string | null> {
  const { v4: uuidv4 } = require("uuid");

  let imageId: string | null = null;

  if (image) {
    // Sanitize the file name
    const originalFileName = image.name;
    const sanitizedFileName = originalFileName.replace(/[^\w\s.-]/gi, " "); // Replace special characters with spaces
    const modifiedFile = new File([image], sanitizedFileName);

    // Upload the modified image file
    const { data, error } = await supabaseService.storage
      .from("profil_image")
      .upload(`/${uuidv4()}/${sanitizedFileName}`, modifiedFile);

    if (error) {
      throw error;
    }

    // Retrieve the uploaded image ID
    const dataAny = data as any;
    console.log(data);
    imageId = dataAny?.id;
  }

  return imageId;
}
