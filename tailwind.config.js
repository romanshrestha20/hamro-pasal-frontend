/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1200px",
        xl: "1400px",
      },
    },

    extend: {
      colors: {
        // Light Theme
        light: {
          bg: "#FFFFFF",
          card: "#F9F9F9",
          border: "#E0E0E0",
          text: "#333333",
          subtle: "#666666",
        },

        // Dark Theme
        dark: {
          bg: "#121212",
          card: "#1A1A1A",
          border: "#2A2A2A",
          text: "#FAFAFA",
          subtle: "#CCCCCC",
        },

        // Accents (Shared)
        primary: {
          light: "#1E90FF", // trust building (blue)
          dark: "#00BFA6", // teal option for modern feel
        },
        secondary: {
          light: "#FF6F00", // orange - urgency / CTA
          dark: "#FF4081", // pink/red strong CTA for dark mode
        },

        highlight: {
          light: "#FFF176", // soft yellow for promo & banners
          dark: "#FFD700", // gold - premium feel
        },

        success: "#00C853", // emerald
        error: "#FF1744", // bright red
        warning: "#FFB300", // amber
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.06)",
        card: "0 8px 30px rgba(0,0,0,0.08)",
        hover: "0 10px 40px rgba(0,0,0,0.12)",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};