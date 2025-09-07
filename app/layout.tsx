import "./globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ClientBody } from '@/components/client-body';
import siteMetadata from './metadata.json'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
})

export const metadata = siteMetadata['/']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { 
              color-scheme: light dark;
              --background: white;
              --foreground: #111827;
            }
            @media (prefers-color-scheme: dark) {
              :root {
                --background: #111827;
                --foreground: #f3f4f6;
              }
            }
            body { 
              background-color: var(--background);
              color: var(--foreground);
              transition: background-color 0.2s ease, color 0.2s ease;
            }
          `
        }} />
      </head>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  )
}
