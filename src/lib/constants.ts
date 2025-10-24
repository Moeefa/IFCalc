// Provider configuration
export const PROVIDER_NAMES = {
	ifmt: "Mato Grosso",
	ifba: "Bahia",
	ifrn: "Rio Grande do Norte",
	ifsp: "São Paulo",
	ifrs: "Rio Grande do Sul",
	ifto: "Tocantins",
	ifmg: "Minas Gerais",
	ifma: "Maranhão",
	ifpb: "Paraíba",
	"ifsertao-pe": "Pernambuco",
} as const;

export const SUAP_ERRPORS = {
	"No active account found with the given credentials":
		"Nenhuma conta ativa encontrada com as credenciais fornecidas",
} as const;

export type SuapProvider = keyof typeof PROVIDER_NAMES;

export const AUTH_CONFIG = {
	ACCESS_TOKEN_EXPIRES: 60 * 60 * 12, // 12 hours
	REFRESH_TOKEN_EXPIRES: 60 * 60 * 24 * 7, // 7 days
	REQUEST_TIMEOUT: 15_000, // 15 seconds
	CACHE_REVALIDATE: 3600, // 1 hour
} as const;

export const GRADE_CONFIG = {
	PASSING_GRADE: 6,
	MAX_GRADE: 10,
	BIMESTRAL_MULTIPLIER: 0.8,
	ANNUAL_WEIGHTS: [2, 2, 3, 3],
} as const;

export const UI_CONFIG = {
	SKELETON_COUNT: 8,
	LOADING_ROWS: 10,
	CALENDAR_COLORS: [
		"#fbbf24",
		"#f87171",
		"#34d399",
		"#60a5fa",
		"#f472b6",
		"#a78bfa",
	],
	MAX_CALENDAR_EVENTS: 4,
} as const;

export const GRADE_COLORS = {
	EXCELLENT: "bg-gradient-to-b from-green-500 to-green-600 border-green-800",
	GOOD: "bg-gradient-to-b from-yellow-500 to-yellow-600 border-yellow-800",
	POOR: "bg-gradient-to-b from-red-500 to-red-600 border-red-800",
	ATTENDANCE: "bg-gradient-to-b from-rose-500 to-rose-600 border-rose-700",
	ABSENCE_WARNING:
		"bg-gradient-to-b from-red-500/30 to-red-600/30 border-red-600/50",
} as const;

export const SUBJECT_ICON_RULES = [
	{
		keywords: ["álgebra", "cálculo", "matemática", "estatística", "geometria"],
		iconName: "Calculator",
	},
	{
		keywords: ["esporte", "educação física"],
		iconName: "Basketball",
	},
	{
		keywords: ["física"],
		iconName: "Rotation360",
	},
	{
		keywords: [
			"algoritmo",
			"programação",
			"dados",
			"computacional",
			"código",
			"website",
		],
		iconName: "Computer",
	},
	{
		keywords: ["química"],
		iconName: "Rotation360",
	},
	{
		keywords: ["ambiente", "geografia"],
		iconName: "Earth",
	},
	{
		keywords: ["ciência", "metodologia"],
		iconName: "BookOpen",
	},
	{
		keywords: ["ética", "filosofia", "sociologia"],
		iconName: "Scale",
	},
	{
		keywords: ["arquitetura", "computador", "sistemas"],
		iconName: "Layers",
	},
	{
		keywords: ["arte"],
		iconName: "Paintbrush",
	},
	{
		keywords: ["introdução", "fundamento"],
		iconName: "GraduationCap",
	},
] as const;

export const API_ENDPOINTS = {
	TOKEN_PAIR: "/api/token/pair",
	TOKEN_REFRESH: "/api/token/refresh/",
	USER_DATA: "/api/rh/meus-dados/",
	PERIODS: "/api/edu/periodos",
	SUBJECTS: (semester: string) => `/api/edu/disciplinas/${semester}`,
	SUBJECT_DETAILS: (id: number) => `/api/edu/disciplinas/${id}/etapas`,
	DIARIES: (semester: string) => `/api/edu/diarios/${semester}`,
	HOMEWORKS: (diaryId: number) => `/api/edu/diarios/${diaryId}/trabalhos`,
	MATERIALS: (diaryId: number) => `/api/edu/diarios/${diaryId}/materiais`,
	MESSAGES: "/api/edu/mensagens/entrada/todas/",
} as const;

