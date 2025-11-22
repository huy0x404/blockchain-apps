export default function StatsCard({ 
  title, 
  value, 
  icon, 
  trend,
  trendValue,
  loading = false,
  prefix = '', 
  suffix = '' 
}) {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">
            {prefix}{value}{suffix}
          </p>
          {trendValue && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {trend === 'up' && '↑ '}
                {trend === 'down' && '↓ '}
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-2xl">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
