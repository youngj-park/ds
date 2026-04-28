// 서비스 상수 — 정식 명칭 확정 시 이 파일만 수정
export const SERVICES = [
  {
    id: "2d-vision",
    name: "2D 머신비전 솔루션",
    shortDesc: "고속·정밀 2D 외관 검사",
    description:
      "고속 2D 검사, 사이드 검사, 멀티샷 촬영, AI 기반 자동 티칭으로 다양한 불량 유형을 최적의 이미지 환경에서 자동 검출합니다.",
    spec: "검사 사양 10~20μm · 검사 속도 40ms",
    icon: "Camera",
  },
  {
    id: "3d-vision",
    name: "3D 머신비전 솔루션",
    shortDesc: "DEEPSEERS-3D-H1000",
    description:
      "고속 영상 취득 및 3D 알고리즘으로 Bump Height와 2D 불량을 동시에 검사합니다. 반복 정밀도 0.5μm 달성.",
    spec: "2M/16M High Speed Area Camera · Max 80/140 mm/s 스캔",
    icon: "Layers3",
  },
  {
    id: "ai-automation",
    name: "AI 자동화 기능",
    shortDesc: "경쟁사 대비 사용자편의성 60% 향상",
    description:
      "Auto ROI 생성으로 AI가 검사 영역을 자동 탐지합니다. 멀티샷으로 다양한 불량 유형을 한 번에 검출하고, 시각화된 결과를 클릭 한 번으로 확인합니다.",
    spec: "사용자편의성 60% 향상 · 티칭 속도 30% 향상",
    icon: "BrainCircuit",
  },
  {
    id: "smart-factory",
    name: "스마트팩토리 플랫폼",
    shortDesc: "로드맵 — 장비간 통합 플랫폼",
    description:
      "장비간 통합을 통한 스마트팩토리 플랫폼. 수율 상승, 불량 원인 분석, 원스탑 티칭, 대화형 AI 인터페이스로 티칭·생산·분석·진단을 한번에 해결합니다.",
    spec: "티칭 · 생산 · 분석 · 진단 원스탑",
    icon: "Network",
  },
] as const;

export const PROCESSES = [
  {
    id: "singulation",
    name: "패키지 싱귤레이션",
    market: "1조원",
    marketYear: "2023",
    features: ["2D 고속검사", "사이드 검사", "멀티샷", "티칭 자동화"],
    icon: "Scissors",
  },
  {
    id: "emi",
    name: "EMI 공정",
    market: "5천억원",
    marketYear: "2023",
    features: ["2D 고속검사", "사이드 검사", "멀티샷", "티칭 자동화"],
    icon: "Shield",
  },
  {
    id: "afvi",
    name: "2D/3D AFVI 공정",
    market: "3천억원",
    marketYear: "2023",
    features: ["2D/3D 고속검사", "사이드 검사", "멀티샷", "티칭 자동화"],
    icon: "ScanLine",
  },
] as const;

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "한기준",
    role: "CEO",
    bio: "KAIST 데이터사이언스 박사. 현 한성대학교 CS 교수. 전 ETRI 선임연구원, 전 삼성전자 책임연구원. AI 기반 반도체 검사 시스템의 상용화를 이끌고 있습니다.",
    initial: "한",
    image: "/team/ceo.png",
    imageStyle: { objectPosition: "center top" },
  },
  {
    id: 2,
    name: "김무진",
    role: "CTO",
    bio: "KAIST 데이터사이언스 박사. 현 한성대학교 특임교수. AI 대형국책과제 경험 다수 보유. DEEPSEERS 핵심 비전 AI 알고리즘 개발을 총괄합니다.",
    initial: "김",
    image: "/team/cto.png",
    imageStyle: { objectPosition: "center top" },
  },
  {
    id: 3,
    name: "박영진",
    role: "COO / 연구소장",
    bio: "KAIST 데이터사이언스 박사. 전 씨젠 AI 연구팀장. 3D 머신비전 상용화 경험 다수 보유. 기업 운영 전반과 기술 사업화를 책임집니다.",
    initial: "박",
    image: "/team/coo.jpg",
    imageStyle: { objectPosition: "center 35%", transform: "scale(0.82)", transformOrigin: "center bottom" },
  },
] as const;

export const TEAM_STRUCTURE = [
  {
    name: "기업부설연구소",
    desc: "2D/3D 머신비전 알고리즘, AI 차별화 기능 개발",
    icon: "FlaskConical",
  },
  {
    name: "개발팀",
    desc: "소프트웨어 개발",
    icon: "Cpu",
  },
  {
    name: "경영지원팀",
    desc: "경영지원",
    icon: "Building2",
  },
] as const;

