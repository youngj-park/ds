import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, SESSION_COOKIE } from "@/lib/session";
import DashboardNav from "./_components/DashboardNav";

export const metadata = { title: "내부 대시보드 · DEEPSEERS" };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await decrypt(token);

  if (!session) redirect("/dashboard/login");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardNav name={session.name} role={session.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
