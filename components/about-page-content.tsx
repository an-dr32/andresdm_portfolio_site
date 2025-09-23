"use client";

import Sidebar from '@/components/sidebar'
import { MapPin, Mail, ExternalLink, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const experiences = [
  {
    company: "Saint Helein Holdings",
    role: "UI/UX PRODUCT DESIGNER",
    period: "Jan. 2025 – Present",
    location: "Remote",
    achievements: [
      "Leading end‑to‑end product design for Vachero, a farming ERP focused on finance, inventory, and livestock operations.",
      "Established a modular design system to speed delivery and ensure consistency across complex data‑heavy workflows.",
      "Collaborating with stakeholders to pilot key modules; early testing shows faster task completion and improved data accuracy."
    ]
  },
  {
    company: "Codigo Abierto / GDG Barranquilla / TechCaribe",
    role: "UI/UX PRODUCT DESIGNER",
    period: "Jun. 2024 – Present",
    location: "Barranquilla, Colombia",
    achievements: [
      "Boosted user conversion by 30% through a complete redesign of a responsive website.",
      "Led end‑to‑end UI/UX process: wireframes, user flows, and high‑fidelity prototypes.",
      "Designed the brand identity and digital experience for the TechCaribe Expo event."
    ]
  },
  {
    company: "Tech Caribe Expo Branding (Codigo Abierto)",
    slug: "tech-caribe-expo-branding",
    role: "BRAND + MARKETING DESIGN",
    period: "2024 – 2025",
    location: "Barranquilla, Colombia",
    achievements: [
      "Developed the Tech Caribe Expo visual identity and comprehensive brand guidelines.",
      "Defined color, typography, iconography systems and event collateral for cross‑channel consistency.",
      "Shipped social media and marketing assets powering the event’s second yearly iteration."
    ]
  },
  {
    company: "Hensall CoOp via BairesDev",
    role: "UI/UX PRODUCT DESIGNER",
    period: "Feb. 2022 – Jul. 2024",
    location: "San Francisco, CA (Remote)",
    achievements: [
      "Designed and launched ERP UI using Material Design and lean UX methodologies.",
      "Collaborated with CEO, CFO, and CAO to map workflows across finance, logistics, and operations.",
      "Reduced task completion time by 200% and decreased user errors by 80%."
    ]
  },
  {
    company: "Flipminds.com",
    role: "UI/UX PRODUCT DESIGNER",
    period: "Apr. 2018 – Aug. 2019",
    location: "Dubai, UAE",
    achievements: [
      "Created and maintained scalable design systems for mobile and web products.",
      "Enhanced core user flows in collaboration with PMs and devs to improve engagement."
    ]
  },
  {
    company: "Click: The Agency",
    role: "UI DESIGNER",
    period: "Nov. 2016 – Feb. 2017",
    location: "Barranquilla, Colombia",
    achievements: [
      "Designed mobile‑first UI interfaces for local and North American clients.",
      "Delivered high‑fidelity assets and design specs on fast‑paced timelines."
    ]
  }
]

const skills = {
  "DESIGN EXPERTISE": [
    { name: "Product Design", description: "Creating digital products that solve user problems and meet business goals" },
    { name: "Interaction Design", description: "Designing how users interact with digital interfaces and systems" },
    { name: "UX Research", description: "Understanding user needs through research methods and data analysis" },
    { name: "Design Thinking", description: "Human-centered approach to solving complex problems creatively" },
    { name: "Human‑Centered Design", description: "Designing with users' needs, behaviors, and preferences at the core" },
    { name: "Information Architecture", description: "Organizing and structuring information for optimal user navigation" },
    { name: "UX Writing", description: "Crafting clear, helpful text that guides users through interfaces" },
    { name: "Mobile‑first Design", description: "Designing for mobile devices first, then scaling up to larger screens" },
    { name: "Accessibility (WCAG/a11y)", description: "Ensuring digital products are usable by people with disabilities" }
  ],
  "TOOLS & TECHNOLOGIES": [
    { name: "Figma", description: "Modern design tool for collaborative interface design and prototyping" },
    { name: "Sketch", description: "Vector-based design tool for UI/UX design and prototyping" },
    { name: "Protopie", description: "Advanced prototyping tool for creating interactive prototypes" },
    { name: "Invision", description: "Digital product design platform for prototyping and collaboration" },
    { name: "Adobe Suite", description: "Creative software suite including Photoshop, Illustrator, and XD" },
    { name: "Maya", description: "3D computer graphics software for modeling and animation" },
    { name: "Blender", description: "Free 3D creation suite for modeling, animation, and rendering" },
    { name: "Google Analytics", description: "Web analytics service to track and report website traffic" },
    { name: "UTM Builder", description: "Tool for creating tracking parameters for marketing campaigns" },
    { name: "VSCode", description: "Popular code editor with extensive customization and extension support" },
    { name: "Warp", description: "Modern terminal built for speed and developer experience" },
    { name: "Windscribe", description: "VPN service for secure and private internet browsing" },
    { name: "Cursor", description: "AI-powered code editor built on VS Code for enhanced development" }
  ],
  "PROGRAMMING": [
    { name: "HTML", description: "Markup language for structuring web content and pages" },
    { name: "CSS", description: "Styling language for designing the visual presentation of web pages" },
    { name: "JavaScript", description: "Programming language for creating interactive web experiences" },
    { name: "React", description: "JavaScript library for building user interfaces and single-page applications" },
    { name: "Next.js", description: "React framework for production with server-side rendering and static site generation" },
    { name: "Node.js", description: "JavaScript runtime for building scalable server-side applications" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development with pre-built classes" },
    { name: "Bootstrap", description: "Popular CSS framework for responsive web design with pre-built components" },
    { name: "Python", description: "Versatile programming language for automation and data analysis" },
    { name: "Linux", description: "Open-source operating system for servers, development, and security testing" },
    { name: "Servers", description: "Server administration and deployment for web applications and services" },
    { name: "Arduino", description: "Open-source electronics platform for creating interactive projects" }
  ],
  "CYBERSECURITY": [
    { name: "Wireshark", description: "Network protocol analyzer for capturing and analyzing network traffic" },
    { name: "Nmap", description: "Network discovery and security auditing tool for network exploration" },
    { name: "Metasploit", description: "Penetration testing framework for security research and testing" },
    { name: "Burp Suite", description: "Web application security testing platform for vulnerability assessment" },
    { name: "Kali Linux", description: "Penetration testing and security auditing Linux distribution" },
    { name: "Parrot OS", description: "Security-focused Linux distribution for penetration testing and digital forensics" },
    { name: "OWASP ZAP", description: "Open-source web application security scanner for finding vulnerabilities" }
  ]
}

export default function AboutPageContent() {
  // Smooth scroll to hash anchors (e.g., #skills) when arriving via /about#skills
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
    }
  }, [])
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-64 p-6 lg:p-12 max-w-4xl w-full">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-macaly="about-title">
            Andres De Moya
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6" data-macaly="about-subtitle">
            UI/UX · PRODUCT DESIGNER
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 lg:gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span data-macaly="location">Barranquilla, Atlantico, Colombia</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:andresfdemoya@gmail.com" className="hover:text-gray-900 dark:hover:text-white" data-macaly="email">
                andresfdemoya@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink size={16} />
              <a href="https://www.behance.net/ademoya" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white" data-macaly="behance">
                www.behance.net/ademoya
              </a>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mb-8 lg:mb-12 p-4 lg:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <blockquote className="text-lg italic text-gray-700 dark:text-gray-300" data-macaly="quote">
            "Let's bring dreams to life."
          </blockquote>
        </div>

        {/* Summary */}
        <section className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">Summary</h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p data-macaly="summary-1">• UI/UX Product Designer specialized in B2B enterprise software.</p>
            <p data-macaly="summary-2">• Strong in lean UX, design systems, accessibility (WCAG), and mobile‑first design.</p>
            <p data-macaly="summary-3">• Passionate about turning complex problems into intuitive, scalable, and inclusive user experiences.</p>
            <p data-macaly="summary-4">• Skilled in design thinking, cross‑functional collaboration, and agile product development.</p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Click on any experience to view detailed project information</p>
          <div className="space-y-6 lg:space-y-8">
            {experiences.map((exp: any, index) => {
              // Map experience to project slug (use explicit slug if provided)
              const projectSlug = exp.slug ? exp.slug : exp.company.toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')

              return (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 lg:pl-6 relative group cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  <div className="absolute w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full -left-2 top-1 group-hover:bg-gray-500 dark:group-hover:bg-gray-500 transition-colors"></div>
                  <Link href={`/projects/${projectSlug}`} className="block">
                    <div className="mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 rounded px-2 py-1 -mx-2 flex items-center gap-2" data-macaly={`exp-${index}-company`}>
                        {exp.company}
                        <span className="text-xs text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">View Project →</span>
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-1" data-macaly={`exp-${index}-location`}>{exp.location}</p>
                    </div>
                    <div className="mb-3">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm lg:text-base" data-macaly={`exp-${index}-role`}>{exp.role}</p>
                      <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1" data-macaly={`exp-${index}-period`}>
                        <Calendar size={14} />
                        {exp.period}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-700 dark:text-gray-300 text-sm lg:text-base" data-macaly={`exp-${index}-achievement-${achIndex}`}>
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        {/* Speaking */}
        <section className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4">Presentation</h2>
          <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 lg:pl-6 relative">
            <div className="absolute w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full -left-2 top-1"></div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base" data-macaly="presentation-event">Read Team BQ meetings sponsored by HackTheBox</h3>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-1" data-macaly="presentation-location">Barranquilla, Colombia</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm lg:text-base" data-macaly="presentation-title">SPEAKER FOR &lt;FLIPPER ZERO TO HERO&gt;</p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-3" data-macaly="presentation-date">
              <Calendar size={14} />
              December 2024
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="text-sm lg:text-base" data-macaly="presentation-point-1">• Spoke about the history of the Flipper Zero and its functionality.</li>
              <li className="text-sm lg:text-base" data-macaly="presentation-point-2">• Spoke about specific styles of hacking that can be done with the Flipper Zero and some of its boards.</li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills</h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm lg:text-base" data-macaly={`skills-${category.toLowerCase().replace(/\s+/g, '-')}-title`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <div
                      key={index}
                      className="relative group"
                      data-macaly={`skill-${category.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                    >
                      <span className="px-2 lg:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs lg:text-sm cursor-help">
                        {skill.name}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-lg lg:max-w-xl">
                        {skill.description}
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

