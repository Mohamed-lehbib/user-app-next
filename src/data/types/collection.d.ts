import { Database } from "./supabase";

type UserType = Database["public"]["Tables"]["users"]["Row"]

type UserRoleEnum = Database["public"]["Enums"]["role"]