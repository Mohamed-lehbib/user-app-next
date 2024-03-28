import { UserType } from "@/data/types/collection";
import { supabase } from "@/lib/supabase";

export async function createUser(user: UserType): Promise<void> {
  try {
    const { name, email, password, role} = user;
    
    const { error: userError } = await supabase.from("users").insert([
      {
        name,
        email,
        password,
        role
      },
    ]);

    if (userError) {
      throw userError;
    }

    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error instanceof Error ? error.message : "An unknown error occurred");
    throw error;
  }
}