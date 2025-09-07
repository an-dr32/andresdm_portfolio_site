'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  action?: string;
  external?: boolean;
}

interface RightPieMenuProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  isDarkMode: boolean;
  emailCopied: boolean;
}

export function RightPieMenu({ items, onItemClick, isDarkMode, emailCopied }: RightPieMenuProps) {
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

  // Calculate positions for menu items in a fan shape
  const getItemPosition = (index: number, total: number) => {
    const radius = 80; // Distance from center
    const startAngle = -90; // Start from top
    const endAngle = 90;   // End at bottom
    const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
    const angle = (startAngle + (index * angleStep)) * (Math.PI / 180);
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle: angle * (180 / Math.PI)
    };
  };

  // Calculate container height based on number of items
  const containerHeight = Math.min(400, Math.max(200, items.length * 60));

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Main menu button */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 ${
          isOpen 
            ? 'bg-gray-800 text-white' 
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed right-6 bottom-24 origin-bottom-right overflow-y-auto"
            style={{
              height: `${containerHeight}px`,
              maxHeight: '60vh',
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex flex-col items-end space-y-3 pr-2">
              {items.map((item, index) => {
                const position = getItemPosition(index, items.length);
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.name}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: position.x > 0 ? position.x - 28 : position.x + 28,
                      y: position.y,
                      scale: 1
                    }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.05
                    }}
                    onClick={() => {
                      onItemClick(item);
                      setIsOpen(false);
                    }}
                    title={item.name}
                  >
                    <Icon size={20} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
