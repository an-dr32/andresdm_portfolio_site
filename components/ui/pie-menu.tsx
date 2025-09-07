'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Custom Behance icon component
const BehanceIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  action?: string;
  external?: boolean;
}

interface PieMenuProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  emailCopied: boolean;
  onCopyEmail: () => void;
}

export function PieMenu({
  items,
  onItemClick,
  onToggleTheme,
  isDarkMode,
  emailCopied,
  onCopyEmail,
}: PieMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.action === 'copy-email') {
      onCopyEmail();
    } else if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderIcon = (item: MenuItem) => {
    if (item.action === 'copy-email' && emailCopied) {
      return <X size={18} className="text-green-500" />;
    }
    const Icon = item.icon;
    return <Icon size={18} />;
  };

  // Calculate positions for pie menu items in a fan shape
  const getItemPosition = (index: number, total: number) => {
    const radius = 100; // Distance from center
    // Wider angle for better fan effect (270 is straight up)
    const startAngle = 180; // Start from left
    const endAngle = 360;   // End at right (full semi-circle)
    const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
    const angle = (startAngle + (index * angleStep)) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle: angle * (180 / Math.PI) // Convert back to degrees for rotation
    };
  };

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-6 left-6 z-50 lg:hidden origin-bottom-left"
      style={{ transform: 'translateY(50%)' }}
    >
      {/* Main menu button */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
          isOpen 
            ? 'bg-gray-800 text-white' 
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
        } transition-colors duration-200 focus:outline-none`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Pie menu items */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-0 left-0 origin-bottom-left z-50">
            {items.map((item, index) => {
              const position = getItemPosition(index, items.length);
              const isActive = pathname === item.href;
              const itemClass = `absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg pointer-events-auto ${
                isActive
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              } transition-all duration-200`;
              
              if (item.external) {
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClass}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      x: position.x,
                      y: position.y,
                      scale: 1,
                      rotate: position.angle - 90 // Rotate icons to face outward
                    }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                      delay: index * 0.05 // Stagger the animations
                    }}
                  >
                    {renderIcon(item)}
                  </motion.a>
                );
              }
              
              return (
                <motion.div
                  key={item.name}
                  className={itemClass}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    x: position.x,
                    y: position.y,
                    scale: 1,
                    rotate: position.angle - 90 // Rotate icons to face outward
                  }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.05 // Stagger the animations
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {item.href === '#' ? (
                    <button className="w-full h-full flex items-center justify-center">
                      {renderIcon(item)}
                    </button>
                  ) : (
                    <Link href={item.href} className="w-full h-full flex items-center justify-center">
                      {renderIcon(item)}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Theme toggle button - integrated into the pie menu */}
      {items.find(item => item.action === 'toggle-theme') && (
        <button
          onClick={onToggleTheme}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg mt-4 ${
            isDarkMode 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-gray-800 text-yellow-400'
          } transition-colors duration-200 focus:outline-none`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      )}
    </div>
  );
}
