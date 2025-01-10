import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const GENDER_COLORS = [
    { fill: '#4ECDC4', name: 'Male' },     // Blue for Male
    { fill: '#FF69B4', name: 'Female' },    // Pink for Female
    { fill: '#F5F5F5', name: 'Other' },    // White for Other
];

const GenderDistribution = ({ posts }) => {
    const data = useMemo(() => {
        // Count genders
        const genderCounts = posts.reduce((acc, post) => {
            const gender = post.gender || 'Other';
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {});

        // Create ordered data array to match the desired order: Other, Male, Female
        const orderedData = [
            { name: 'Male', value: genderCounts['Male'] || 0 },
            { name: 'Female', value: genderCounts['Female'] || 0 },
            { name: 'Other', value: genderCounts['Other'] || 0 },
        ];

        // Calculate total for percentages
        const total = orderedData.reduce((sum, item) => sum + item.value, 0);

        // Add percentage to each item
        return orderedData.map(item => ({
            ...item,
            percentage: ((item.value / total) * 100).toFixed(1)
        }));
    }, [posts]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 2.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-medium"
            >
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-auto pb-20">
            <h2 className="text-xl font-bold text-white mb-6">Gender Distribution</h2>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <defs>
                            {GENDER_COLORS.map((color, index) => (
                                <filter key={`glow-${index}`} id={`glow-${index}`}>
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            ))}
                        </defs>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={renderCustomizedLabel}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={GENDER_COLORS[index].fill}
                                    filter={`url(#glow-${index})`}
                                />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            content={({ payload }) => (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex justify-center gap-6">
                                        {GENDER_COLORS.map((color, index) => (
                                            <div key={`legend-${index}`} className="flex items-center">
                                                <div
                                                    className="w-2 h-2 rounded-full mr-2"
                                                    style={{ backgroundColor: color.fill }}
                                                />
                                                <span className="text-gray-300 text-sm">{color.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between w-full max-w-xs px-4">
                                        {data.map((item, index) => (
                                            <div
                                                key={`value-${index}`}
                                                className="flex flex-col items-center"
                                                style={{ color: GENDER_COLORS[index].fill }}
                                            >
                                                <span className="text-2xl font-bold">
                                                    {item.value}
                                                </span>
                                                <span className="text-sm text-gray-400">
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GenderDistribution;