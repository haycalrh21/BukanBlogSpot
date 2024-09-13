// tailwind.config.js
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "sans-serif"],
				head: ["var(--font-head)", "sans-serif"],
			},
			boxShadow: {
				xs: "1px 1px 0 0 #000",
				md: "3px 3px 0 0 #000",
				"3xl": "10px 10px 0 0 #000",
			},

			colors: {
				primary: {
					50: "#FFFEF0",
					100: "#FEF9C3",
					200: "#FEF08A",
					300: "#FDE047",
					400: "#FACC15",
					500: "#EAB308",
					600: "#CA8A04",
					700: "#A16207",
					800: "#854D0E",
					900: "#713F12",
				},
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
