import { useState } from 'react';
import Layout from '../components/shared/Layout';
import Card from '../components/cards/Card';
import StatsCard from '../components/cards/StatsCard';
import DataTable from '../components/tables/DataTable';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { useWhaleData, useRecentWhaleTransactions } from '../hooks/useWhaleData';
import { FiActivity, FiDollarSign, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { formatAddress, formatNumber, formatUSD, getTimeAgo, getExplorerUrl } from '../utils/formatters';

export default function WhaleTracker() {
  const [searchAddress, setSearchAddress] = useState('');
  const { whales, isLoading: whalesLoading } = useWhaleData({ limit: 20 });
  const { transactions, isLoading: txLoading } = useRecentWhaleTransactions(10);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAddress) {
      // Navigate to wallet detail page
      window.location.href = `/whale-tracker/${searchAddress}`;
    }
  };

  const whaleColumns = [
    {
      header: '#',
      accessor: 'index',
      render: (row, idx) => idx + 1,
    },
    {
      header: 'Address',
      accessor: 'address',
      render: (row) => (
        <a
          href={getExplorerUrl('ethereum', 'address', row.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {formatAddress(row.address)}
        </a>
      ),
    },
    {
      header: 'Balance',
      accessor: 'balance',
      render: (row) => `${formatNumber(row.balance?.toFixed(2))} ETH`,
    },
    {
      header: 'Total Transactions',
      accessor: 'totalTransactions',
      render: (row) => formatNumber(row.totalTransactions),
    },
    {
      header: 'Total Volume',
      accessor: 'totalVolume',
      render: (row) => `${formatNumber(row.totalVolume?.toFixed(2))} ETH`,
    },
    {
      header: 'Last Active',
      accessor: 'lastActive',
      render: (row) => getTimeAgo(row.lastActive),
    },
  ];

  const txColumns = [
    {
      header: 'From',
      accessor: 'from',
      render: (row) => (
        <a
          href={getExplorerUrl('ethereum', 'address', row.from)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {formatAddress(row.from)}
        </a>
      ),
    },
    {
      header: 'To',
      accessor: 'to',
      render: (row) => (
        <a
          href={getExplorerUrl('ethereum', 'address', row.to)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {formatAddress(row.to)}
        </a>
      ),
    },
    {
      header: 'Value',
      accessor: 'valueETH',
      render: (row) => `${formatNumber(row.valueETH?.toFixed(4))} ETH`,
    },
    {
      header: 'Time',
      accessor: 'timeStamp',
      render: (row) => getTimeAgo(row.timeStamp * 1000),
    },
    {
      header: 'Hash',
      accessor: 'hash',
      render: (row) => (
        <a
          href={getExplorerUrl('ethereum', 'tx', row.hash)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {formatAddress(row.hash)}
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🐋 Whale Tracker</h1>
        <p className="text-gray-400">
          Theo dõi các ví lớn (whales) và nhận cảnh báo khi có giao dịch lớn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Whales"
          value={whales.length}
          icon={<FiUsers />}
        />
        <StatsCard
          title="Active Today"
          value={Math.floor(whales.length * 0.6)}
          change={12.5}
          icon={<FiActivity />}
        />
        <StatsCard
          title="Total Volume"
          value="$2.4M"
          change={8.3}
          icon={<FiDollarSign />}
          prefix="$"
        />
        <StatsCard
          title="Avg Transaction"
          value="$45.2K"
          change={-3.2}
          icon={<FiTrendingUp />}
          prefix="$"
        />
      </div>

      {/* Search */}
      <Card title="Track Wallet" className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Enter wallet address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Track
          </button>
        </form>
      </Card>

      {/* Top Whales */}
      <Card title="Top Whale Wallets" subtitle="Ranked by total volume" className="mb-8">
        <DataTable
          columns={whaleColumns}
          data={whales}
          isLoading={whalesLoading}
        />
      </Card>

      {/* Recent Transactions */}
      <Card title="Recent Whale Transactions" subtitle="Last 10 large transactions">
        <DataTable
          columns={txColumns}
          data={transactions}
          isLoading={txLoading}
        />
      </Card>
    </Layout>
  );
}
