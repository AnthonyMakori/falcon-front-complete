/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add other paths where Tailwind classes are used
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E40AF', // Example of a custom color
        'custom-green': '#10B981', // Example of a custom color
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'], // Example of a custom font stack
      },
      spacing: {
        128: '32rem', // Example of a custom spacing value
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
