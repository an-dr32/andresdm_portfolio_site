"use client";

import Link from 'next/link';
import { blogPosts } from '@/components/blog-post-content';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
                <h1 className="text-4xl font-bold mb-8">Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group block p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow bg-white dark:bg-gray-900"
                        >
                            <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                                    {post.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
