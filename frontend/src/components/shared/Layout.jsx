import Link from 'next/link';
import { FiHome, FiActivity, FiGift, FiBarChart2, FiCpu } from 'react-icons/fi';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-white font-bold text-xl">Blockchain Apps</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <NavLink href="/" icon={<FiHome />}>Home</NavLink>
              <NavLink href="/whale-tracker" icon={<FiActivity />}>Whale Tracker</NavLink>
              <NavLink href="/airdrop-finder" icon={<FiGift />}>Airdrop Finder</NavLink>
              <NavLink href="/defi-analytics" icon={<FiBarChart2 />}>DeFi Analytics</NavLink>
              <NavLink href="/ai-analyzer" icon={<FiCpu />}>AI Analyzer</NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 Blockchain Apps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, icon, children }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
