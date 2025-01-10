'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { BarChart2, TrendingUp, Users, AlertCircle } from 'lucide-react';
import PieChartComponent from '@/components/dashboard/Charts';
import GenderDistribution from '@/components/dashboard/GenderDistribution';
import StateMap from '@/components/dashboard/StateMap';
import AccordionComponent from '@/components/dashboard/AccordionComponent';

// Constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'];
const POST_TYPES = ['carousel', 'static', 'reel'];

// State codes mapping
const STATE_CODES = {
  'Andhra Pradesh': 'AP',
  'Arunachal Pradesh': 'AR',
  'Assam': 'AS',
  'Bihar': 'BR',
  'Chhattisgarh': 'CT',
  'Goa': 'GA',
  'Gujarat': 'GJ',
  'Haryana': 'HR',
  'Himachal Pradesh': 'HP',
  'Jammu and Kashmir': 'JK',
  'Jharkhand': 'JH',
  'Karnataka': 'KA',
  'Kerala': 'KL',
  'Madhya Pradesh': 'MP',
  'Maharashtra': 'MH',
  'Manipur': 'MN',
  'Meghalaya': 'ML',
  'Mizoram': 'MZ',
  'Nagaland': 'NL',
  'Odisha': 'OR',
  'Punjab': 'PB',
  'Rajasthan': 'RJ',
  'Sikkim': 'SK',
  'Tamil Nadu': 'TN',
  'Telangana': 'TG',
  'Uttar Pradesh': 'UP',
  'Uttarakhand': 'UT',
  'West Bengal': 'WB',
  'Andaman & Nicobar Islands': 'AN',
  'Chandigarh': 'CH',
  'Dadra & Nagar Haveli and Daman & Diu': 'DN',
  'Delhi': 'DL',
  'Lakshwadeep': 'LD',
  'Pusucherry': 'PU',
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // Fetch data
        const response = await fetch('data.json');
        const posts = await response.json();

        // Process metrics
        const metrics = processMetrics(posts);

        // Process state data
        const statePostCounts = processStateData(posts);

        setData({
          posts,
          metrics,
          statePostCounts
        });
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  // Memoized data processing functions
  const processMetrics = useMemo(() => (posts) => {
    const totalPosts = posts.length;

    // Using reduce once to calculate multiple metrics
    const { totalLikes, totalComments } = posts.reduce((acc, post) => ({
      totalLikes: acc.totalLikes + (post.likes || 0),
      totalComments: acc.totalComments + (post.comments || 0)
    }), { totalLikes: 0, totalComments: 0 });

    const averageEngagement = ((totalLikes + totalComments) / totalPosts / 100).toFixed(1);

    // Get unique users
    const uniqueUsers = new Set(posts.map(post => post.gender)).size;

    return {
      totalPosts,
      totalLikes,
      averageEngagement,
      activeUsers: uniqueUsers
    };
  }, []);

  const processStateData = useMemo(() => (posts) => {
    const statePostCounts = {};

    // Process in chunks for better performance
    const chunkSize = 1000;
    for (let i = 0; i < posts.length; i += chunkSize) {
      const chunk = posts.slice(i, i + chunkSize);
      chunk.forEach(post => {
        const stateCode = `IN-${STATE_CODES[post.state] || post.state.substring(0, 2).toUpperCase()}`;
        statePostCounts[stateCode] = (statePostCounts[stateCode] || 0) + 1;
      });
    }

    return statePostCounts;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Total Posts"
            value={data.metrics.totalPosts.toLocaleString()}
            icon={BarChart2}
            trend="8.2"
          />
          <MetricCard
            title="Active Users"
            value={data.metrics.activeUsers.toLocaleString()}
            icon={Users}
            trend="12.5"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${data.metrics.averageEngagement}%`}
            icon={TrendingUp}
            trend="5.7"
          />
          <MetricCard
            title="Alert Status"
            value="Normal"
            icon={AlertCircle}
          />
        </div>

        {/* Charts */}
        <PieChartComponent posts={data.posts} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StateMap data={data.statePostCounts} />
          </div>
          <div className="lg:col-span-1">
            <GenderDistribution posts={data.posts} />
          </div>
        </div>
        <AccordionComponent />
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = React.memo(({ title, value, icon: Icon, trend }) => (
  <div className="p-4 sm:p-6 bg-gray-800 rounded-xl border border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-gray-700/50 rounded-lg">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-3 sm:mt-4">
        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500 mr-1" />
        <span className="text-xs sm:text-sm text-teal-500">{trend}% increase</span>
      </div>
    )}
  </div>
));

export default Dashboard;