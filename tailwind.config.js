/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    theme: {
        extend: {
            colors: {
                'logo-green': '#38A169',
                'logo-red': '#E53E3E',
                'earth-brown': '#8B4513',
                'earth-light': '#D2B48C',
            }
        },
    },
    plugins: [],
} 