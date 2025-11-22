import { useState } from 'react';
import Layout from '../components/shared/Layout';
import Card from '../components/cards/Card';
import StatsCard from '../components/cards/StatsCard';
import { useDefiData, useTopProtocols } from '../hooks/useDefiData';
import { FiTrendingUp, FiDollarSign, FiPieChart, FiLayers, FiSearch } from 'react-icons/fi';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

export default function DefiAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const { protocols, tvl, chains, isLoading, isError } = useDefiData();
  const { protocols: topProtocols } = useTopProtocols(20);

  // Filter protocols based on search
  const filteredProtocols = searchQuery
    ? topProtocols.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topProtocols;

  if (isError) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-400">Error loading DeFi data</p>
        </div>
      </Layout>
    );
  }

  const totalProtocols = protocols.length;
  const avgChange24h = protocols.length > 0
    ? protocols.reduce((sum, p) => sum + (p.change_1d || 0), 0) / protocols.length
    : 0;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">📊 DeFi Analytics</h1>
        <p className="text-gray-400">Market data and protocol analytics powered by CoinMarketCap</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Market Cap"
          value={formatCurrency(tvl)}
          icon={<FiDollarSign />}
          trend={avgChange24h > 0 ? 'up' : 'down'}
          trendValue={formatPercent(avgChange24h)}
          loading={isLoading}
        />
        
        <StatsCard
          title="Protocols"
          value={formatNumber(totalProtocols)}
          icon={<FiPieChart />}
          loading={isLoading}
        />
        
        <StatsCard
          title="24h Avg Change"
          value={formatPercent(avgChange24h)}
          icon={<FiTrendingUp />}
          trend={avgChange24h > 0 ? 'up' : 'down'}
          loading={isLoading}
        />
        
        <StatsCard
          title="Chains"
          value={formatNumber(chains.length)}
          icon={<FiLayers />}
          loading={isLoading}
        />
      </div>

      {/* Search */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search protocols by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Top Protocols Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {searchQuery ? 'Search Results' : 'Top Protocols by Market Cap'}
        </h2>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProtocols.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No protocols found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">#</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Protocol</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Symbol</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-medium">Market Cap</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-medium">24h</th>
                  <th className="text-right py-4 px-4 text-gray-400 font-medium">7d</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredProtocols.map((protocol, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-400">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {protocol.logo && (
                          <img 
                            src={protocol.logo} 
                            alt={protocol.name}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        )}
                        <span className="text-white font-medium">{protocol.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-gray-700 rounded text-gray-300 text-sm font-mono">
                        {protocol.symbol}
                      </span>
                    </td>
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
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                        {protocol.category || 'DeFi'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Top Gainers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-green-400">↑</span> Top Gainers 24h
          </h3>
          <div className="space-y-3">
            {protocols
              .filter(p => p.change_1d > 0)
              .sort((a, b) => b.change_1d - a.change_1d)
              .slice(0, 5)
              .map((protocol, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium">{idx + 1}</span>
                    <div>
                      <div className="text-white font-medium">{protocol.name}</div>
                      <div className="text-gray-400 text-sm">{protocol.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-mono font-bold">
                      +{formatPercent(protocol.change_1d)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatCurrency(protocol.tvl)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-400">↓</span> Top Losers 24h
          </h3>
          <div className="space-y-3">
            {protocols
              .filter(p => p.change_1d < 0)
              .sort((a, b) => a.change_1d - b.change_1d)
              .slice(0, 5)
              .map((protocol, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-medium">{idx + 1}</span>
                    <div>
                      <div className="text-white font-medium">{protocol.name}</div>
                      <div className="text-gray-400 text-sm">{protocol.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-mono font-bold">
                      {formatPercent(protocol.change_1d)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatCurrency(protocol.tvl)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
