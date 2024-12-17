import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			gridTemplateColumns: {
				20: 'repeat(20, minmax(0, 1fr))',
				40: 'repeat(40, minmax(0, 1fr))'
			},
			animation: {
				'scale-in': 'scaleIn 0.5s ease-out forwards'
			},
			keyframes: {
				scaleIn: {
					'0%': { transform: 'scale(0)' },
					'100%': { transform: 'scale(1)' }
				}
			}
		}
	},

	plugins: []
} satisfies Config;
