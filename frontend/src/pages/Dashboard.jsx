import { useState } from 'react';
import Layout from '../components/shared/Layout';
import StatsCard from '../components/cards/StatsCard';
import { useDefiData, useTopProtocols } from '../hooks/useDefiData';
import { FiDollarSign, FiTrendingUp, FiActivity, FiPieChart } from 'react-icons/fi';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

export default function Dashboard() {
  const { protocols, tvl, chains, isLoading, isError } = useDefiData();
  const { protocols: topProtocols } = useTopProtocols(10);

  if (isError) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-400">Error loading dashboard data</p>
        </div>
      </Layout>
    );
  }

  // Calculate stats
  const totalMarketCap = tvl || 0;
  const protocolCount = protocols.length || 0;
  const avgChange24h = protocols.length > 0 
    ? protocols.reduce((sum, p) => sum + (p.change_1d || 0), 0) / protocols.length 
    : 0;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Market Overview</h1>
        <p className="text-gray-400">Real-time cryptocurrency market data</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Market Cap"
          value={formatCurrency(totalMarketCap)}
          icon={<FiDollarSign />}
          trend={avgChange24h > 0 ? 'up' : 'down'}
          trendValue={formatPercent(avgChange24h)}
          loading={isLoading}
        />
        
        <StatsCard
          title="Protocols Tracked"
          value={formatNumber(protocolCount)}
          icon={<FiPieChart />}
          loading={isLoading}
        />
        
        <StatsCard
          title="24h Average Change"
          value={formatPercent(avgChange24h)}
          icon={<FiTrendingUp />}
          trend={avgChange24h > 0 ? 'up' : 'down'}
          loading={isLoading}
        />
        
        <StatsCard
          title="Active Chains"
          value={formatNumber(chains.length)}
          icon={<FiActivity />}
          loading={isLoading}
        />
      </div>

      {/* Top Protocols */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Top Protocols by Market Cap</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">#</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Symbol</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Market Cap</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">7d Change</th>
                </tr>
              </thead>
              <tbody>
                {topProtocols.map((protocol, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-4 px-4 text-gray-400">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {protocol.logo && (
                          <img src={protocol.logo} alt={protocol.name} className="w-6 h-6 rounded-full mr-2" />
                        )}
                        <span className="text-white font-medium">{protocol.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{protocol.symbol}</td>
                    <td className="py-4 px-4 text-right text-white font-mono">
                      {formatCurrency(protocol.tvl)}
                    </td>
                    <td className={`py-4 px-4 text-right font-mono ${
                      protocol.change_1d >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {protocol.change_1d >= 0 ? '+' : ''}{formatPercent(protocol.change_1d)}
                    </td>
                    <td className={`py-4 px-4 text-right font-mono ${
                      protocol.change_7d >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {protocol.change_7d >= 0 ? '+' : ''}{formatPercent(protocol.change_7d)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Chain Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Movers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Top Gainers 24h</h3>
          <div className="space-y-3">
            {protocols
              .filter(p => p.change_1d > 0)
              .sort((a, b) => b.change_1d - a.change_1d)
              .slice(0, 5)
              .map((protocol, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">{idx + 1}</span>
                    <span className="text-white font-medium">{protocol.symbol}</span>
                  </div>
                  <span className="text-green-400 font-mono">+{formatPercent(protocol.change_1d)}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Top Losers 24h</h3>
          <div className="space-y-3">
            {protocols
              .filter(p => p.change_1d < 0)
              .sort((a, b) => a.change_1d - b.change_1d)
              .slice(0, 5)
              .map((protocol, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 px-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3">{idx + 1}</span>
                    <span className="text-white font-medium">{protocol.symbol}</span>
                  </div>
                  <span className="text-red-400 font-mono">{formatPercent(protocol.change_1d)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
