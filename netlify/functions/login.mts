import type { Context } from "@netlify/functions";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "seenew";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "seenew";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "아이디와 비밀번호를 입력해주세요.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "24h" });

      return new Response(
        JSON.stringify({ success: true, message: "로그인 성공" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `admin_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${24 * 60 * 60}`,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "아이디 또는 비밀번호가 틀렸습니다.",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "서버 내부 오류가 발생했습니다.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
