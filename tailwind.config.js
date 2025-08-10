/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
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
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            spacing: {
                // T-shirt sizes for consistent spacing
                xs: '0.25rem', // 4px
                sm: '0.5rem', // 8px
                md: '1rem', // 16px
                lg: '1.5rem', // 24px
                xl: '2rem', // 32px
                '2xl': '3rem', // 48px
                '3xl': '4rem', // 64px
            },
            boxShadow: {
                none: 'none',
                flat: '0 0 0 1px rgb(0 0 0 / 0.05)',
                elevated:
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
                floating:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
                lifted: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                high: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
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
            transitionDuration: {
                fast: '150ms',
                normal: '300ms',
                slow: '500ms',
            },
            transitionTimingFunction: {
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            animation: {
                'fade-in': 'fadeIn 300ms ease-in-out',
                'slide-up': 'slideUp 300ms ease-out',
                'slide-down': 'slideDown 300ms ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
