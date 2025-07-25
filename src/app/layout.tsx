'use client';

import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/ui/navigation';
import './globals.css';
import { UserProvider } from '@/contexts/UserContext'; // ⬅️ import context


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">
           <Navbar />
            <main>{children}</main>
          </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
