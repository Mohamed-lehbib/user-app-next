import { supabaseService } from "@/api/config/supabase";

export async function uploadUserFiles(documents: File[]): Promise<string[]> {
  const listFilesDocuments: string[] = [];
  const { v4: uuidv4 } = require("uuid");

  for (const document of documents) {
    const { data, error } = await supabaseService.storage
      .from("userFile")
      .upload(`/${uuidv4()}/${document.name}`, document);

    if (error) {
      throw error;
    }
    let dataAny = data as any;
    listFilesDocuments.push(dataAny?.id || "");
  }

  return listFilesDocuments;
}
