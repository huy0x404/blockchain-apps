import { useState } from 'react';
import Layout from '../components/shared/Layout';
import Card from '../components/cards/Card';
import StatsCard from '../components/cards/StatsCard';
import DataTable from '../components/tables/DataTable';
import { useActiveAirdrops, useUpcomingAirdrops } from '../hooks/useAirdropData';
import { FiGift, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { formatDate, formatUSD } from '../utils/formatters';

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

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🎁 Airdrop Finder</h1>
        <p className="text-gray-400">
          Tìm kiếm và theo dõi các airdrop tiềm năng từ nhiều blockchain
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Airdrops"
          value={activeAirdrops.length}
          icon={<FiGift />}
        />
        <StatsCard
          title="Upcoming"
          value={upcomingAirdrops.length}
          icon={<FiCalendar />}
        />
        <StatsCard
          title="Total Value"
          value="$125K"
          icon={<FiDollarSign />}
          prefix="$"
        />
        <StatsCard
          title="This Week"
          value={12}
          change={15.8}
          icon={<FiTrendingUp />}
        />
      </div>

      {/* Tabs */}
      <Card className="mb-8">
        <div className="flex space-x-4 border-b border-gray-700 -mt-2 mb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === 'active'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Active Airdrops ({activeAirdrops.length})
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

        <DataTable
          columns={airdropColumns}
          data={currentData}
          isLoading={isLoading}
        />
      </Card>

      {/* Featured Airdrop */}
      {currentData.length > 0 && (
        <Card title="Featured Airdrop" className="bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentData[0].projectName}
              </h3>
              <p className="text-gray-400 mb-4">{currentData[0].description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <span className="text-gray-400 w-32">Chain:</span>
                  <span className="text-white">{currentData[0].chain}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-400 w-32">Category:</span>
                  <span className="text-white">{currentData[0].category}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-400 w-32">Est. Value:</span>
                  <span className="text-white">{formatUSD(currentData[0].estimatedValue)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
              <ul className="space-y-2">
                {currentData[0].requirements?.map((req, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </Layout>
  );
}
