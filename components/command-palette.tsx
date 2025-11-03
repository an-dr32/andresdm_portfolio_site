"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Command as CommandIcon, Moon, Sun, Download, Mail, ArrowRight, X } from "lucide-react";

type Cmd = {
  id: string;
  title: string;
  hint?: string;
  keywords?: string[];
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mode, setMode] = useState<'commands' | 'projects'>("commands");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);

  // Toggle theme similar to Sidebar behavior
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event('themechange'))
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      window.dispatchEvent(new Event('themechange'))
    }
  };

  const goto = (href: string) => {
    window.location.href = href;
    setOpen(false);
  };

  const downloadFile = (path: string) => {
    const a = document.createElement("a");
    a.href = path;
    a.download = ""; // Let browser infer filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setOpen(false);
  };

  const emailTo = (email: string) => {
    window.location.href = `mailto:${email}`;
    setOpen(false);
  };

  const randomProject = () => {
    const slugs = [
      "codigo-abierto-gdg-barranquilla-techcaribe",
      "hensall-coop-via-bairesdev",
      "saint-helein-holdings",
      "tech-caribe-expo-branding",
      "mobile-banking-app",
    ];
    const pick = slugs[Math.floor(Math.random() * slugs.length)];
    goto(`/projects/${pick}`);
  };

  // All projects for Search Project mode
  const allProjects = [
    { title: "Codigo Abierto / GDG Barranquilla / TechCaribe", slug: "codigo-abierto-gdg-barranquilla-techcaribe", category: "UI/UX Product Design", image: "/imgs/caweb/TCE1.png" },
    { title: "Hensall CoOp ERP System", slug: "hensall-coop-via-bairesdev", category: "UI/UX Product Design", image: "/imgs/hensall/hensallog.png" },
    { title: "Saint Helein Holdings — Vachero ERP", slug: "saint-helein-holdings", category: "UI/UX Product Design", image: "/imgs/vachero/vachero_007.png" },
    { title: "Tech Caribe Expo — Branding", slug: "tech-caribe-expo-branding", category: "Branding & Marketing", image: "/imgs/ca/thumb.png" },
    { title: "Mobile Banking App", slug: "mobile-banking-app", category: "Fintech", image: "/imgs/bit/bit1.png" },
    { title: "Flipminds.com Platform", slug: "flipmindscom", category: "UI/UX Product Design", image: "/api/placeholder/64/48" },
    { title: "Click: The Agency", slug: "click-the-agency", category: "UI Design", image: "/api/placeholder/64/48" },
  ];

  const commands: Cmd[] = useMemo(
    () => [
      { id: "go-about", title: "Go to About", keywords: ["about"], action: () => goto("/about") },
      // Projects section is presented in About; you can route to About for now
      { id: "go-projects", title: "Go to Projects", keywords: ["projects", "work"], action: () => goto("/about") },
      { id: "go-contact", title: "Go to Contact", keywords: ["contact"], action: () => emailTo("andresfdemoya@gmail.com") },
      { id: "download-resume", title: "Download Resume", keywords: ["resume", "cv", "download"], action: () => downloadFile(encodeURI("/cv/ATS-Optimized- Andres-De-Moya_CV2025_v3.pdf")) },
      { id: "email-me", title: "Email Me", keywords: ["email", "contact"], action: () => emailTo("&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#97;&#110;&#100;&#114;&#101;&#115;&#102;&#100;&#101;&#109;&#111;&#121;&#97;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;") },
      { id: "toggle-theme", title: "Toggle Dark Mode", keywords: ["dark", "light", "theme"], action: () => { toggleDarkMode(); setOpen(false); } },
      { id: "search-project", title: "Search Project", keywords: ["project", "search", "open"], action: () => { setMode('projects'); setQuery(''); setSelectedIdx(0); } },
      { id: "show-branding", title: "Show Branding Projects", keywords: ["branding"], action: () => goto("/?filter=branding") },
      { id: "show-uiux", title: "Show UI/UX Projects", keywords: ["ui", "ux", "product"], action: () => goto("/?filter=uiux") },
      { id: "random-project", title: "Random Project", keywords: ["random", "surprise"], action: () => randomProject() },
      { id: "view-tools", title: "View Tools & Tech Stack", keywords: ["tools", "tech", "stack", "skills"], action: () => goto("/about#skills") },
    ], []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      c.title.toLowerCase().includes(q) || (c.keywords || []).some((k) => k.includes(q))
    );
  }, [query, commands]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allProjects;
    return allProjects.filter((p) =>
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.slug.includes(q)
    );
  }, [query]);

  // Global hotkey: Cmd+K (Mac) or Ctrl+K (Win/Linux)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (isCmdK) {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) setMode('commands');
          return next;
        });
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        if (mode === 'projects') {
          // go back to commands mode first
          setMode('commands');
          setQuery("");
          setSelectedIdx(0);
        } else {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus management when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  // Basic focus trap
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'input,button,[href],select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          (last as HTMLElement).focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          (first as HTMLElement).focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Keyboard navigation inside the palette
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const max = mode === 'projects' ? Math.max(0, filteredProjects.length - 1) : Math.max(0, filtered.length - 1);
        setSelectedIdx((prev) => Math.min(prev + 1, max));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (mode === 'projects') {
          const item = filteredProjects[selectedIdx];
          if (item) goto(`/projects/${item.slug}`);
        } else {
          const cmd = filtered[selectedIdx];
          if (cmd) cmd.action();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, filtered, filteredProjects, selectedIdx, mode]);

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  return (
    <>
      {/* Hidden helper to advertise shortcut visually could be added in UI elsewhere */}
      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center p-4 md:p-8 bg-black/40 backdrop-blur-sm"
          onClick={onBackdropClick}
          aria-hidden={!open}
        >
          {/* Modal container - full screen on mobile */}
          <div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command Menu"
            className="w-full max-w-full md:max-w-2xl h-auto max-h-[80vh] md:max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/30 dark:border-white/10 animate-in fade-in zoom-in duration-150"
          >
            {/* Header / Search */}
            <div className="flex items-center gap-3 p-3 md:p-4 border-b border-white/30 dark:border-white/10 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl">
              <Search className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                aria-label="Search commands"
              />
              {/* Close button */}
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black/40 text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white dark:bg-white/20 dark:hover:bg-white/30"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="hidden md:flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 px-2 py-1 rounded bg-white/40 dark:bg-gray-800/40">
                <CommandIcon className="w-3 h-3" /> K
              </div>
            </div>

            {/* Tabs / Mode Indicator */}
            <div className="flex items-center gap-2 px-3 pt-2 md:px-4 text-xs text-gray-700 dark:text-gray-300">
              <button
                className={`px-2 py-1 rounded ${mode === 'commands' ? 'bg-white/40 dark:bg-gray-800/40' : 'hover:bg-white/30 dark:hover:bg-gray-800/30'}`}
                onClick={() => { setMode('commands'); setQuery(''); setSelectedIdx(0); }}
              >Commands</button>
              <button
                className={`px-2 py-1 rounded ${mode === 'projects' ? 'bg-white/40 dark:bg-gray-800/40' : 'hover:bg-white/30 dark:hover:bg-gray-800/30'}`}
                onClick={() => { setMode('projects'); setQuery(''); setSelectedIdx(0); }}
              >Projects</button>
            </div>

            {/* List */}
            <div className="max-h-[60vh] md:max-h-[60vh] overflow-auto p-2 md:p-3" role="listbox" aria-label={mode === 'projects' ? 'Projects' : 'Commands'}>
              {(mode === 'projects' ? filteredProjects.length === 0 : filtered.length === 0) ? (
                <div className="p-6 text-center text-gray-600 dark:text-gray-300">No {mode === 'projects' ? 'projects' : 'commands'} found</div>
              ) : (
                <ul className="space-y-1">
                  {mode === 'projects'
                    ? filteredProjects.map((p, idx) => (
                        <li key={p.slug}>
                          <button
                            ref={(el) => { if (el) itemRefs.current[idx] = el; }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100
                              ${selectedIdx === idx ? 'bg-white/50 dark:bg-gray-800/60' : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40'}`}
                            onMouseEnter={() => setSelectedIdx(idx)}
                            onClick={() => goto(`/projects/${p.slug}`)}
                            role="option"
                            aria-selected={selectedIdx === idx}
                          >
                            <span className="flex items-center gap-3 min-w-0">
                              <span className="w-9 h-9 rounded-md bg-white/70 dark:bg-gray-700/70 ring-1 ring-black/10 dark:ring-white/10 overflow-hidden flex items-center justify-center flex-none">
                                <img
                                  src={p.image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback placeholder if image fails
                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                                {/* Placeholder glyph when image hidden */}
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500 dark:text-gray-300">
                                  <path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 13l4.5 6H5l3.5-5.5M9 8a2 2 0 1 1-2 2a2 2 0 0 1 2-2Z" />
                                </svg>
                              </span>
                              <span className="truncate">
                                {p.title}
                                <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{p.category}</span>
                              </span>
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-70 flex-none" />
                          </button>
                        </li>
                      ))
                    : filtered.map((cmd, idx) => (
                        <li key={cmd.id}>
                          <button
                            ref={(el) => { if (el) itemRefs.current[idx] = el; }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100
                              ${selectedIdx === idx ? 'bg-white/50 dark:bg-gray-800/60' : 'bg-white/30 dark:bg-gray-800/30 hover:bg-white/40 dark:hover:bg-gray-800/40'}`}
                            onMouseEnter={() => setSelectedIdx(idx)}
                            onClick={() => cmd.action()}
                            role="option"
                            aria-selected={selectedIdx === idx}
                          >
                            <span>{cmd.title}</span>
                            <ArrowRight className="w-4 h-4 opacity-70" />
                          </button>
                        </li>
                      ))}
                </ul>
              )}
            </div>

            {/* Footer / Hints */}
            <div className="hidden md:flex items-center justify-between px-4 py-3 border-t border-white/30 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 bg-white/20 dark:bg-gray-900/20">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/40 dark:bg-gray-800/40">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/40 dark:bg-gray-800/40">↓</kbd> Navigate</span>
                <span className="inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/40 dark:bg-gray-800/40">Enter</kbd> Select</span>
                <span className="inline-flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/40 dark:bg-gray-800/40">Esc</kbd> Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
