import { formatUSD, formatCompactNumber, getChangeColor, formatPercent } from '../../utils/formatters';

export default function StatsCard({ title, value, change, icon, prefix = '', suffix = '' }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">
            {prefix}{typeof value === 'number' ? formatCompactNumber(value) : value}{suffix}
          </p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${getChangeColor(change)}`}>
              {formatPercent(change)}
            </p>
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
