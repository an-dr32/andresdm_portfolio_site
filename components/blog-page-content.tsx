"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/sidebar';
import { Calendar, Clock, ArrowRight, Search, Filter, SortAsc, SortDesc, Check } from 'lucide-react';

// Calculate dynamic dates
const currentDate = new Date();
const baseDate = new Date(currentDate);
baseDate.setDate(baseDate.getDate() - 3); // First date is 3 days before the current date

// Helper function to format dates consistently
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Blog posts data with dynamic dates
const blogPosts = [
  {
    id: 1,
    slug: "building-accessible-design-systems",
    title: "Building Accessible Design Systems for B2B Software",
    excerpt: "How I approach creating inclusive design systems that work for enterprise users with diverse needs and technical backgrounds.",
    date: formatDate(baseDate), // First date
    readTime: "8 min read",
    category: "Design Systems",
    featured: true,
  },
  {
    id: 2,
    slug: "mobile-first-enterprise-ux",
    title: "The Impact of Mobile-First Design in Enterprise UX",
    excerpt: "Lessons learned from redesigning complex ERP interfaces with a mobile-first approach and the surprising results.",
    date: formatDate(new Date(baseDate.getTime() - 17 * 24 * 60 * 60 * 1000)), // 17 days before the first date
    readTime: "6 min read",
    category: "Mobile Design",
  },
  {
    id: 3,
    slug: "flipper-zero-to-ux",
    title: "From Flipper Zero to UX: Bridging Hardware and Software Design",
    excerpt: "My journey from speaking about hardware hacking to applying those problem-solving skills in digital product design.",
    date: formatDate(new Date(baseDate.getTime() - 35 * 24 * 60 * 60 * 1000)), // 35 days before the first date
    readTime: "5 min read",
    category: "Career",
  },
  {
    id: 4,
    slug: "lean-ux-case-study",
    title: "Lean UX in Practice: Reducing User Errors by 80%",
    excerpt: "A case study on how lean UX methodologies helped transform a complex agricultural ERP system.",
    date: formatDate(new Date(baseDate.getTime() - 54 * 24 * 60 * 60 * 1000)), // 54 days before the first date
    readTime: "10 min read",
    category: "Case Study",
  },
  {
    id: 5,
    slug: "design-thinking-cross-functional-teams",
    title: "Design Thinking for Cross-Functional Teams",
    excerpt: "Strategies for collaborating effectively with CEOs, CFOs, and technical teams on complex product decisions.",
    date: formatDate(new Date(baseDate.getTime() - 71 * 24 * 60 * 60 * 1000)), // 71 days before the first date
    readTime: "7 min read",
    category: "Collaboration",
  },
];

const categories = ["All", "Design Systems", "Mobile Design", "Career", "Case Study", "Collaboration"];

export default function BlogPageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Filter and sort posts
  useEffect(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, sortOrder])

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Simulate subscription
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />

      <div className="lg:ml-64 p-6 lg:p-12 max-w-6xl w-full">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-macaly="blog-title">
            Blog
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300" data-macaly="blog-subtitle">
            Insights and thoughts on UI/UX design, product development, and design systems.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-w-[160px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[120px] justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {sortOrder === "newest" ? <SortDesc size={16} /> : <SortAsc size={16} />}
              <span className="text-sm font-medium">
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </span>
            </button>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPosts.length === blogPosts.length
              ? `Showing all ${filteredPosts.length} articles`
              : `Found ${filteredPosts.length} of ${blogPosts.length} articles`
            }
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && searchTerm === "" && selectedCategory === "All" && (
          <div className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 text-white">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium" data-macaly="featured-category">
                  Featured • {featuredPost.category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight" data-macaly="featured-title">
                {featuredPost.title}
              </h2>
              <p className="text-gray-300 text-base lg:text-lg mb-6 leading-relaxed" data-macaly="featured-excerpt">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span data-macaly="featured-date">{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span data-macaly="featured-read-time">{featuredPost.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors w-fit"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer h-full">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 lg:p-6 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow duration-300 h-full flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium" data-macaly={`post-${post.id}-category`}>
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2" data-macaly={`post-${post.id}-title`}>
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm lg:text-base flex-grow line-clamp-3" data-macaly={`post-${post.id}-excerpt`}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mt-auto">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span data-macaly={`post-${post.id}-date`}>
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span data-macaly={`post-${post.id}-read-time`}>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                        <span>Read</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 lg:mt-16 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4" data-macaly="newsletter-title">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6" data-macaly="newsletter-description">
            Get notified when I publish new insights on design, UX, and product development.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              data-macaly="newsletter-input"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              disabled={subscribed}
            >
              {subscribed ? (
                <>
                  <Check size={16} className="text-green-400" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {subscribed && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-3">
              Thank you for subscribing! You'll receive updates about new articles.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


