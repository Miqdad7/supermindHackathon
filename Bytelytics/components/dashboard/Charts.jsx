import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, X, Check } from 'lucide-react';

const COLORS = [
  { fill: '#0088FE', glow: '#0088FE33' },
  { fill: '#00C49F', glow: '#00C49F33' },
  { fill: '#FFBB28', glow: '#FFBB2833' },
  { fill: '#FF8042', glow: '#FF804233' },
  { fill: '#FF6699', glow: '#FF669933' }
];
const POST_TYPES = ['carousel', 'static', 'reel'];

// Optimized window size hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounced resize handler
    let timeoutId;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedHandleResize);
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return windowSize;
};

const PieChartComponent = React.memo(({ posts }) => {
  const [selectedType, setSelectedType] = useState(POST_TYPES);
  const windowSize = useWindowSize();

  // Memoized data processing
  const getClusteredData = useMemo(() => (metric) => {
    // Pre-filter posts by selected types for better performance
    const filteredPosts = posts.filter(post => 
      selectedType.includes(post.post_type.toLowerCase())
    );

    // Process in chunks
    const chunkSize = 1000;
    const typeValues = {};
    
    for (let i = 0; i < filteredPosts.length; i += chunkSize) {
      const chunk = filteredPosts.slice(i, i + chunkSize);
      chunk.forEach(post => {
        const type = post.post_type.toLowerCase();
        typeValues[type] = (typeValues[type] || 0) + (post[metric] || 0);
      });
    }

    // Convert to chart data format
    const chartData = Object.entries(typeValues)
      .filter(([, value]) => value > 0)
      .map(([type, value]) => ({
        name: type.charAt(0).toUpperCase() + type.slice(1),
        value
      }));

    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    
    return chartData.map(data => ({
      ...data,
      total,
    }));
  }, [posts, selectedType]);

  const renderPercentageLabel = (entry) => {
    if (!windowSize.width || windowSize.width < 768) return null;
    const percentage = ((entry.value / entry.total) * 100).toFixed(1);
    return `${percentage}%`;
  };

  // Memoize the metrics data
  const metricsData = useMemo(() => 
    ['likes', 'comments', 'shares', 'reach', 'impressions'].map(metric => ({
      metric,
      data: getClusteredData(metric)
    })), [getClusteredData]);

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700 mb-6 sm:mb-10">
      <div className="mb-6">
        <h2 className="text-gray-300 text-lg font-bold mb-4">Analytics Overview</h2>
        <PostTypeFilter
          selectedTypes={selectedType}
          onChange={setSelectedType}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {metricsData.map(({ metric, data }) => (
          <div key={metric} className="flex flex-col min-w-60 md:min-w-80 items-center bg-gray-900/50 rounded-lg p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </h3>
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={windowSize.width < 768 ? 40 : 50}
                    outerRadius={windowSize.width < 768 ? 60 : 70}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderPercentageLabel}
                    animationEasing="ease"
                  >
                    {data.map((entry, index) => {
                      const color = COLORS[index % COLORS.length];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={typeof color === 'string' ? color : color.fill}
                          filter={typeof color === 'string' ? undefined : `url(#glow-${index})`}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      value.toLocaleString(),
                      name
                    ]}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      fontSize: windowSize.width < 768 ? '8px' : '10px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Filter components remain the same
const FilterChip = ({ label, onRemove }) => (
  <div className="inline-flex items-center bg-teal-900/50 text-teal-400 rounded-full px-3 py-1 text-sm">
    <span>{label}</span>
    <button
      onClick={onRemove}
      className="ml-2 hover:text-teal-200 focus:outline-none"
      aria-label={`Remove ${label} filter`}
    >
      <X className="w-3 h-3" />
    </button>
  </div>
);

const PostTypeFilter = ({ selectedTypes, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAll = () => {
    onChange(POST_TYPES);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    onChange([]);
    setIsOpen(false);
  };

  const handleToggleType = (type) => {
    onChange(
      selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes, type]
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.filter-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative filter-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span>Filter Posts</span>
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
              <div className="p-2">
                <div className="flex justify-between mb-2 px-2 py-1">
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-teal-400 hover:text-teal-300"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-gray-400 hover:text-gray-300"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {POST_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleToggleType(type)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-800 rounded-md text-gray-300 transition-colors"
                    >
                      <div className={`w-4 h-4 mr-3 rounded border flex items-center justify-center
                        ${selectedTypes.includes(type)
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-gray-600'}`}
                      >
                        {selectedTypes.includes(type) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <FilterChip
              key={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              onRemove={() => handleToggleType(type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;