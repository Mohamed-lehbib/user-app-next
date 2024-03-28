import { UserType } from "@/data/types/collection";
import { createUser } from "@/queries/user/create-user/createUser";

export async function POST(req: Request) {
    try {
        const { name, email, password, role, image_id, files }: Partial<UserType> = await req.json();

        const user: Partial<UserType> = {
            name,
            email,
            password,
            role
        };

        if (!name || !email || !password || !role) {
            return new Response('Missing required fields', { status: 400 });
        }

        // Await the createUser function to ensure the user creation process completes
        await createUser(user as UserType);

        // If createUser successfully completes, send a 201 Created response
        return new Response('User created successfully.', { status: 201 });
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response if something goes wrong
        console.error("Error creating user:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
