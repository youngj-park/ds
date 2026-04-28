export interface Employee {
  username: string;
  name: string;
  role: string;
  dept: string;
  email: string;
}

export const EMPLOYEES: Employee[] = [
  { username: "han",  name: "한기준", role: "CEO",            dept: "경영",   email: "han@deepseers.com" },
  { username: "kim",  name: "김무진", role: "CTO",            dept: "기술",   email: "kim@deepseers.com" },
  { username: "park", name: "박영진", role: "COO / 연구소장", dept: "운영",   email: "park@deepseers.com" },
];

// 각 직원의 비밀번호는 .env.local의 EMP_<username> 변수로 관리합니다.
// 예: EMP_han=DS2025han!
export function verifyPassword(username: string, password: string): boolean {
  const passwords: Record<string, string | undefined> = {
    han:  process.env.EMP_han,
    kim:  process.env.EMP_kim,
    park: process.env.EMP_park,
  };
  const stored = passwords[username];
  return !!stored && stored === password;
}
