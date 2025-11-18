import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Plus,
  Image,
  Save,
  Eye,
  Upload,
  Edit3,
  Calendar,
  Tag,
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
  ChevronDown,
  Filter,
  MoreHorizontal
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: 'draft' | 'review' | 'published'
  author: string
  publishDate: string
  lastModified: string
  featuredImage?: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
}

const mockPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Ultimate Guide to Biohacking Your Sleep',
    slug: 'ultimate-guide-biohacking-sleep',
    content: '<h2>Introduction</h2><p>Sleep is the foundation of optimal health and performance...</p>',
    excerpt: 'Discover the science-backed strategies to optimize your sleep for peak performance and recovery.',
    status: 'published',
    author: 'Camilla',
    publishDate: '2025-09-15',
    lastModified: '2025-09-15',
    featuredImage: 'https://via.placeholder.com/400x200',
    tags: ['Sleep', 'Biohacking', 'Health'],
    seoTitle: 'The Ultimate Guide to Biohacking Your Sleep | BiohackMe',
    seoDescription: 'Learn science-backed sleep optimization strategies for peak performance.'
  },
  {
    id: 'post-2',
    title: 'Top 10 Supplements for Cognitive Enhancement',
    slug: 'top-10-supplements-cognitive-enhancement',
    content: '<h2>Nootropics for Brain Power</h2><p>These supplements can enhance focus and mental clarity...</p>',
    excerpt: 'Explore the best evidence-based supplements for boosting cognitive function and mental performance.',
    status: 'draft',
    author: 'Camilla',
    publishDate: '2025-09-20',
    lastModified: '2025-09-18',
    featuredImage: 'https://via.placeholder.com/400x200',
    tags: ['Supplements', 'Cognitive Health', 'Nootropics'],
    seoTitle: 'Top 10 Supplements for Cognitive Enhancement | BiohackMe',
    seoDescription: 'Discover the best supplements for brain health and cognitive performance.'
  }
]

export default function ContentCMS() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back to your Content Dashboard</h1>
        <p className="text-blue-100">Manage your content, track performance, and grow your audience</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ 12% this month</p>
        </div>

        <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.status === 'published').length}</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ 8% this month</p>
        </div>

        <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.status === 'draft').length}</p>
            </div>
            <Edit3 className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-600 mt-2">2 pending review</p>
        </div>

        <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Views</p>
              <p className="text-2xl font-bold text-gray-900">12.4k</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↗ 24% this month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">Modified {post.lastModified}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Author</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
                <th className="text-right py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-gray-200 rounded flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-500">{post.excerpt.substring(0, 60)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{post.author}</td>
                  <td className="py-4 px-6 text-gray-700">{post.publishDate}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Content CMS - BiohackMe</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">BiohackMe</h1>
            <p className="text-sm text-gray-500">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Camilla</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900 capitalize">{activeSection}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection === 'posts' && renderPosts()}
            {activeSection === 'media' && (
              <div className="text-center py-12">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Media Library</h3>
                <p className="text-gray-500">Upload and manage your images, videos, and documents</p>
              </div>
            )}
            {activeSection === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-500">Track your content performance and audience insights</p>
              </div>
            )}
            {activeSection === 'users' && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-500">Manage user accounts and permissions</p>
              </div>
            )}
            {activeSection === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-500">Configure your site settings and preferences</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}