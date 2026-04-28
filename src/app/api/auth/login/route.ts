import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { EMPLOYEES, verifyPassword } from "@/lib/employees";
import { encrypt, SESSION_COOKIE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "아이디와 비밀번호를 입력해주세요." }, { status: 400 });
  }

  if (!verifyPassword(username, password)) {
    return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const employee = EMPLOYEES.find((e) => e.username === username);
  if (!employee) {
    return NextResponse.json({ error: "계정 정보를 찾을 수 없습니다." }, { status: 401 });
  }

  const token = await encrypt({ username: employee.username, name: employee.name, role: employee.role });
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
