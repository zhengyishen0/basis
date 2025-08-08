/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            keyframes: {
                'underline-grow': {
                    '0%': {
                        transform: 'scaleX(0)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'scaleX(1)',
                        opacity: '1',
                    },
                },
            },
            colors: {
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                success: {
                    DEFAULT: 'var(--success)',
                    foreground: 'var(--success-foreground)',
                },
                warning: {
                    DEFAULT: 'var(--warning)',
                    foreground: 'var(--warning-foreground)',
                },
                info: {
                    DEFAULT: 'var(--info)',
                    foreground: 'var(--info-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
            },
            boxShadow: {
                none: 'none',
                flat: '0 0 0 1px rgba(0, 0, 0, 0.05)',
                elevated:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                floating:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lifted: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                high: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            zIndex: {
                tooltip: '10',
                dropdown: '20',
                sticky: '30',
                overlay: '40',
                modal: '50',
                popover: '60',
                maximum: '9999',
            },
            animation: {
                'underline-grow': 'underline-grow 0.8s ease-out forwards',
                'underline-grow-delayed':
                    'underline-grow 0.8s ease-out 0.3s forwards',
                'underline-grow-hover': 'underline-grow 0.3s ease-out forwards',
            },
        },
    },
    plugins: [],
};
