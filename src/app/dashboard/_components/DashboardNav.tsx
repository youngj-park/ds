"use client";

import { useRouter } from "next/navigation";

interface Props {
  name: string;
  role: string;
}

export default function DashboardNav({ name, role }: Props) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs select-none">
              DS
            </div>
            <span className="text-white font-semibold text-sm">내부 대시보드</span>
            <span className="hidden sm:block text-slate-700 text-xs ml-1">
              · 임직원 전용
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium leading-tight">{name}</p>
              <p className="text-slate-500 text-xs">{role}</p>
            </div>
            <button
              onClick={logout}
              className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-md transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
