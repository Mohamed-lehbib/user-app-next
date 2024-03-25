import { UUID } from "crypto";

type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: string;
    image_id?: UUID;
    image_url?: string;
    image_name?: string;
    files?: UUID[];
    files_url?: string[];
    file_names?: string[];
  };
