/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-default-export
export default {
    content: [
        './src/*.ts',
        './src/*.tsx',
        './src/**/*.ts',
        './src/**/*.tsx'
    ],

    theme: {
        extend: {
            screens: {
                xs: "475px",
                "3xl": "1750px",
            },

            spacing: {
                3.5: "0.85rem",
                41: "10.5rem",
                90: "21rem",
            },
        },

        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            background: '#181719',
            backgroundLight: '#212023',
            text: '#FDFEFE',
            textHover: '#FFFFFF',
            textDisabled: '#B9B9BA',
            primary: '#8E2CFE',
            primaryHover: '#5300B0',
            error: '#FF0000',
            secondary: '#A4C1C9',
            secondaryDark: '#9C9C9C',
        },

        fontFamily: {
            jaro: ['"Jaro"', 'sans-serif'],
        },

        backgroundImage: {
            primaryGradient: 'linear-gradient(to right, #9C44FF, #8418FF, #8E2CFE)',
            secondaryGradient: 'linear-gradient(to right, #1E9AC8, #8E2CFE)',
        }
    },
};