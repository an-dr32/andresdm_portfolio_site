"use client";

import Sidebar from '@/components/sidebar'
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Project data - you can expand this with more projects
const projects = {
    'saint-helein-holdings': {
        title: "Vachero Farming ERP — Saint Helein Holdings",
        category: "UI/UX Product Design",
        date: "Jan. 2025 – Present",
        location: "Remote",
        heroImage: "/imgs/vachero/video.gif",
        images: [
            "/imgs/vachero/video.gif",
            "/imgs/vachero/vachero_001.png",
            "/imgs/vachero/vachero_002.png",
            "/imgs/vachero/vachero_003.png",
            "/imgs/vachero/vachero_004.png",
            "/imgs/vachero/vachero_005.png",
            "/imgs/vachero/vachero_006.png",
            "/imgs/vachero/vachero_007.png",
            "/imgs/vachero/vachero_008.png",
            "/imgs/vachero/vachero_009.png"
        ],
        idea: "I set out to design an end-to-end farming ERP tailored specifically for livestock operations, inventory oversight, and financial management. The goal was to unify on-ranch workflows into a single, coherent platform that empowers decision-making with accurate, real-time data. Unlike generic ERPs, this solution addresses the unique rhythms of agricultural businesses—where breeding cycles, feed efficiency, and herd health intersect with cash flow and resource planning.",
        build: "The foundation was a modular design system and scalable information architecture that could grow with the product. I mapped user journeys across multiple roles—ranch owners, farmhands, veterinarians, and accountants—to ensure every interaction felt intuitive and accessible. Complex processes such as livestock purchasing, feed distribution, breeding records, and cost tracking were simplified into guided flows that reduced cognitive load while remaining transparent and audit-ready. The design was built mobile-first for field usability, with accessibility standards embedded to serve a diverse user base. By using a component-driven approach, I ensured visual consistency and faster iteration as modules expanded.",
        shipped: "The initial release included core modules for livestock inventory management, cattle registries, and financial dashboards. Each prototype was developed as a high-fidelity, clickable flow and validated through structured sessions with domain experts. This iterative feedback loop allowed me to refine task sequences, minimize error states, and streamline data entry for conditions that vary daily in agricultural environments. Even in early pilots, the interface reduced friction in key workflows—such as recording animal weights, registering births, or reconciling feed expenses—by focusing on clarity, hierarchy, and smart defaults.",
        outcome: "Early pilot users reported both qualitative and quantitative improvements: clearer data capture, reduced redundancy across record-keeping, and faster task completion in routine workflows. Ranchers described the system as less intimidating than prior digital tools, while accountants noted improved accuracy in cost tracking. Metrics are now being collected on error reduction, workflow completion times, and adoption rates as deployment expands across larger herds and multi-site operations.",
        thoughts: "Vachero illustrates how domain-specific ERP design can transform traditionally complex agricultural processes into approachable, streamlined systems. By grounding the product in real user input, validating through iterative prototypes, and embedding accessibility from the start, the platform demonstrates how thoughtful UX and systems design can directly impact productivity and decision-making in agriculture."
    },
    'codigo-abierto-gdg-barranquilla-techcaribe': {
        title: "Codigo Abierto / GDG Barranquilla / TechCaribe",
        category: "UI/UX Product Design",
        date: "Jun. 2024 – Present",
        location: "Barranquilla, Colombia",
        heroImage: "/imgs/caweb/TCEWeb.gif",
        images: [
            "/imgs/caweb/TCEWeb.gif",
            "/imgs/caweb/TCE1.png",
            "/imgs/caweb/TCE2.png",
            "/imgs/caweb/TCE.png",
            "/imgs/caweb/web1.png",
            "/imgs/caweb/web2.png",
            "/imgs/caweb/web3.png"

        ],
        idea: "This project was born from the need to create a comprehensive digital platform that connects developers, designers, and tech enthusiasts in the Caribbean region. The goal was to build a community-driven platform that showcases local talent while providing resources and opportunities for growth in the tech ecosystem.",
        build: "The platform was designed with a mobile-first approach using modern design systems and lean UX methodologies. I led the end-to-end design process from initial wireframes to high-fidelity prototypes, ensuring accessibility standards (WCAG) were met throughout. The tech stack included React for the frontend with a robust design system built in Figma.",
        shipped: "The final result is a fully responsive platform that serves as both a portfolio showcase and community hub. Key features include user profiles, project galleries, event management, and resource sharing. The design emphasizes clarity and visual hierarchy, making it easy for users to discover opportunities and connect with others in the tech community.",
        outcome: "The platform successfully launched with over 200 registered users in its first month, with 30% of users actively engaging with the community features. Several local tech companies have used the platform to recruit talent, and the community has grown to host regular meetups and workshops.",
        thoughts: "This project reinforced the importance of community-driven design. By involving local developers and designers in the design process, we created a platform that truly serves its users' needs. The success has inspired similar initiatives in other Caribbean cities."
    },
    'tech-caribe-expo-branding': {
        title: "Tech Caribe Expo — Branding & Marketing (Codigo Abierto)",
        category: "Branding & Marketing",
        date: "2024 – 2025",
        location: "Barranquilla, Colombia",
        heroImage: "/imgs/ca/thumb.png",
        images: [
            "/imgs/ca/01-Cover.png",
            "/imgs/ca/02-introduction.png",
            "/imgs/ca/03-table_of_contents.png",
            "/imgs/ca/04-from_the_president.png",
            "/imgs/ca/05-connect_brand_stratery.png",
            "/imgs/ca/06-corporate_logo.png",
            "/imgs/ca/07-connect_brand_stratery.png",
            "/imgs/ca/08-logo_contruction%20%26%20Clearspace.png",
            "/imgs/ca/09-logo_minimum_size.png",
            "/imgs/ca/10-Corporate_Typography.png",
            "/imgs/ca/11-Brand_Typeface.png",
            "/imgs/ca/12-Primary_Typeface.png",
            "/imgs/ca/13-Corporate_Color.png",
            "/imgs/ca/14-Corporate_Color_Strategy.png",
            "/imgs/ca/15-Primary_Colors.png",
            "/imgs/ca/16-Secondary_Colors.png",
            "/imgs/ca/17-The_Company_Letterhead.png",
            "/imgs/ca/18-The_Right_Place_for_Logo.png",
            "/imgs/ca/19-Connect_Icons.png",
            "/imgs/ca/20%20-Photo_Gallery.png"
        ],
        idea: "Tech Caribe Expo needed a brand identity that could encapsulate the spirit of innovation in the Caribbean while fostering a sense of unity among designers, developers, entrepreneurs, and business leaders. The challenge was to create a visual system that was both forward-thinking and flexible—capable of representing the cutting-edge nature of technology while remaining inclusive and approachable for a diverse regional audience.",
        build: "I began with a strategic foundation, defining brand positioning, core values, and audience perception goals. From there, I developed a modular logo system that could adapt across mediums while maintaining recognizability. A vibrant color palette was chosen to evoke energy and optimism, complemented by modern typography to balance professionalism with approachability. The visual identity was extended to marketing campaigns, digital channels, and event collateral, with clear design logic to ensure scalability across print, web, and on-site experiences. To preserve consistency, I authored a comprehensive brand guide covering applications, tone of voice, and visual standards.",
        shipped: "The final deliverables included a complete brand package: primary and secondary logo assets, clearspace and sizing rules, iconography, and event-ready templates for presentations, stationery, signage, and merchandise. I also designed a social media toolkit, equipping organizers with adaptable assets to drive engagement before, during, and after the event. Every asset was built with flexibility in mind, empowering teams to produce high-quality communications without sacrificing brand integrity.",
        outcome: "The second iteration of Tech Caribe Expo launched with a stronger, more cohesive brand presence. Attendees and partners recognized the improved clarity in promotional campaigns, and organizers reported higher engagement across social media channels. The unified visual identity elevated the event’s professionalism, making it more attractive to sponsors and reinforcing its positioning as the leading technology showcase in the region.",
        thoughts: "This project demonstrates the power of a well-constructed brand system in amplifying visibility and credibility. By aligning strategic intent with visual execution, Tech Caribe Expo now has a flexible identity that communicates innovation and community while leaving room for evolution in future editions. A clear, modular system not only empowered organizers to remain consistent but also strengthened the Expo’s ability to grow into a recognizable and lasting regional brand."
    },
    'hensall-coop-via-bairesdev': {
        title: "Hensall CoOp ERP System",
        category: "UI/UX Product Design",
        date: "Feb. 2022 – Jul. 2024",
        location: "San Francisco, CA (Remote)",
        heroImage: "/imgs/hensall/hensallog.png",
        images: [
            "/imgs/hensall/oldhensall_01.png",
            "/imgs/hensall/oldhensall_02.png",
            "/imgs/hensall/oldhensall_03.png",
            "/imgs/hensall/hensall_001.png",
            "/imgs/hensall/hensall_002.png",
            "/imgs/hensall/hensall_003.png",
            "/imgs/hensall/hensall_01.png",
            "/imgs/hensall/hensall_02.png",
            "/imgs/hensall/hensall_03.png",
            "/imgs/hensall/Fertilizer Sales Order - Add - Custom Dry Blend.png"
        ],
        behanceUrl: "https://www.behance.net/gallery/216299097/Hensall-CoOp-ERP-UIUX-Design",
        mockupUrl: "https://erp-mockup-ochre.vercel.app/auth/login",
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
    },
    'mobile-banking-app': {
        title: "Mobile Banking App",
        category: "Fintech",
        date: "Jan. 2023 – Jun. 2023",
        location: "Remote",
        heroImage: "/imgs/bit/video.gif",
        images: [
            "/imgs/bit/video.gif",
            "/imgs/bit/bit1.png",
            "/imgs/bit/bit2.png",
            "/imgs/bit/bit3.png",
            "/imgs/bit/bit4.png",
            "/imgs/bit/bit5.png",
            "/imgs/bit/bit6.png"
        ],
        idea: "A mobile-first design for a cryptocurrency trading platform with a focus on accessibility and user-friendly interfaces. The challenge was to create an intuitive experience for both novice and experienced traders while maintaining security and compliance standards.",
        build: "I designed the mobile banking app using modern fintech design principles and accessibility guidelines. The process involved extensive user research with both crypto beginners and experienced traders, creating wireframes and prototypes that were tested across different devices and accessibility tools.",
        shipped: "The final app features a clean, intuitive interface with clear visual hierarchy, accessible color schemes, and comprehensive error handling. Key features include secure login, portfolio tracking, real-time trading, and educational content for new users.",
        outcome: "The app successfully launched with high user adoption rates and positive feedback on accessibility features. User testing showed significant improvements in task completion rates and user satisfaction compared to competitor apps.",
        thoughts: "This project highlighted the importance of accessibility in fintech applications. Designing for users with different abilities and technical backgrounds taught me valuable lessons about inclusive design that I apply to all my projects."
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
                    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={project.heroImage} alt={`${project.title} hero`} className="w-full h-full object-contain" />
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
                        <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                            <img src={project.images[currentImageIndex]} alt={`${project.title} screenshot ${currentImageIndex + 1}`} className="w-full h-full object-contain" />
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

                {/* External Links */}
                {(('behanceUrl' in project) && project.behanceUrl) || (('mockupUrl' in project) && (project as any).mockupUrl) ? (
                    <div className="mb-12 flex gap-3">
                        {('behanceUrl' in project) && project.behanceUrl && (
                            <a
                                href={(project as any).behanceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                            >
                                View on Behance
                                <ExternalLink size={16} />
                            </a>
                        )}
                        {('mockupUrl' in project) && (project as any).mockupUrl && (
                            <a
                                href={(project as any).mockupUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                            >
                                Open ERP Mockup
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                ) : null}

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