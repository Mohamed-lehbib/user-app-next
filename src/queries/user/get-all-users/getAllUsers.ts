import { User } from "@/data/types/user";

import { supabase } from "@/lib/supabase";
import { SupabaseError } from "@/data/props/supabaseError";
import { getPublicUrl } from "../get-public-url/getPublicUrl";
import { v4 as uuidv4 } from 'uuid';
import { UserType } from "@/data/types/collection";

export async function getAllUsers(
  name?: string,
  role?: string
): Promise<UserType[]> {
  try {
    let query = supabase.from("users").select("*").neq("name", uuidv4());
    if (role) {
      query = query.eq("role", role);
    }
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const { data: users, error } = await query;

    if (error) {
      throw error as SupabaseError;
    }

    return users;
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message);
    return [];
  }
}
