'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  action?: string;
  external?: boolean;
}

interface VerticalMenuProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  isDarkMode: boolean;
  emailCopied: boolean;
}

const AnimatedText = ({ text, isActive, isEmail = false }: { text: string; isActive: boolean; isEmail?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isEmail && isActive) {
      setIsAnimating(true);
      let currentText = text;
      
      // Erase the email
      const eraseInterval = setInterval(() => {
        currentText = currentText.slice(0, -1);
        setDisplayText(currentText);
        
        if (currentText === '') {
          clearInterval(eraseInterval);
          setDisplayText('Copied!');
          
          // Revert back to email after delay
          setTimeout(() => {
            let rebuildText = '';
            const buildInterval = setInterval(() => {
              if (rebuildText.length < text.length) {
                rebuildText = text.slice(0, rebuildText.length + 1);
                setDisplayText(rebuildText);
              } else {
                clearInterval(buildInterval);
                setIsAnimating(false);
              }
            }, 30);
          }, 1500);
        }
      }, 30);
      
      return () => clearInterval(eraseInterval);
    }
  }, [isActive, text]);

  return (
    <span className={`whitespace-nowrap ${isActive && isEmail ? 'text-green-500' : ''}`}>
      {isAnimating ? displayText : text}
    </span>
  );
};

export function VerticalMenu({ items, onItemClick, isDarkMode, emailCopied }: VerticalMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
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

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end touch-none"
    >
      {/* Main menu button */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <MoreVertical size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed right-6 bottom-24 origin-bottom-right bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="max-h-[60vh] overflow-y-auto py-2 scrollbar-hide">
              {items.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                // Handle external links and actions
                const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault();
                  onItemClick(item);
                  
                  if (item.action === 'copy-email') {
                    setCopiedItem(item.name);
                    // Reset after animation completes
                    setTimeout(() => setCopiedItem(null), 2000);
                    // Keep menu open after email copy
                    return;
                  }
                  
                  // Close menu for all other actions
                  setIsOpen(false);
                  
                  if (!item.action && !item.external) {
                    // For internal navigation
                    window.location.href = item.href;
                  } else if (item.external) {
                    // For external links, open in new tab
                    window.open(item.href, '_blank', 'noopener,noreferrer');
                  }
                };
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 cursor-pointer no-underline ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                      when: 'beforeChildren'
                    }}
                    onClick={handleClick}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { 
                        type: 'spring', 
                        stiffness: 400, 
                        damping: 17 
                      } 
                    }}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    <div className="w-8 flex justify-center mr-3">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-medium">
                      {item.action === 'copy-email' ? (
                        <AnimatedText 
                          text={item.name} 
                          isActive={copiedItem === item.name} 
                          isEmail={true} 
                        />
                      ) : item.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
