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
        {/* Set initial theme class before hydration to avoid mismatched UI on first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const stored = localStorage.getItem('theme'); const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; const root = document.documentElement; if (isDark) { root.classList.add('dark'); } else { root.classList.remove('dark'); } } catch (e) {} })();`
          }}
        />
      </head>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  )
}