export const NEWS_ITEMS = [
  {
    id: "1",
    date: "2025-09-01",
    category: "제품",
    title: "DEEPSEERS: LEVEL AI 출시 및 시리즈 A 투자 완료",
    summary:
      "차세대 AI 자동화 검사 플랫폼 LEVEL AI를 공식 출시하고, 시리즈 A 투자 유치를 완료했습니다.",
    content:
      "디에스 주식회사(DeepSeers)는 AI 기반 자동화 검사 플랫폼 'LEVEL AI'를 공식 출시하고, 시리즈 A 투자 유치를 동시에 완료했다고 밝혔습니다.\n\nLEVEL AI는 사람의 개입 없이 AI가 스스로 검사 영역을 탐지하고 불량을 분류하는 차세대 머신비전 솔루션입니다. 기존 룰 기반 검사 대비 티칭 속도 30%, 사용자 편의성 60% 향상을 달성했습니다.\n\n이번 시리즈 A 투자를 통해 확보한 자금은 3D 솔루션 고도화, 글로벌 시장 진출, 스마트팩토리 플랫폼 개발에 집중 투입될 예정입니다.",
    imageUrl: "",
  },
  {
    id: "2",
    date: "2025-08-01",
    category: "사업",
    title: "글로벌 R&D 과제 선정 — 하이브리드본더 과제 (과제총액 200억)",
    summary:
      "글로벌 반도체 하이브리드본더 공정 대상 R&D 국책과제에 선정되었습니다. 과제 총액 200억 원 규모.",
    content:
      "디에스 주식회사가 하이브리드본더 공정용 머신비전 검사 시스템 개발을 위한 글로벌 R&D 국책과제에 선정되었습니다.\n\n총 200억 원 규모의 이번 과제는 차세대 어드밴스드 패키징 공정에서 요구되는 초정밀 비전 검사 기술 개발을 목표로 합니다. 하이브리드본딩은 HBM 등 고부가가치 반도체 패키지에 핵심적으로 적용되는 공정으로, 서브마이크론 수준의 정밀 검사가 필수적입니다.\n\n디에스는 이번 과제를 통해 3D 비전 기술 역량을 한층 강화하고 글로벌 반도체 장비사와의 협력을 확대할 계획입니다.",
    imageUrl: "",
  },
  {
    id: "3",
    date: "2025-06-01",
    category: "수상",
    title: "디캠프 배치 2기 선정 (경쟁률 60:1)",
    summary:
      "국내 대표 스타트업 액셀러레이터 디캠프(D.CAMP) 배치 프로그램 2기에 경쟁률 60:1을 뚫고 선정되었습니다.",
    content:
      "디에스 주식회사가 은행권청년창업재단(D.CAMP)이 운영하는 배치 프로그램 2기에 최종 선정되었습니다.\n\n이번 프로그램은 60:1의 높은 경쟁률을 기록하며 딥테크 분야 최고 수준의 스타트업들이 경합했습니다. 디에스는 반도체 패키징 후공정 특화 AI 머신비전 기술의 독창성과 시장 성장성을 높이 평가받아 선정되었습니다.\n\n디캠프 배치 프로그램을 통해 글로벌 네트워크 확장, 투자자 연결, 해외 시장 진출 지원 등 다양한 혜택을 제공받을 예정입니다.",
    imageUrl: "",
  },
  {
    id: "4",
    date: "2025-04-01",
    category: "수상",
    title: "초격차 1000+ 반도체 부문 선정",
    summary:
      "중소벤처기업부 주관 '초격차 스타트업 1000+' 프로젝트 반도체 부문에 선정되었습니다.",
    content:
      "디에스 주식회사가 중소벤처기업부가 주관하는 '초격차 스타트업 1000+' 프로젝트 반도체 부문에 선정되었습니다.\n\n초격차 1000+ 프로젝트는 국가 전략기술 분야에서 글로벌 경쟁력을 확보할 잠재력을 가진 딥테크 스타트업을 발굴·육성하는 정부 핵심 프로그램입니다.\n\n디에스는 AI 기반 반도체 패키징 검사 솔루션의 기술 혁신성과 빠른 매출 성장세를 인정받아 반도체 부문에 선정되었으며, 정책금융, R&D 지원, 글로벌 진출 프로그램 등을 지원받게 됩니다.",
    imageUrl: "",
  },
  {
    id: "5",
    date: "2024-12-01",
    category: "수상",
    title: "신보 퍼스트펭귄 선정",
    summary:
      "신용보증기금 '퍼스트펭귄형 창업기업' 보증 프로그램에 선정되어 성장 자금을 확보했습니다.",
    content:
      "디에스 주식회사가 신용보증기금의 '퍼스트펭귄형 창업기업' 특별 보증 프로그램에 선정되었습니다.\n\n퍼스트펭귄 프로그램은 혁신적 기술을 보유하고 시장 개척 가능성이 높은 창업 초기 기업을 발굴해 금융 지원을 제공하는 신용보증기금의 대표 프로그램입니다.\n\n선정을 통해 확보한 자금은 제품 양산 체계 구축과 영업망 확대에 활용될 예정입니다.",
    imageUrl: "",
  },
  {
    id: "6",
    date: "2024-11-01",
    category: "수상",
    title: "제1회 롯데 신격호 창업경진대회 대상 · TIPS 선정",
    summary:
      "롯데 신격호 창업경진대회에서 대상을 수상하고, 민간투자주도형 기술창업 프로그램 TIPS에 동시 선정되었습니다.",
    content:
      "디에스 주식회사가 제1회 롯데 신격호 창업경진대회에서 최고상인 대상을 수상했습니다.\n\n이와 동시에 중소벤처기업부의 민간투자주도형 기술창업 프로그램(TIPS)에도 선정되어 R&D 지원금과 후속 투자 유치 기회를 확보했습니다.\n\nTIPS 선정을 통해 최대 5억 원의 R&D 지원과 함께 액셀러레이터 투자 및 글로벌 진출 프로그램 참여 기회를 얻게 됩니다. 이번 수상과 선정은 디에스의 기술 경쟁력과 사업 가능성을 시장에서 공인받은 것으로 의미가 큽니다.",
    imageUrl: "",
  },
  {
    id: "7",
    date: "2024-09-01",
    category: "투자",
    title: "인천창경·씨엔티테크 SEED 투자 완료, DeepSeers 출시",
    summary:
      "인천창조경제혁신센터 및 씨엔티테크로부터 SEED 투자를 완료하고, 머신비전 솔루션 DeepSeers를 공식 출시했습니다.",
    content:
      "디에스 주식회사가 인천창조경제혁신센터 및 씨엔티테크로부터 SEED 투자를 유치하고, 첫 번째 상용 제품인 머신비전 솔루션 'DeepSeers'를 공식 출시했습니다.\n\nDeepSeers는 반도체 패키지 싱귤레이션 공정 및 EMI 공정 특화 AI 머신비전 검사 솔루션으로, 기존 룰 기반 검사 방식의 한계를 AI로 극복한 차세대 제품입니다.\n\n출시와 함께 국내 주요 반도체 장비사와의 공급 계약을 체결하며 상업화에 성공했습니다. SEED 투자금은 제품 고도화와 영업 역량 강화에 집중 투입되었습니다.",
    imageUrl: "",
  },
];

