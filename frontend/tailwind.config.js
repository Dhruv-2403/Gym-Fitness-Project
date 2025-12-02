
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "neon-blue": "#00E3FF",
                "neon-purple": "#B16BFF",
                "neon-cyan": "#00FFC2",
                "deep-black": "#050505",
            },
            fontFamily: {
                sans: ["'Outfit'", "system-ui"],
            },
        },
    },
    plugins: [],
};
