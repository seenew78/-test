import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie":
        "admin_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
    },
  });
};
