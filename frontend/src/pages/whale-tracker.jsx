import { useState } from 'react';
import Layout from '../components/shared/Layout';
import Card from '../components/cards/Card';
import StatsCard from '../components/cards/StatsCard';
import DataTable from '../components/tables/DataTable';
import { useWhaleData, useRecentWhaleTransactions } from '../hooks/useWhaleData';
import { FiActivity, FiDollarSign, FiUsers, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import { formatAddress, formatNumber, formatEth, formatTimeAgo } from '../utils/formatters';

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
      render: (row, idx) => <span className="text-gray-400">{idx + 1}</span>,
    },
    {
      header: 'Address',
      accessor: 'address',
      render: (row) => (
        <a
          href={`https://etherscan.io/address/${row.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          {formatAddress(row.address)}
          <FiExternalLink className="text-xs" />
        </a>
      ),
    },
    {
      header: 'Balance',
      accessor: 'balance',
      render: (row) => <span className="font-mono text-white">{row.balance?.toFixed(2)} ETH</span>,
    },
    {
      header: 'Transactions',
      accessor: 'totalTransactions',
      render: (row) => <span className="text-gray-300">{formatNumber(row.totalTransactions)}</span>,
    },
    {
      header: 'Total Volume',
      accessor: 'totalVolume',
      render: (row) => <span className="font-mono text-green-400">{row.totalVolume?.toFixed(2)} ETH</span>,
    },
  ];

  const txColumns = [
    {
      header: 'From',
      accessor: 'from',
      render: (row) => (
        <a
          href={`https://etherscan.io/address/${row.from || row.whaleAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          {formatAddress(row.from || row.whaleAddress)}
          <FiExternalLink className="text-xs" />
        </a>
      ),
    },
    {
      header: 'To',
      accessor: 'to',
      render: (row) => (
        <a
          href={`https://etherscan.io/address/${row.to}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          {formatAddress(row.to)}
          <FiExternalLink className="text-xs" />
        </a>
      ),
    },
    {
      header: 'Value',
      accessor: 'valueETH',
      render: (row) => (
        <span className="font-mono text-green-400">
          {(row.valueETH || row.value / 1e18)?.toFixed(4)} ETH
        </span>
      ),
    },
    {
      header: 'Time',
      accessor: 'timeStamp',
      render: (row) => (
        <span className="text-gray-400">
          {formatTimeAgo(row.timeStamp)}
        </span>
      ),
    },
    {
      header: 'Tx Hash',
      accessor: 'hash',
      render: (row) => (
        <a
          href={`https://etherscan.io/tx/${row.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          {formatAddress(row.hash)}
          <FiExternalLink className="text-xs" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Whales"
          value={formatNumber(whales.length)}
          icon={<FiUsers />}
          loading={whalesLoading}
        />
        <StatsCard
          title="Recent Transactions"
          value={formatNumber(transactions.length)}
          icon={<FiActivity />}
          loading={txLoading}
        />
        <StatsCard
          title="Avg Balance"
          value={whales.length > 0 
            ? `${(whales.reduce((sum, w) => sum + (w.balance || 0), 0) / whales.length).toFixed(2)} ETH`
            : '0 ETH'
          }
          icon={<FiDollarSign />}
          loading={whalesLoading}
        />
        <StatsCard
          title="Total Volume"
          value={whales.length > 0
            ? `${whales.reduce((sum, w) => sum + (w.totalVolume || 0), 0).toFixed(2)} ETH`
            : '0 ETH'
          }
          icon={<FiTrendingUp />}
          loading={whalesLoading}
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
