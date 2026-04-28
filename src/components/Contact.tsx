"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Send, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "이름을 입력해주세요.";
  if (!form.email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }
  if (!form.subject.trim()) errors.subject = "제목을 입력해주세요.";
  if (!form.message.trim()) errors.message = "문의 내용을 입력해주세요.";
  else if (form.message.trim().length < 10)
    errors.message = "문의 내용을 10자 이상 입력해주세요.";
  return errors;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((node, i) => {
            (node as HTMLElement).style.transitionDelay = `${i * 100}ms`;
            node.classList.add("section-visible");
            node.classList.remove("section-hidden");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-200";
  const inputNormal = `${inputBase} border-surface-border focus:border-accent focus:ring-accent/20`;
  const inputError = `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-400/20`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-navy-900"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4 reveal section-hidden">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                Contact
              </span>
            </div>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-4 reveal section-hidden"
            >
              함께 시작해보세요
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 reveal section-hidden">
              데모 요청, 파트너십 문의, 솔루션 도입 상담 등 어떤 문의도
              환영합니다. 담당자가 빠르게 연락드리겠습니다.
            </p>

            <div className="flex flex-col gap-6">
              {/* HQ */}
              <div className="reveal section-hidden flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    본사
                  </p>
                  <p className="text-slate-200 text-sm">{COMPANY_INFO.addressHQ}</p>
                </div>
              </div>

              {/* Lab */}
              <div className="reveal section-hidden flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    기업부설연구소
                  </p>
                  <p className="text-slate-200 text-sm">{COMPANY_INFO.addressLab}</p>
                </div>
              </div>

              {/* Email */}
              <div className="reveal section-hidden flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                    이메일
                  </p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-200 text-sm hover:text-accent transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal section-hidden">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center rounded-2xl bg-white/5 border border-white/10 p-12">
                <CheckCircle2 size={52} className="text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  문의가 접수되었습니다
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  빠른 시일 내에 담당자가 연락드리겠습니다.
                  <br />
                  감사합니다.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col gap-5"
                aria-label="문의하기 폼"
              >
                {[
                  { id: "name", label: "이름", type: "text", placeholder: "홍길동", autoComplete: "name" },
                  { id: "email", label: "이메일", type: "email", placeholder: "example@company.com", autoComplete: "email" },
                  { id: "subject", label: "제목", type: "text", placeholder: "문의 제목을 입력해주세요", autoComplete: "off" },
                ].map(({ id, label, type, placeholder, autoComplete }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
                      {label} <span className="text-accent">*</span>
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      autoComplete={autoComplete}
                      placeholder={placeholder}
                      value={form[id as keyof FormState]}
                      onChange={handleChange}
                      className={errors[id as keyof FormState] ? inputError : inputNormal}
                      aria-invalid={!!errors[id as keyof FormState]}
                    />
                    {errors[id as keyof FormState] && (
                      <p className="mt-1 text-xs text-red-400" role="alert">
                        {errors[id as keyof FormState]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                    문의 내용 <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="문의하실 내용을 자유롭게 작성해주세요."
                    value={form.message}
                    onChange={handleChange}
                    className={`resize-none ${errors.message ? inputError : inputNormal}`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  문의 보내기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
