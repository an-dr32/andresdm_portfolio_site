"use client";

import { useState, useEffect } from 'react'
import { Command, Check, Copy, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: "Codigo Abierto / GDG Barranquilla / TechCaribe",
    category: "UI/UX Product Design",
    description: "Community-driven platform connecting developers and designers in the Caribbean region",
    image: "/api/placeholder/400/300",
    color: "bg-gradient-to-br from-green-600 to-green-800",
    slug: "codigo-abierto-gdg-barranquilla-techcaribe"
  },
  {
    id: 2,
    title: "Hensall CoOp ERP System",
    category: "UI/UX Product Design",
    description: "Comprehensive ERP system redesign reducing task completion time by 200%",
    image: "/api/placeholder/400/300",
    color: "bg-gradient-to-br from-teal-600 to-cyan-700",
    slug: "hensall-coop-via-bairesdev"
  },
  {
    id: 3,
    title: "Flipminds.com Platform",
    category: "UI/UX Product Design",
    description: "Scalable design system for educational platform serving students across Dubai",
    image: "/api/placeholder/400/300",
    color: "bg-gradient-to-br from-purple-600 to-purple-800",
    slug: "flipmindscom"
  },
  {
    id: 4,
    title: "Click: The Agency",
    category: "UI Design",
    description: "Mobile-first UI interfaces for North American and local clients",
    image: "/api/placeholder/400/300",
    color: "bg-gradient-to-br from-orange-600 to-red-600",
    slug: "click-the-agency"
  },
  {
    id: 5,
    title: "Mobile Banking App",
    category: "Fintech",
    description: "Mobile-first design for cryptocurrency trading platform with focus on accessibility",
    image: "/api/placeholder/400/300",
    color: "bg-gradient-to-br from-blue-900 to-indigo-900",
    slug: "mobile-banking-app"
  },
  {
    id: 6,
    title: "View All Projects",
    category: "Portfolio",
    description: "Explore my complete portfolio of design work and case studies",
    image: "/api/placeholder/400/300",
    color: "bg-gray-900",
    slug: "behance",
    isExternal: true,
    externalUrl: "https://www.behance.net/ademoya"
  }
]

export default function HomepageContent() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const words = ["Designer", "Developer", "UI/UX", "Builder", "Vibe Coder"]
  const currentWord = words[currentWordIndex]

  // Continuous typing animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentWord.length) {
        // Typing forward
        setDisplayedText(currentWord.slice(0, displayedText.length + 1))
      } else if (!isDeleting && displayedText.length === currentWord.length) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayedText.length > 0) {
        // Deleting backward
        setDisplayedText(currentWord.slice(0, displayedText.length - 1))
      } else if (isDeleting && displayedText.length === 0) {
        // Move to next word
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentWord, currentWordIndex])

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText('andresfdemoya@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.log('Failed to copy email:', err)
    }
  }

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3)

  return (
    <div className="min-h-screen lg:ml-64 p-6 lg:p-12 transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
      {/* Header with keyboard shortcut only */}
      <div className="flex justify-end items-center mb-8 lg:mb-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Press</span>
          <kbd className="px-2 py-1 border rounded text-xs font-mono bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
            <Command size={12} className="inline mr-1" />
            K
          </kbd>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-12 lg:mb-16">
        <div className="relative">
          <h1 className="text-4xl lg:text-6xl font-bold mb-2 lg:mb-6 leading-tight text-gray-900 dark:text-white">
            I'm Andres,
            <span className="max-[400px]:hidden">
              {' '}<span className="relative">
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{
                  backgroundImage: currentWordIndex === 0 ? 'linear-gradient(to right, #8b5cf6, #ec4899, #7c3aed)' :
                    currentWordIndex === 1 ? 'linear-gradient(to right, #10b981, #f97316, #10b981)' :
                      currentWordIndex === 2 ? 'linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4)' :
                        currentWordIndex === 3 ? 'linear-gradient(to right, #eab308, #22c55e, #eab308)' :
                          currentWordIndex === 4 ? 'linear-gradient(to right, #f97316, #ef4444, #f97316)' :
                            'linear-gradient(to right, #8b5cf6, #ec4899, #7c3aed)'
                }}>
                  {displayedText}
                </span>
                <span className="animate-pulse">|</span>
              </span>
            </span>
          </h1>
          <div className="h-0 max-[400px]:h-16 max-[400px]:block">
            <div className="hidden max-[400px]:block text-4xl lg:text-6xl font-bold leading-tight">
              <span className="relative">
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{
                  backgroundImage: currentWordIndex === 0 ? 'linear-gradient(to right, #8b5cf6, #ec4899, #7c3aed)' :
                    currentWordIndex === 1 ? 'linear-gradient(to right, #10b981, #f97316, #10b981)' :
                      currentWordIndex === 2 ? 'linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4)' :
                        currentWordIndex === 3 ? 'linear-gradient(to right, #eab308, #22c55e, #eab308)' :
                          currentWordIndex === 4 ? 'linear-gradient(to right, #f97316, #ef4444, #f97316)' :
                            'linear-gradient(to right, #8b5cf6, #ec4899, #7c3aed)'
                }}>
                  {displayedText}
                </span>
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>
        </div>
        <p className="text-lg lg:text-xl max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300" data-macaly="hero-description">
          UI/UX Product Designer specialized in B2B enterprise software.
          Passionate about turning complex problems into intuitive, scalable,
          and inclusive user experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {visibleProjects.map((project) => {
          const ProjectWrapper = project.isExternal ? 'a' : Link
          const projectProps = project.isExternal
            ? {
              href: project.externalUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group cursor-pointer block"
            }
            : {
              href: `/projects/${project.slug}`,
              className: "group cursor-pointer block"
            }

          return (
            <ProjectWrapper
              key={project.id}
              {...projectProps}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image/Card */}
              <div className={`${project.color} rounded-2xl h-48 lg:h-64 mb-4 flex items-center justify-center transition-transform duration-300 ${hoveredProject === project.id ? 'scale-105' : ''
                }`}>
                <div className="text-white dark:text-white text-center p-6">
                  {project.isExternal ? (
                    // Behance Portfolio Card
                    <div className="w-12 h-12 bg-white/20 dark:bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">B</span>
                      </div>
                    </div>
                  ) : (
                    // Regular Project Card
                    <div className="w-12 h-12 bg-white/20 dark:bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold" data-macaly={`project-${project.id}-title`}>
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" data-macaly={`project-${project.id}-name`}>
                    {project.title}
                  </h3>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-400" data-macaly={`project-${project.id}-category`}>
                  {project.category}
                </p>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-500" data-macaly={`project-${project.id}-description`}>
                  {project.description}
                </p>
              </div>
            </ProjectWrapper>
          )
        })}
      </div>

      {/* Show More/Less Button */}
      {projects.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="px-6 py-3 rounded-lg transition-colors bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {showAllProjects ? 'Show Less' : `Show More (${projects.length - 3} more projects)`}
          </button>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-16 lg:mt-8 text-center">
        <p className="mb-4 text-gray-600 dark:text-gray-300" data-macaly="contact-cta">
          Let's bring dreams to life.
        </p>
        <button
          onClick={handleEmailCopy}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
          data-macaly="contact-button"
        >
          {emailCopied ? (
            <>
              <Check size={16} className="text-green-500" />
              Email Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              andresfdemoya@gmail.com
            </>
          )}
        </button>
      </div>
    </div>
  )
}