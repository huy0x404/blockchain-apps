import Layout from '../components/shared/Layout';
import Link from 'next/link';
import { FiActivity, FiGift, FiBarChart2, FiCpu, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const products = [
    {
      title: 'Whale Tracker',
      description: 'Theo dõi ví "cá mập" và nhận cảnh báo khi có giao dịch lớn',
      icon: <FiActivity className="text-4xl" />,
      href: '/whale-tracker',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Real-time tracking', 'Telegram alerts', 'Wallet analytics'],
    },
    {
      title: 'Airdrop Finder',
      description: 'Quét các chain và dự án đang có airdrop tiềm năng',
      icon: <FiGift className="text-4xl" />,
      href: '/airdrop-finder',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Multi-chain support', 'Twitter integration', 'Claim tracking'],
    },
    {
      title: 'DeFi Analytics',
      description: 'Phân tích dữ liệu DeFi: TVL, volume, yield pools',
      icon: <FiBarChart2 className="text-4xl" />,
      href: '/defi-analytics',
      gradient: 'from-green-500 to-emerald-500',
      features: ['Protocol comparison', 'Yield farming', 'TVL tracking'],
    },
    {
      title: 'AI Analyzer',
      description: 'Dùng AI phân tích on-chain và dự đoán hành vi ví',
      icon: <FiCpu className="text-4xl" />,
      href: '/ai-analyzer',
      gradient: 'from-orange-500 to-red-500',
      features: ['AI insights', 'Behavior prediction', 'Risk assessment'],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Blockchain Analytics
          <span className="block mt-2 gradient-text">Suite</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Công cụ phân tích blockchain toàn diện với AI, theo dõi whale, 
          tìm kiếm airdrop, và phân tích DeFi
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {products.map((product, idx) => (
          <Link key={idx} href={product.href}>
            <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 card-hover cursor-pointer">
              <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-lg flex items-center justify-center text-white mb-6`}>
                {product.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
              <p className="text-gray-400 mb-6">{product.description}</p>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="mr-2">Explore</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-gray-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Real-time Data', desc: 'Live blockchain data updates' },
            { title: 'AI-Powered', desc: 'Smart analytics with AI insights' },
            { title: 'Multi-chain', desc: 'Support for multiple blockchains' },
            { title: 'Telegram Bot', desc: 'Instant alerts via Telegram' },
            { title: 'Open Source', desc: 'Fully open source codebase' },
            { title: 'Easy to Deploy', desc: 'Simple deployment process' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-lg p-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
