import { ExternalLink, GitBranch, Mail } from "lucide-react";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-white font-bold text-lg">
                DS
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-base tracking-widest">
                  DEEPSEERS
                </span>
                <span className="text-slate-500 text-xs">{COMPANY_INFO.nameKo}</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-4">
              어드밴스드 반도체 시장을 혁신하는 차세대 AI 머신비전 솔루션
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <span className="text-slate-400 font-medium">본사</span>{" "}
                {COMPANY_INFO.addressHQ}
              </p>
              <p>
                <span className="text-slate-400 font-medium">연구소</span>{" "}
                {COMPANY_INFO.addressLab}
              </p>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">바로가기</h3>
            <nav aria-label="푸터 내비게이션">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + SNS */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">연락처</h3>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-sm text-slate-400 hover:text-white transition-colors break-all"
              >
                {COMPANY_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent/80 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href={COMPANY_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent/80 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <GitBranch size={16} />
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent/80 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="이메일 문의"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2025 DeepSeers. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              이용약관
            </a>
            <a
              href="/dashboard"
              className="opacity-20 hover:opacity-100 transition-opacity"
              aria-label="내부 대시보드"
            >
              대시보드
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
