import type { Metadata } from 'next';
import ProjectDetailContent from '@/components/project-detail-content';

// Export metadata for project pages
export const metadata: Metadata = {
    title: "Projects | Andres De Moya",
    description: "Explore detailed case studies and project work by Andres De Moya, UI/UX Product Designer.",
    keywords: "Project Case Studies, UI/UX Design, Product Design, Design Portfolio",
};

// This is the page shell for individual project pages
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const awaitedParams = await params;
    return <ProjectDetailContent slug={awaitedParams.slug} />;
}