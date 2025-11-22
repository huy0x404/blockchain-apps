import { useState } from 'react';
import Layout from '../components/shared/Layout';
import Card from '../components/cards/Card';
import StatsCard from '../components/cards/StatsCard';
import { useActiveAirdrops, useUpcomingAirdrops } from '../hooks/useAirdropData';
import { FiGift, FiCalendar, FiDollarSign, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatters';

export default function AirdropFinder() {
  const [activeTab, setActiveTab] = useState('active');
  const { airdrops: activeAirdrops, isLoading: activeLoading } = useActiveAirdrops();
  const { airdrops: upcomingAirdrops, isLoading: upcomingLoading } = useUpcomingAirdrops();

  const airdropColumns = [
    {
      header: 'Project',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-semibold text-white">{row.projectName}</div>
          <div className="text-sm text-gray-400">{row.chain}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => (
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Estimated Value',
      accessor: 'estimatedValue',
      render: (row) => formatUSD(row.estimatedValue),
    },
    {
      header: 'Difficulty',
      accessor: 'difficulty',
      render: (row) => {
        const colors = {
          Easy: 'bg-green-500/20 text-green-400',
          Medium: 'bg-yellow-500/20 text-yellow-400',
          Hard: 'bg-red-500/20 text-red-400',
        };
        return (
          <span className={`px-2 py-1 rounded text-sm ${colors[row.difficulty]}`}>
            {row.difficulty}
          </span>
        );
      },
    },
    {
      header: 'Deadline',
      accessor: 'endDate',
      render: (row) => (
        <div className="text-sm">
          {row.endDate ? formatDate(row.endDate) : 'TBA'}
        </div>
      ),
    },
    {
      header: 'Action',
      render: (row) => (
        <a
          href={row.website}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        >
          Details
        </a>
      ),
    },
  ];

  const currentData = activeTab === 'active' ? activeAirdrops : upcomingAirdrops;
  const isLoading = activeTab === 'active' ? activeLoading : upcomingLoading;

  const totalEstValue = currentData.reduce((sum, a) => sum + (a.estimatedValue || 0), 0);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎁 Airdrop Finder</h1>
        <p className="text-gray-400">
          Tìm kiếm và theo dõi các airdrop tiềm năng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Airdrops"
          value={activeAirdrops.length}
          icon={<FiGift />}
          loading={activeLoading}
        />
        <StatsCard
          title="Upcoming"
          value={upcomingAirdrops.length}
          icon={<FiCalendar />}
          loading={upcomingLoading}
        />
        <StatsCard
          title="Total Est. Value"
          value={formatCurrency(totalEstValue)}
          icon={<FiDollarSign />}
          loading={isLoading}
        />
        <StatsCard
          title="Total Available"
          value={activeAirdrops.length + upcomingAirdrops.length}
          icon={<FiTrendingUp />}
          loading={isLoading}
        />
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
        <div className="flex space-x-4 border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === 'active'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Active ({activeAirdrops.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === 'upcoming'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Upcoming ({upcomingAirdrops.length})
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : currentData.length === 0 ? (
          <div className="text-center py-12">
            <FiGift className="text-5xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No {activeTab} airdrops at the moment</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((airdrop, idx) => (
              <div 
                key={idx}
                className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors border border-gray-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {airdrop.projectName || airdrop.name || 'Unknown Project'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {airdrop.chain || 'Multi-chain'}
                    </p>
                  </div>
                  {airdrop.status && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                      {airdrop.status}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {airdrop.description || 'No description available'}
                </p>

                <div className="space-y-2 mb-4">
                  {airdrop.estimatedValue && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Est. Value:</span>
                      <span className="text-white font-mono">
                        {formatCurrency(airdrop.estimatedValue)}
                      </span>
                    </div>
                  )}
                  {airdrop.category && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Category:</span>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {airdrop.category}
                      </span>
                    </div>
                  )}
                  {airdrop.difficulty && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        airdrop.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        airdrop.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {airdrop.difficulty}
                      </span>
                    </div>
                  )}
                </div>

                {airdrop.website && (
                  <a
                    href={airdrop.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    View Details
                    <FiExternalLink className="text-xs" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <FiGift className="text-3xl text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">About Airdrops</h3>
            <p className="text-gray-300 text-sm mb-2">
              Airdrops là cách các dự án blockchain phân phối token miễn phí cho cộng đồng. 
              Theo dõi danh sách để không bỏ lỡ cơ hội nhận token từ các dự án tiềm năng.
            </p>
            <p className="text-gray-400 text-sm">
              💡 Lưu ý: Luôn kiểm tra kỹ thông tin dự án trước khi tham gia. Không chia sẻ private key.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
