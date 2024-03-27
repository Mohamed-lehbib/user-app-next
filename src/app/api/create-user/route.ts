import { createUser } from "@/queries/user/create-user/createUser";

export async function POST(req: Request) {
    const body = await req.json();
    // console.log(body);
    // console.log(req);
    const {name, email, password, role}= body
    createUser(name, email, password, role);
    return new Response('ok', {status: 201});
}