import { statePaths } from '@/svgData';
import { useMemo, useState } from 'react';

const StateMap = ({ data }) => {
    const [selectedState, setSelectedState] = useState(null);

    // Memoize color calculations
    const { getColor, maxValue } = useMemo(() => {
        const maxValue = Math.max(...Object.values(data));

        const getColor = (value) => {
            if (!value) return '#1F2937'; // Darker gray for no data

            const intensity = value / maxValue;
            // Using a more consistent color scale
            return `rgba(239, 68, 68, ${0.2 + (intensity * 0.8)})`; // Red with better scaling
        };

        return { getColor, maxValue };
    }, [data]);

    const handleMouseEnter = (state) => {
        setSelectedState(state);
    };

    const getStateInfo = () => {
        if (!selectedState) return null;
        const posts = data[selectedState] || 0;
        const percentage = ((posts / maxValue) * 100).toFixed(1);
        return {
            name: STATE_NAMES[selectedState] || selectedState,
            posts,
            percentage
        };
    };

    return (
        <div className="relative">
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                <div className="flex flex-col">
                    {/* Header with fixed height info panel */}
                    <div className="flex justify-between items-start mb-6 h-24">
                        <h2 className="text-xl font-bold text-white">State-wise Post Distribution</h2>

                        {/* Fixed height info panel */}
                        <div className="bg-gray-900/80 rounded-lg p-3 w-[250px] h-24 border border-gray-700">
                            {selectedState ? (
                                <div className="h-full flex flex-col justify-center">
                                    <p className="text-white font-medium truncate">{getStateInfo()?.name}</p>
                                    <div className="mt-1">
                                        <p className="text-gray-300 text-sm">
                                            Posts: {getStateInfo()?.posts.toLocaleString()}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Share: {getStateInfo()?.percentage}%
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center">
                                    <p className="text-gray-400 text-sm">Hover over a state to see details</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map Container with fixed height */}
                    <div className="h-[600px] relative">
                        <svg
                            viewBox="0 0 612 696"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {Object.entries(statePaths).map(([state, path]) => (
                                <path
                                    key={state}
                                    d={path}
                                    fill={getColor(data[state])}
                                    stroke={selectedState === state ? '#ffffff' : '#1F2937'}
                                    strokeWidth={selectedState === state ? '1.5' : '0.5'}
                                    onMouseEnter={() => handleMouseEnter(state)}
                                    onMouseLeave={() => setSelectedState(null)}
                                    className="transition-colors duration-200 hover:opacity-90 cursor-pointer"
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Legend with discrete steps */}
                    <div className="mt-6 px-4">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400 text-sm">0</span>
                                    <span className="text-gray-400 text-sm">{(maxValue * 0.25).toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm">{(maxValue * 0.5).toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm">{(maxValue * 0.75).toLocaleString()}</span>
                                    <span className="text-gray-400 text-sm">{maxValue.toLocaleString()}</span>
                                </div>
                                <div className="flex h-3">
                                    <div className="flex-1" style={{ backgroundColor: '#FEE2E2' }}></div>
                                    <div className="flex-1" style={{ backgroundColor: '#FECACA' }}></div>
                                    <div className="flex-1" style={{ backgroundColor: '#EF4444' }}></div>
                                    <div className="flex-1" style={{ backgroundColor: '#DC2626' }}></div>
                                    <div className="flex-1" style={{ backgroundColor: '#991B1B' }}></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-gray-500 text-xs">Lowest</span>
                                    <span className="text-gray-500 text-xs flex-1 text-center">Distribution</span>
                                    <span className="text-gray-500 text-xs">Highest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const STATE_NAMES = {
    'IN-AP': 'Andhra Pradesh',
    'IN-AR': 'Arunachal Pradesh',
    'IN-AS': 'Assam',
    'IN-BR': 'Bihar',
    'IN-CT': 'Chhattisgarh',
    'IN-GA': 'Goa',
    'IN-GJ': 'Gujarat',
    'IN-HR': 'Haryana',
    'IN-HP': 'Himachal Pradesh',
    'IN-JK': 'Jammu and Kashmir',
    'IN-JH': 'Jharkhand',
    'IN-KA': 'Karnataka',
    'IN-KL': 'Kerala',
    'IN-MP': 'Madhya Pradesh',
    'IN-MH': 'Maharashtra',
    'IN-MN': 'Manipur',
    'IN-ML': 'Meghalaya',
    'IN-MZ': 'Mizoram',
    'IN-NL': 'Nagaland',
    'IN-OR': 'Odisha',
    'IN-PB': 'Punjab',
    'IN-RJ': 'Rajasthan',
    'IN-SK': 'Sikkim',
    'IN-TN': 'Tamil Nadu',
    'IN-TG': 'Telangana',
    'IN-TR': 'Tripura',
    'IN-UP': 'Uttar Pradesh',
    'IN-UT': 'Uttarakhand',
    'IN-WB': 'West Bengal',
    'IN-AN': 'Andaman & Nicobar Islands',
    'IN-CH': 'Chandigarh',
    'IN-DN': 'Dadra & Nagar Haveli',
    'IN-DL': 'Delhi',
    'IN-LD': 'Lakshadweep',
    'IN-PY': 'Puducherry'
};

export default StateMap;