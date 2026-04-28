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
    name: "한기준",
    role: "CEO",
    bio: "반도체 장비·검사 시스템 분야 20년 경력. 전 삼성전자 DS부문 품질혁신팀 리더 출신으로 회사 전반의 비전과 전략을 이끕니다.",
    initial: "한",
  },
  {
    id: 2,
    name: "김무진",
    role: "CTO",
    bio: "KAIST 전기전자공학 박사. 비전 AI·딥러닝 전문가로 DS Vision 핵심 모델 개발을 총괄하며 국내외 특허 20건을 보유하고 있습니다.",
    initial: "김",
  },
  {
    id: 3,
    name: "박영진",
    role: "COO",
    bio: "전 SK하이닉스 생산운영 팀장 출신. 반도체 팹 운영 및 공급망 관리 전문가로 회사의 사업 운영 전반을 책임집니다.",
    initial: "박",
  },
] as const;

export const NEWS_ITEMS = [
  {
    id: "1",
    date: "2026-04-15",
    category: "투자",
    title: "디에스, 시리즈 A 80억 원 투자 유치 완료",
    summary:
      "국내 주요 반도체 특화 VC로부터 80억 원 규모의 시리즈 A 투자를 유치하며 글로벌 시장 확대에 속도를 냅니다.",
    content:
      "디에스 주식회사는 국내 주요 반도체 특화 벤처캐피탈로부터 80억 원 규모의 시리즈 A 투자를 유치했다고 15일 밝혔습니다.\n\n이번 투자는 반도체 AI 검사 분야의 기술력과 성장 가능성을 인정받은 결과로, 조달된 자금은 DS Vision 플랫폼 고도화, 글로벌 시장 진출, 핵심 인재 영입에 투입될 예정입니다.\n\n한기준 CEO는 \"이번 투자를 통해 국내외 반도체 제조사와의 협력을 더욱 확대하고, AI 비전 검사 분야에서 글로벌 리더십을 확보하겠다\"고 말했습니다.",
    imageUrl: "",
  },
  {
    id: "2",
    date: "2026-03-22",
    category: "파트너십",
    title: "글로벌 반도체 장비사와 전략적 파트너십 체결",
    summary:
      "세계 3위 반도체 장비 기업과 공동 개발 협약을 체결, DS Vision 솔루션을 신규 장비 라인에 탑재하기로 합의했습니다.",
    content:
      "디에스 주식회사는 세계 3위 반도체 장비 기업과 전략적 파트너십 협약을 체결했다고 22일 발표했습니다.\n\n양사는 DS Vision 솔루션을 해당 기업의 신규 웨이퍼 검사 장비 라인에 탑재하는 공동 개발 프로젝트를 착수하기로 합의했습니다. 이번 협력을 통해 디에스는 글로벌 장비 공급망에 직접 편입되며 시장 접근성을 크게 높일 것으로 기대됩니다.\n\n파트너십을 통한 첫 번째 통합 제품은 2026년 하반기 출시를 목표로 개발이 진행 중입니다.",
    imageUrl: "",
  },
  {
    id: "3",
    date: "2026-02-10",
    category: "제품",
    title: "DS Vision 2.0 출시 — 검출 정확도 99.7% 달성",
    summary:
      "차세대 멀티모달 AI 모델을 적용한 DS Vision 2.0이 공식 출시되었습니다. 기존 대비 결함 분류 속도 40% 향상.",
    content:
      "디에스 주식회사가 차세대 반도체 비전 검사 플랫폼 DS Vision 2.0을 공식 출시했습니다.\n\nDS Vision 2.0은 멀티모달 AI 모델을 새롭게 적용해 결함 검출 정확도 99.7%를 달성했으며, 기존 버전 대비 분류 속도를 40% 향상시켰습니다. 특히 10nm 이하 미세 공정에서의 결함 탐지 성능이 대폭 개선되어 최신 파운드리 공정에 바로 적용 가능합니다.\n\n주요 신규 기능으로는 실시간 이상 패턴 경보, 자동화된 수율 예측 리포트, DS Analytics와의 완전한 데이터 연동이 포함됩니다.",
    imageUrl: "",
  },
  {
    id: "4",
    date: "2026-01-05",
    category: "수상",
    title: "2026 반도체 혁신 어워드 '최우수 스타트업' 선정",
    summary:
      "한국반도체산업협회 주관 '2026 반도체 혁신 어워드'에서 AI 검사 분야 최우수 스타트업으로 선정되었습니다.",
    content:
      "디에스 주식회사가 한국반도체산업협회(KSIA)가 주관하는 '2026 반도체 혁신 어워드'에서 AI 검사 분야 최우수 스타트업으로 선정되었습니다.\n\n이 상은 반도체 제조 공정 혁신에 기여한 기업을 발굴·표창하는 권위 있는 상으로, 올해 총 120여 개 기업이 후보에 올랐습니다.\n\n심사위원회는 DS Vision의 독창적인 기술력과 국내 반도체 제조사 현장 적용 실적, 그리고 빠른 성장세를 높이 평가했습니다. 시상식은 1월 20일 서울 코엑스에서 개최되었습니다.",
    imageUrl: "",
  },
];

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
