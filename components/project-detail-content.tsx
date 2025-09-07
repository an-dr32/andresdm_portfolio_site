"use client";

import Sidebar from '@/components/sidebar'
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Project data - you can expand this with more projects
const projects = {
    'codigo-abierto-gdg-barranquilla-techcaribe': {
        title: "Codigo Abierto / GDG Barranquilla / TechCaribe",
        category: "UI/UX Product Design",
        date: "Jun. 2024 – Present",
        location: "Barranquilla, Colombia",
        heroImage: "/images/projects/codigo-abierto-hero.jpg",
        images: [
            "/images/projects/codigo-abierto-1.jpg",
            "/images/projects/codigo-abierto-2.jpg",
            "/images/projects/codigo-abierto-3.jpg",
            "/images/projects/codigo-abierto-4.jpg"
        ],
        idea: "This project was born from the need to create a comprehensive digital platform that connects developers, designers, and tech enthusiasts in the Caribbean region. The goal was to build a community-driven platform that showcases local talent while providing resources and opportunities for growth in the tech ecosystem.",
        build: "The platform was designed with a mobile-first approach using modern design systems and lean UX methodologies. I led the end-to-end design process from initial wireframes to high-fidelity prototypes, ensuring accessibility standards (WCAG) were met throughout. The tech stack included React for the frontend with a robust design system built in Figma.",
        shipped: "The final result is a fully responsive platform that serves as both a portfolio showcase and community hub. Key features include user profiles, project galleries, event management, and resource sharing. The design emphasizes clarity and visual hierarchy, making it easy for users to discover opportunities and connect with others in the tech community.",
        outcome: "The platform successfully launched with over 200 registered users in its first month, with 30% of users actively engaging with the community features. Several local tech companies have used the platform to recruit talent, and the community has grown to host regular meetups and workshops.",
        thoughts: "This project reinforced the importance of community-driven design. By involving local developers and designers in the design process, we created a platform that truly serves its users' needs. The success has inspired similar initiatives in other Caribbean cities."
    },
    'hensall-coop-via-bairesdev': {
        title: "Hensall CoOp ERP System",
        category: "UI/UX Product Design",
        date: "Feb. 2022 – Jul. 2024",
        location: "San Francisco, CA (Remote)",
        heroImage: "/images/projects/hensall-hero.jpg",
        images: [
            "/images/projects/hensall-1.jpg",
            "/images/projects/hensall-2.jpg",
            "/images/projects/hensall-3.jpg",
            "/images/projects/hensall-4.jpg"
        ],
        idea: "Hensall CoOp needed a comprehensive ERP system that could streamline their agricultural operations across finance, logistics, and operations. The challenge was to design an interface that could handle complex workflows while remaining intuitive for users with varying technical backgrounds.",
        build: "I designed the ERP UI using Material Design principles and lean UX methodologies. The process involved extensive collaboration with the CEO, CFO, and CAO to map workflows across all departments. I created detailed user flows and wireframes before developing high-fidelity prototypes that were tested with end users.",
        shipped: "The final ERP system features a clean, intuitive interface that reduces cognitive load for users. Key improvements include streamlined data entry forms, clear navigation hierarchies, and contextual help systems. The design system ensures consistency across all modules while maintaining flexibility for future enhancements.",
        outcome: "The new ERP system reduced task completion time by 200% and decreased user errors by 80%. User adoption was significantly higher than expected, with 95% of staff fully trained within the first month. The system has since been expanded to handle additional workflows and user roles.",
        thoughts: "This project taught me the importance of understanding business processes before designing interfaces. The collaboration with C-level executives was crucial in ensuring the design met both user needs and business requirements. The success has led to similar projects with other agricultural cooperatives."
    },
    'flipmindscom': {
        title: "Flipminds.com Platform",
        category: "UI/UX Product Design",
        date: "Apr. 2018 – Aug. 2019",
        location: "Dubai, UAE",
        heroImage: "/images/projects/flipminds-hero.jpg",
        images: [
            "/images/projects/flipminds-1.jpg",
            "/images/projects/flipminds-2.jpg",
            "/images/projects/flipminds-3.jpg",
            "/images/projects/flipminds-4.jpg"
        ],
        idea: "Flipminds.com was designed to be a comprehensive learning platform that connects students with tutors and educational resources. The goal was to create an intuitive interface that could handle complex scheduling, payment processing, and content delivery while maintaining a user-friendly experience.",
        build: "I created and maintained scalable design systems for both mobile and web products, ensuring consistency across platforms. The design process involved extensive user research to understand the needs of both students and tutors. I collaborated closely with product managers and developers to enhance core user flows.",
        shipped: "The platform features a responsive design that works seamlessly across devices. Key features include intelligent matching algorithms, integrated payment systems, and comprehensive progress tracking. The design emphasizes accessibility and ease of use, making it suitable for users of all technical levels.",
        outcome: "The platform successfully launched with over 1,000 registered users in the first quarter. User engagement metrics showed significant improvements in session duration and completion rates. The platform has since expanded to serve multiple educational markets across the UAE.",
        thoughts: "This project highlighted the importance of designing for multiple user types within a single platform. The challenge of balancing student and tutor needs while maintaining a cohesive experience was both challenging and rewarding. The success has informed my approach to multi-sided platform design."
    },
    'click-the-agency': {
        title: "Click: The Agency",
        category: "UI Design",
        date: "Nov. 2016 – Feb. 2017",
        location: "Barranquilla, Colombia",
        heroImage: "/images/projects/click-hero.jpg",
        images: [
            "/images/projects/click-1.jpg",
            "/images/projects/click-2.jpg",
            "/images/projects/click-3.jpg",
            "/images/projects/click-4.jpg"
        ],
        idea: "Click: The Agency needed a portfolio of mobile-first UI interfaces for local and North American clients. The challenge was to deliver high-quality designs on fast-paced timelines while maintaining consistency across different client requirements and brand guidelines.",
        build: "I designed mobile-first UI interfaces using modern design principles and rapid prototyping techniques. The process involved close collaboration with clients to understand their specific needs and brand requirements. I created high-fidelity assets and detailed design specifications for seamless handoff to development teams.",
        shipped: "The final deliverables included comprehensive UI kits with components, icons, and design specifications. Each project featured responsive designs that worked seamlessly across different screen sizes and devices. The design system ensured consistency while allowing for customization per client needs.",
        outcome: "Successfully delivered projects for multiple clients within tight deadlines, with positive feedback on both design quality and delivery speed. The mobile-first approach proved effective for client satisfaction and user engagement metrics.",
        thoughts: "This project taught me the importance of efficient design workflows and clear communication with clients. The experience of working on multiple projects simultaneously while maintaining quality standards has been invaluable for my career development."
    }
}

