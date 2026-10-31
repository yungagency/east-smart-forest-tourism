import { Poppins, Inter } from 'next/font/google';

export const display = Poppins({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'], display: 'swap' });
export const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
