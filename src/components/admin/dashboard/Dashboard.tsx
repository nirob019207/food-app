/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDailyCountQuery, useRevenueQuery } from '@/redux/api/orderApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { data: revenueData, error: revenueError, isLoading: revenueLoading } = useRevenueQuery({});
  const { data: dailyCountData, error: dailyCountError, isLoading: dailyCountLoading } = useDailyCountQuery({});

  // Prepare data for the bar chart
  const chartData = {
    labels: dailyCountData?.data.dailyServiceCounts.map((item: any) => item.date) || [],
    datasets: [
      {
        label: 'Daily Order Count',
        data: dailyCountData?.data.dailyServiceCounts.map((item: any) => item.count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Daily Order Counts for ${dailyCountData?.data.month}/${dailyCountData?.data.year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Orders',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Dashboard</h1>

      {/* Loading State */}
      {(revenueLoading || dailyCountLoading) && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      )}

      {/* Error State */}
      {(revenueError || dailyCountError) && (
        <div className="text-center py-4 text-red-500">
          Error loading dashboard data. Please try again later.
        </div>
      )}

      {/* Dashboard Content */}
      {!revenueLoading && !dailyCountLoading && !revenueError && !dailyCountError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Total Revenue for {revenueData?.data.month}/{revenueData?.data.year}
            </h2>
            <p className="text-3xl font-bold text-green-600">
              ৳ {revenueData?.data.totalRevenue.toFixed(2)}
            </p>
            <p className="text-gray-500 mt-2">Based on all orders for the month</p>
          </div>

          {/* Daily Order Count Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Order Counts</h2>
            <div className="h-96">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}