export const STATS = [
  { label: "매년 성장률", value: "200", unit: "%+" },
  { label: "영업이익률 (24.12 기준)", value: "18", unit: "%" },
  { label: "경쟁사 대비 수율 향상", value: "10", unit: "%" },
  { label: "경쟁사 대비 티칭속도 향상", value: "30", unit: "%" },
] as const;

export const MARKET_STATS = [
  {
    value: 50,
    unit: "조원",
    label: "HBM 반도체 시장",
    sublabel: "2029년 예상 규모",
    color: "text-accent",
  },
  {
    value: 120,
    unit: "조원",
    label: "패키징 장비 시장",
    sublabel: "2029년 예상 규모",
    color: "text-white",
  },
] as const;

export const NAV_LINKS = [
  { label: "회사 소개", href: "#about" },
  { label: "솔루션", href: "#services" },
  { label: "팀", href: "#team" },
  { label: "IR & News", href: "#news" },
  { label: "문의하기", href: "#contact" },
] as const;

export const COMPANY_INFO = {
  nameKo: "디에스 주식회사",
  nameEn: "DeepSeers Inc.",
  brand: "DEEPSEERS",
  ceo: "한기준",
  addressHQ: "인천시 연수구 컨벤시아대로 204, 214호 (송도동, 인스타 II)",
  addressLab: "서울시 마포구 공덕동 마포대로 122 프론트원 14F",
  email: "dsadmin@deepseers.com",
  bizRegNo: "123-45-67890",
  linkedin: "https://linkedin.com/company/deepseers",
  github: "https://github.com/deepseers",
} as const;
