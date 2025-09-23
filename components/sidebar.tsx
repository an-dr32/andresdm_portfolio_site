"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, Mail, Github, Instagram, FileText, Menu, X, Check, Copy, Sun, Moon, Gamepad2, Palette } from 'lucide-react'
import { VerticalMenu } from '@/components/ui/vertical-menu'
import { useState, useEffect } from 'react'

// Custom Behance icon component
const BehanceIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
)

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  { name: 'Illustrations', href: '/illustrations', icon: Palette },
  { name: 'Email', href: '#', icon: Mail, action: 'copy-email' },
  { name: 'Github', href: 'https://github.com/an-dr32', icon: Github, external: true },
  { name: 'Behance', href: 'https://www.behance.net/ademoya', icon: BehanceIcon, external: true },
  { name: 'Instagram', href: 'https://instagram.com/andresenpunto', icon: Instagram, external: true },
  { name: 'Blog', href: '/blog', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDarkPref = stored ? stored === 'dark' : prefersDark;
      // Trust current document class first (set by inline script), fallback to preference
      return document.documentElement.classList.contains('dark') || isDarkPref;
    } catch {
      return document.documentElement.classList.contains('dark');
    }
  })

  // Sync local state to current document theme on mount (class managed elsewhere)
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('andresfdemoya@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.log('Failed to copy email:', err)
    }
  }

  // Mobile navigation items
  const mobileNavigation = [
    ...navigation,
    {
      name: isDarkMode ? 'Light Mode' : 'Dark Mode',
      href: '#',
      icon: isDarkMode ? Sun : Moon,
      action: 'toggle-theme',
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.action === 'toggle-theme') {
      toggleDarkMode();
    } else if (item.action === 'copy-email') {
      handleEmailCopy();
    }
  };

  return (
    <>
      {/* Mobile Vertical Menu */}
      <div className="lg:hidden">
        <VerticalMenu
          items={mobileNavigation}
          onItemClick={handleItemClick}
          isDarkMode={isDarkMode}
          emailCopied={emailCopied}
        />
      </div>

      {/* Sidebar */}
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex-col z-40">
        {/* Logo/Name */}
        <div className="mb-12 mt-8 lg:mt-0">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Andres.
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              // Handle email copy action
              if (item.action === 'copy-email') {
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        handleEmailCopy()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
                    >
                      {emailCopied ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <Icon size={18} />
                      )}
                      <span className="text-sm">
                        {emailCopied ? 'Email Copied!' : item.name}
                      </span>
                    </button>
                  </li>
                )
              }

              if (item.external) {
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </li>
                )
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Theme Toggle - Desktop Only */}
        <div className="mb-6 hidden lg:block">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Andres De Moya © 2025</span>
          </div>
        </div>
      </div>
    </>
  )
}
