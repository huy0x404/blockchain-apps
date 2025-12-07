/**
 * Format số với dấu phẩy phân cách hàng nghìn
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format địa chỉ wallet (hiển thị rút gọn)
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format USD currency
 */
export const formatUSD = (amount) => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format currency (alias for formatUSD)
 */
export const formatCurrency = formatUSD;

/**
 * Format large numbers (K, M, B)
 */
export const formatCompactNumber = (num) => {
  if (!num) return '0';
  
  const absNum = Math.abs(num);
  
  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  } else if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  
  return num.toFixed(2);
};

/**
 * Format percentage
 */
export const formatPercent = (num) => {
  if (!num) return '0%';
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

/**
 * Get time ago string
 */
export const getTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

/**
 * Format time ago (alias for getTimeAgo)
 */
export const formatTimeAgo = getTimeAgo;

/**
 * Format date
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format datetime
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get color for percentage change
 */
export const getChangeColor = (value) => {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
};

/**
 * Get background color for percentage change
 */
export const getChangeBgColor = (value) => {
  if (value > 0) return 'bg-green-100 text-green-800';
  if (value < 0) return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

/**
 * Validate Ethereum address
 */
export const isValidEthAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Get chain explorer URL
 */
export const getExplorerUrl = (chain, type, value) => {
  const explorers = {
    ethereum: 'https://etherscan.io',
    bsc: 'https://bscscan.com',
    polygon: 'https://polygonscan.com',
    arbitrum: 'https://arbiscan.io',
    optimism: 'https://optimistic.etherscan.io',
  };

  const baseUrl = explorers[chain.toLowerCase()] || explorers.ethereum;
  
  if (type === 'tx') return `${baseUrl}/tx/${value}`;
  if (type === 'address') return `${baseUrl}/address/${value}`;
  if (type === 'token') return `${baseUrl}/token/${value}`;
  
  return baseUrl;
};
