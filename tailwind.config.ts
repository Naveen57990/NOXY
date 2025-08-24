import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'gradient-main': 'var(--gradient-main)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-rituals': 'var(--gradient-rituals)',
				'gradient-journal': 'var(--gradient-journal)',
				'gradient-chat': 'var(--gradient-chat)',
				'gradient-noxy': 'var(--gradient-noxy)'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: 'var(--shadow-soft)' },
					'50%': { boxShadow: 'var(--shadow-glow)' }
				},
				bounceGentle: {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-8px) scale(1.02)' }
				},
				slideInLeft: {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				slideInRight: {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				shimmer: {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' }
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				float: 'float 6s ease-in-out infinite',
				pulseGlow: 'pulseGlow 2s ease-in-out infinite',
				bounceGentle: 'bounceGentle 2s ease-in-out infinite',
				slideInLeft: 'slideInLeft 0.3s ease-out',
				slideInRight: 'slideInRight 0.3s ease-out',
				shimmer: 'shimmer 2s infinite',
				wiggle: 'wiggle 1s ease-in-out infinite',
				fadeIn: 'fadeIn 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
