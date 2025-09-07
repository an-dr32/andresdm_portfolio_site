import Sidebar from '@/components/sidebar'
import HomepageContent from '@/components/homepage-content'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <HomepageContent />
    </div>
  )
}

