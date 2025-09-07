import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import BlogPageContent from '@/components/blog-page-content';

export const metadata: Metadata = siteMetadata['/blog'];

export default function BlogPage() {
  return <BlogPageContent />;
}