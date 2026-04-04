export type Difficulty = "Starter" | "Mid" | "Senior" | "Nightmare";

export type ChallengeData = {
	id: number;
	number: string;
	title: string;
	description: string;
	difficulty: Difficulty;
	premium: boolean;
	route: string;
	components: string[];
};

export const challenges: ChallengeData[] = [
	{
		id: 1,
		number: "01",
		title: "Sign In / Sign Up",
		description:
			"Master authentication flows, field validation, and OAuth integration patterns.",
		difficulty: "Mid",
		premium: false,
		route: "/apps/sign-in-sign-up",
		components: ["Input Fields", "Social Buttons"],
	},
	{
		id: 2,
		number: "02",
		title: "Image Uploader",
		description:
			"Focus on drag-and-drop mechanics, file preview states, and progress indicators.",
		difficulty: "Senior",
		premium: false,
		route: "/apps/image-uploader",
		components: ["Dropzone", "Progress Bar"],
	},
	{
		id: 3,
		number: "03",
		title: "Account Settings",
		description:
			"Information architecture for user profiles and data management layouts.",
		difficulty: "Mid",
		premium: true,
		route: "/apps/account-settings",
		components: ["Profile Card", "Toggle Group"],
	},
	{
		id: 4,
		number: "04",
		title: "Password Section",
		description:
			"Secure interaction design, password strength meters, and confirmation flows.",
		difficulty: "Mid",
		premium: false,
		route: "/apps/password-section",
		components: ["Strength Meter", "Alert Banner"],
	},
	{
		id: 5,
		number: "05",
		title: "Notifications",
		description:
			"Permission handling, notification tiers, and real-time activity stream UI.",
		difficulty: "Starter",
		premium: false,
		route: "/apps/notifications-settings",
		components: ["Checklist", "Badge UI"],
	},
	{
		id: 6,
		number: "06",
		title: "Billing History",
		description:
			"Complex data tables, invoice downloads, and transactional state mapping.",
		difficulty: "Mid",
		premium: false,
		route: "/apps/billing-history",
		components: ["Data Table", "Download Btn"],
	},
	{
		id: 7,
		number: "07",
		title: "Billing Info",
		description:
			"Payment method management, credit card component design, and validation.",
		difficulty: "Mid",
		premium: false,
		route: "/apps/billing-information",
		components: ["Credit Card", "Form Grid"],
	},
	{
		id: 8,
		number: "08",
		title: "Billing Plans",
		description:
			"Tiered pricing architecture, comparison tables, and conversion optimization.",
		difficulty: "Senior",
		premium: true,
		route: "/apps/billing-plans",
		components: ["Price Cards", "Feature List"],
	},
	{
		id: 9,
		number: "09",
		title: "Settings Page",
		description:
			"Full dashboard orchestration, sidebar navigation, and deep-nesting logic.",
		difficulty: "Senior",
		premium: true,
		route: "/apps/settings-page",
		components: ["Sidebar", "Search Bar"],
	},
	{
		id: 10,
		number: "10",
		title: "Chat AI",
		description:
			"Real-time messaging, AI avatar states, and markdown response rendering.",
		difficulty: "Nightmare",
		premium: true,
		route: "/apps/chat-ai",
		components: ["Message Bubble", "Code Block"],
	},
	{
		id: 11,
		number: "11",
		title: "Hacker News",
		description:
			"API data management, recursive comment rendering, and fast skeleton states.",
		difficulty: "Senior",
		premium: true,
		route: "/apps/hacker-news",
		components: ["Story Card", "Skeletons"],
	},
	{
		id: 12,
		number: "12",
		title: "Pinsplash",
		description:
			"Masonry grid layouts, high-res image modal transitions, and tag filtering.",
		difficulty: "Nightmare",
		premium: true,
		route: "/apps/pinsplash",
		components: ["Masonry Grid", "Lightbox"],
	},
];