export const COOKIES = {
	ACCESS_TOKEN: "access_token",
	REFRESH_TOKEN: "refresh_token",
	PROVIDER: "provider",
	PERIOD: "period",
} as const;

export const CALCULATOR_MODES = {
	b: {
		label: "Bimestral",
		description: "Cálculo da nota de um bimestre somado com o conceito",
		details:
			"A nota final é a soma das notas multiplicada por 0,8 somada ao conceito",
	},
	s: {
		label: "Semestral",
		description: "Cálculo da média aritmética das notas do semestre",
		details: "A média é a soma das notas do semestre dividida pela quantidade",
	},
	a: {
		label: "Anual",
		description: "Cálculo da média ponderada das notas de cada bimestre",
		details:
			"A média ponderada considera os dois primeiros bimestres com peso 2 e os dois últimos com peso 3",
	},
} as const;

export type CalculatorMode = keyof typeof CALCULATOR_MODES;

// Schedule configuration
export const TIME_SLOTS = [
	{
		label: "1ª aula",
		time: "7:00 - 7:50",
	},
	{
		label: "2ª aula",
		time: "7:50 - 8:40",
	},
	{
		label: "3ª aula",
		time: "8:40 - 9:30",
	},
	{
		label: "4ª aula",
		time: "9:50 - 10:40",
	},
	{
		label: "5ª aula",
		time: "10:40 - 11:30",
	},
	{
		label: "6ª aula",
		time: "11:30 - 12:20",
	},
	{
		label: "Intervalo",
		time: "12:20 - 13:00",
	},
	{
		label: "1ª aula",
		time: "13:00 - 13:50",
	},
	{
		label: "2ª aula",
		time: "13:50 - 14:40",
	},
	{
		label: "3ª aula",
		time: "14:40 - 15:30",
	},
	{
		label: "4ª aula",
		time: "15:50 - 16:40",
	},
	{
		label: "5ª aula",
		time: "16:40 - 17:30",
	},
	{
		label: "6ª aula",
		time: "17:30 - 18:20",
	},
	{
		label: "Intervalo",
		time: "18:20 - 18:50",
	},
	{
		label: "1ª aula",
		time: "18:50 - 19:40",
	},
	{
		label: "2ª aula",
		time: "19:40 - 20:30",
	},
	{
		label: "3ª aula",
		time: "20:45 - 21:35",
	},
	{
		label: "4ª aula",
		time: "21:35 - 22:25",
	},
] as const;

export const TIME_MAPPING = {
	"07:00 - 07:50": "7:00 - 7:50",
	"07:55 - 08:45": "7:50 - 8:40",
	"08:50 - 09:40": "8:40 - 9:30",
	"10:00 - 10:50": "9:50 - 10:40",
	"10:55 - 11:45": "10:40 - 11:30",
	"11:50 - 12:40": "11:30 - 12:20",

	"13:00 - 13:50": "13:00 - 13:50",
	"13:55 - 14:45": "13:50 - 14:40",
	"14:50 - 15:40": "14:40 - 15:30",
	"16:00 - 16:50": "15:50 - 16:40",
	"16:55 - 17:45": "16:40 - 17:30",
	"17:50 - 18:40": "17:30 - 18:20",

	"18:50 - 19:40": "18:50 - 19:40",
	"19:41 - 20:30": "19:40 - 20:30",
	"20:45 - 21:34": "20:45 - 21:35",
	"21:35 - 22:25": "21:35 - 22:25",
} as const;

export const DAY_COLUMNS = {
	Segunda: 1,
	Terça: 2,
	Quarta: 3,
	Quinta: 4,
	Sexta: 5,
	Sábado: 6,
} as const;

export const WEEKDAYS = [
	"Segunda",
	"Terça",
	"Quarta",
	"Quinta",
	"Sexta",
	"Sábado",
] as const;
