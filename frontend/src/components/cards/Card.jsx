export default function Card({ title, subtitle, children, className = '', action }) {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