export default function ProjectDetailContent({ slug }: { slug: string }) {
    const project = projects[slug as keyof typeof projects]
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!project) {
        return (
            <div className="flex min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
                <Sidebar />
                <div className="lg:ml-64 p-6 lg:p-12 max-w-4xl w-full">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
                        <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Back to About
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
            <Sidebar />

            <div className="lg:ml-64 p-6 lg:p-12 max-w-4xl w-full">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to About
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <div className="mb-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {project.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{project.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{project.location}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="mb-12">
                    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">Hero Image Placeholder</span>
                        </div>
                    </div>
                </div>

                {/* The Idea */}
                <section className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        The Idea
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.idea}
                        </p>
                    </div>
                </section>

                {/* The Build */}
                <section className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        The Build
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.build}
                        </p>
                    </div>
                </section>

                {/* What I Shipped */}
                <section className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        What I Shipped
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.shipped}
                        </p>
                    </div>
                </section>

                {/* Image Carousel */}
                <section className="mb-12">
                    <div className="relative">
                        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                <span className="text-gray-500 dark:text-gray-400">Project Image {currentImageIndex + 1}</span>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {project.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex
                                        ? 'bg-white'
                                        : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Outcome */}
                <section className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        The Outcome
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.outcome}
                        </p>
                    </div>
                </section>

                {/* Final Thoughts */}
                <section className="mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Final Thoughts
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {project.thoughts}
                        </p>
                    </div>
                </section>

                {/* More Projects Link */}
                <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            More Projects
                        </h3>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            View all projects
                            <ExternalLink size={16} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
} 