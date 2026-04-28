import { cookies } from "next/headers";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

const EQUIPMENT = [
  {
    id: "DS-2D-001",
    name: "2D 머신비전 #1",
    type: "2D",
    status: "가동",
    uptime: 98.2,
    dailyInspections: 1240,
    lastMaintenance: "2026-04-25",
    customer: "고객사 A",
  },
  {
    id: "DS-2D-002",
    name: "2D 머신비전 #2",
    type: "2D",
    status: "가동",
    uptime: 97.8,
    dailyInspections: 1180,
    lastMaintenance: "2026-04-26",
    customer: "고객사 B",
  },
  {
    id: "DS-3D-001",
    name: "3D 머신비전 #1",
    type: "3D",
    status: "점검",
    uptime: 94.1,
    dailyInspections: 0,
    lastMaintenance: "2026-04-29",
    customer: "—",
  },
  {
    id: "DS-AI-001",
    name: "AI 분석 서버",
    type: "서버",
    status: "가동",
    uptime: 99.9,
    dailyInspections: null,
    lastMaintenance: "2026-04-20",
    customer: "—",
  },
];

const COMPANY_METRICS = [
  { label: "이번 달 매출",    value: "₩1.2억",  sub: "전월 比 +18%" },
  { label: "수주 잔고",       value: "₩4.8억",  sub: "3건 진행 중" },
  { label: "현재 고객사",     value: "8개사",    sub: "이번 달 2개 신규" },
  { label: "누적 검사 건수",  value: "1.2M",    sub: "금일 12,847건" },
];

const TEAM = [
  { name: "한기준",  role: "CEO",            dept: "경영" },
  { name: "김무진",  role: "CTO",            dept: "기술" },
  { name: "박영진",  role: "COO / 연구소장", dept: "운영" },
  { name: "이하은",  role: "선임 연구원",    dept: "연구소" },
  { name: "김진우",  role: "소프트웨어 개발자", dept: "개발" },
];

const NOTICES = [
  { date: "2026-04-28", content: "DS-3D-001 정기 점검 — 4/29 ~ 4/30 (2일간)" },
  { date: "2026-04-25", content: "시리즈 A 투자 서류 검토 완료, 5월 중 클로징 예정" },
  { date: "2026-04-20", content: "고객사 C 파일럿 프로젝트 계약 체결" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    가동: "text-emerald-400 bg-emerald-400/10",
    점검: "text-amber-400 bg-amber-400/10",
    이상: "text-red-400 bg-red-400/10",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] ?? "text-slate-400 bg-slate-400/10"}`}>
      {status}
    </span>
  );
}

function KpiCard({ label, value, sub, accent, large }: { label: string; value: string; sub: string; accent: string; large?: boolean }) {
  return (
    <div className={`bg-slate-900 rounded-xl border border-slate-800 ${large ? "p-6" : "p-5"}`}>
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <p className={`font-bold ${accent} ${large ? "text-3xl" : "text-2xl"}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await decrypt(token);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "long",
  });

  return (
    <div>
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-slate-500 text-sm mt-1">
          {today}
          {session && (
            <span className="text-slate-400"> · {session.name}님 안녕하세요.</span>
          )}
        </p>
      </div>

      {/* KPI row — 핵심 경영 지표 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <KpiCard label="현재 수주 잔고" value="₩4.8억" sub="3건 진행 중" accent="text-emerald-400" large />
        <KpiCard label="올해 매출 (누계)" value="₩7.2억" sub="전년 比 +112%" accent="text-blue-400" large />
        <KpiCard label="올해 수주 건수" value="12건" sub="전년 比 +8건" accent="text-amber-400" large />
      </div>


      {/* Equipment table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">장비 현황</h2>
          <span className="text-xs text-slate-500">더미 데이터 · 실제 연동 예정</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {["장비 ID", "장비명", "유형", "상태", "가동률", "금일 검사", "마지막 점검", "고객사"].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap ${h === "가동률" || h === "금일 검사" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {EQUIPMENT.map((eq) => (
                <tr key={eq.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{eq.id}</td>
                  <td className="px-5 py-3.5 font-medium text-white">{eq.name}</td>
                  <td className="px-5 py-3.5 text-slate-400">{eq.type}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={eq.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right text-white">{eq.uptime}%</td>
                  <td className="px-5 py-3.5 text-right text-slate-300">
                    {eq.dailyInspections !== null
                      ? eq.dailyInspections.toLocaleString() + "건"
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{eq.lastMaintenance}</td>
                  <td className="px-5 py-3.5 text-slate-400">{eq.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom grid: company metrics + team + notices */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Company metrics */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">회사 현황</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5">
            {COMPANY_METRICS.map((m) => (
              <div key={m.label} className="bg-slate-800/60 rounded-lg p-3.5">
                <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                <p className="text-lg font-bold text-white">{m.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">팀 현황</h2>
          </div>
          <ul className="divide-y divide-slate-800/60">
            {TEAM.map((member) => (
              <li key={member.name} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-semibold shrink-0">
                  {member.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white leading-tight">{member.name}</p>
                  <p className="text-xs text-slate-500 truncate">{member.role}</p>
                </div>
                <span className="ml-auto text-xs text-slate-600 shrink-0">{member.dept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notices */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">공지사항</h2>
          </div>
          <ul className="divide-y divide-slate-800/60">
            {NOTICES.map((n, i) => (
              <li key={i} className="px-5 py-3.5">
                <p className="text-xs text-slate-500 mb-1">{n.date}</p>
                <p className="text-sm text-slate-300 leading-snug">{n.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
