// 서비스 상수 — 정식 명칭 확정 시 이 파일만 수정
export const SERVICES = [
  {
    id: "ds-vision",
    name: "DS Vision",
    shortDesc: "AI 기반 반도체 외관 검사",
    description:
      "딥러닝 모델로 반도체 웨이퍼·패키지의 미세 결함을 실시간 자동 분류합니다. 기존 룰 기반 검사 대비 검출률 30% 향상.",
    icon: "Eye",
  },
  {
    id: "ds-analytics",
    name: "DS Analytics",
    shortDesc: "검사 데이터 통합 분석",
    description:
      "수율 트렌드, 불량 패턴, 공정 이상 징후를 한 화면에서 파악합니다. 팹 전체의 데이터를 연결해 인사이트로 변환합니다.",
    icon: "BarChart3",
  },
  {
    id: "ds-edge",
    name: "DS Edge",
    shortDesc: "온프레미스·엣지 배포 솔루션",
    description:
      "팹 내 폐쇄망 환경에서 초저지연 AI 추론을 구현합니다. 라인 속도에 맞춘 실시간 처리와 보안 격리를 동시에 달성합니다.",
    icon: "Cpu",
  },
  {
    id: "ds-consulting",
    name: "DS Consulting",
    shortDesc: "비전 검사 도입 컨설팅",
    description:
      "공정 분석부터 커스텀 모델 개발, 시스템 통합까지 전 과정을 지원합니다. 파트너사 환경에 최적화된 맞춤형 솔루션을 제공합니다.",
    icon: "ClipboardCheck",
  },
] as const;

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "박준혁",
    role: "CEO",
    bio: "전 삼성전자 반도체 품질 엔지니어 출신, 10년간 파운드리 검사 시스템 개발 총괄",
    initial: "박",
  },
  {
    id: 2,
    name: "이수연",
    role: "CTO",
    bio: "KAIST 전기전자공학 박사, 비전 AI·엣지 컴퓨팅 전문가, 특허 15건 보유",
    initial: "이",
  },
  {
    id: 3,
    name: "김태호",
    role: "VP of Engineering",
    bio: "전 SK하이닉스 자동화 시스템 팀장, 대규모 팹 인프라 설계 및 MLOps 전문",
    initial: "김",
  },
  {
    id: 4,
    name: "정하은",
    role: "Head of AI Research",
    bio: "서울대 AI연구소 출신, 반도체 결함 탐지 논문 20편 이상, NeurIPS·CVPR 발표",
    initial: "정",
  },
  {
    id: 5,
    name: "최민준",
    role: "Head of Sales",
    bio: "반도체 장비·소재 업계 15년 경력, 글로벌 팹리스 및 IDM 영업 네트워크 보유",
    initial: "최",
  },
  {
    id: 6,
    name: "오지영",
    role: "Head of Product",
    bio: "전 인텔 코리아 PM 출신, B2B SaaS 제품 기획 및 UX 설계 전문, MBA 보유",
    initial: "오",
  },
] as const;

export const NEWS_ITEMS = [
  {
    id: 1,
    date: "2026-04-15",
    category: "투자",
    title: "디에스, 시리즈 A 80억 원 투자 유치 완료",
    summary:
      "국내 주요 반도체 특화 VC로부터 80억 원 규모의 시리즈 A 투자를 유치하며 글로벌 시장 확대에 속도를 냅니다.",
  },
  {
    id: 2,
    date: "2026-03-22",
    category: "파트너십",
    title: "글로벌 반도체 장비사와 전략적 파트너십 체결",
    summary:
      "세계 3위 반도체 장비 기업과 공동 개발 협약을 체결, DS Vision 솔루션을 신규 장비 라인에 탑재하기로 합의했습니다.",
  },
  {
    id: 3,
    date: "2026-02-10",
    category: "제품",
    title: "DS Vision 2.0 출시 — 검출 정확도 99.7% 달성",
    summary:
      "차세대 멀티모달 AI 모델을 적용한 DS Vision 2.0이 공식 출시되었습니다. 기존 대비 결함 분류 속도 40% 향상.",
  },
  {
    id: 4,
    date: "2026-01-05",
    category: "수상",
    title: "2026 반도체 혁신 어워드 '최우수 스타트업' 선정",
    summary:
      "한국반도체산업협회 주관 '2026 반도체 혁신 어워드'에서 AI 검사 분야 최우수 스타트업으로 선정되었습니다.",
  },
] as const;

export const STATS = [
  { label: "설립연도", value: "2022", unit: "" },
  { label: "검사 정확도", value: "99.7", unit: "%" },
  { label: "도입 고객사", value: "40", unit: "+" },
  { label: "일일 처리량", value: "5M", unit: "+" },
] as const;

export const NAV_LINKS = [
  { label: "회사 소개", href: "#about" },
  { label: "서비스", href: "#services" },
  { label: "팀", href: "#team" },
  { label: "IR & News", href: "#news" },
  { label: "문의하기", href: "#contact" },
] as const;

export const COMPANY_INFO = {
  nameKo: "디에스 주식회사",
  nameEn: "DS Inc.",
  address: "서울특별시 강남구 테헤란로 123, DS타워 15층",
  email: "contact@ds-inc.kr",
  phone: "02-1234-5678",
  bizRegNo: "123-45-67890",
  linkedin: "https://linkedin.com/company/ds-inc",
  github: "https://github.com/ds-inc",
} as const;
