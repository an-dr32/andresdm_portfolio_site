import type { Metadata } from 'next';
import BlogPostContent from '@/components/blog-post-content';

// Export metadata for blog posts
export const metadata: Metadata = {
  title: "Blog | Andres De Moya",
  description: "Insights and thoughts on UI/UX design, product development, and design systems by Andres De Moya.",
  keywords: "Design Blog, UX Writing, Product Design Insights, Design Systems",
};

// This is the page shell for individual blog posts
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />;
}
