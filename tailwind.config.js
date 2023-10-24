/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'movieGrid': 'repeat(auto-fit, minmax(220px, 1fr))',
            },
            colors: {
                'backgroundColor': '#0d253f',
                'cardColor': '#014e64',
                'accentColor': '#90cea1',
                'headerColor': '#040C14',
            },
            zIndex: {
                '750': '750',
            },
        },
        fontFamily: {
            sans: ['Noto Sans', 'sans-serif'],
        },
    },
    plugins: [],
}

