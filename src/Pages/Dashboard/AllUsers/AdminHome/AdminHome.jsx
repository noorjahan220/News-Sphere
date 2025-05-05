import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { FiTrendingUp, FiBarChart2, FiPieChart, FiCalendar, FiDatabase, FiUsers, FiAward, FiActivity } from 'react-icons/fi';


const AdminHome = () => {

  const [publisherData, setPublisherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishers: 0,
    premiumArticles: 0,
    growthRate: 0,
    topPublisher: '',
    trendingPublisher: '',
    recentActivity: []
  });

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        let chartData = [["Publisher", "Articles", { role: 'style' }]];
        let premiumCount = 0;
        let activityLog = [];
        
        try {
          const { data } = await axios.get("http://localhost:3000/news");
          
          // Process publisher data
          const groupedData = data.reduce((acc, article) => {
            if (article.publisher) {
              acc[article.publisher] = (acc[article.publisher] || 0) + 1;
              if (article.isPremium) premiumCount++;
            }
            if (article.createdAt) {
              activityLog.push({
                title: article.title,
                date: new Date(article.createdAt),
                publisher: article.publisher
              });
            }
            return acc;
          }, {});
          
          // Sort publishers by article count and add color
          const sortedPublishers = Object.entries(groupedData)
            .sort((a, b) => b[1] - a[1])
            .map(([publisher, count], index) => {
              const color = getColorForIndex(index);
              return [publisher, count, color];
            });

          chartData = [...chartData, ...sortedPublishers];
          
          // Sort activity by date
          activityLog.sort((a, b) => b.date - a.date);
          
          // Calculate growth (mock calculation for demo)
          const growthRate = calculateGrowthRate(data.length);
          
          setStats({
            totalArticles: data.length,
            publishers: Object.keys(groupedData).length,
            premiumArticles: premiumCount,
            growthRate,
            topPublisher: sortedPublishers[0]?.[0] || 'N/A',
            trendingPublisher: getTrendingPublisher(sortedPublishers),
            recentActivity: activityLog.slice(0, 5)
          });

        } catch (error) {
          console.warn("News API not available, using sample data instead");
          chartData = getSampleData();
          setStats(getSampleStats());
        }

        setPublisherData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setPublisherData(getSampleData());
        setStats(getSampleStats());
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [timeRange]);

  const getColorForIndex = (index) => {
    const colors = [
      '#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A',
      '#F97316', '#FB923C', '#FDBA74', '#FECACA'
    ];
    return colors[index % colors.length];
  };

  const calculateGrowthRate = (currentCount) => {
    // Mock growth calculation - in a real app, compare with previous period
    return Math.round((Math.random() * 20 + 5) * 10) / 10;
  };

  const getTrendingPublisher = (publishers) => {
    if (publishers.length < 2) return 'N/A';
    // Mock trending calculation - in a real app, compare growth rates
    const randomIndex = Math.floor(Math.random() * Math.min(3, publishers.length));
    return publishers[randomIndex][0];
  };

  const getSampleData = () => {
    return [
      ["Publisher", "Articles", { role: 'style' }],
      ["New York Times", 24, '#F59E0B'],
      ["The Washington Post", 18, '#FBBF24'],
      ["The Guardian", 15, '#FCD34D'],
      ["BBC News", 21, '#FDE68A'],
      ["Reuters", 12, '#F97316']
    ];
  };

  const getSampleStats = () => {
    return {
      totalArticles: 90,
      publishers: 5,
      premiumArticles: 32,
      growthRate: 12.3,
      topPublisher: "New York Times",
      trendingPublisher: "BBC News",
      recentActivity: [
        { title: "Global Summit Coverage", date: new Date(), publisher: "BBC News" },
        { title: "Market Analysis Q3", date: new Date(Date.now() - 86400000), publisher: "Reuters" },
        { title: "Tech Conference Highlights", date: new Date(Date.now() - 172800000), publisher: "The Guardian" }
      ]
    };
  };

  const getTimeSeriesData = () => {
    // Mock time series data based on selected time range
    const baseData = [["Date", "Articles"]];
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const count = Math.floor(Math.random() * 10) + 5 + Math.floor(i / 3);
      baseData.push([day, count]);
    }
    
    return baseData;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              Analytics <span className="text-amber-500">Dashboard</span>
            </h2>
            <p className="text-gray-400 mt-2">Monitor your news platform performance</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-zinc-800 rounded-lg p-2">
              <button 
                onClick={() => setTimeRange('week')} 
                className={`px-3 py-1 text-sm rounded ${timeRange === 'week' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange('month')} 
                className={`px-3 py-1 text-sm rounded ${timeRange === 'month' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeRange('quarter')} 
                className={`px-3 py-1 text-sm rounded ${timeRange === 'quarter' ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-zinc-700'}`}
              >
                Quarter
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FiDatabase className="text-amber-500" size={24} />}
            title="Total Articles"
            value={stats.totalArticles}
            change={stats.growthRate}
            isPositive={stats.growthRate >= 0}
          />
          
          <StatCard 
            icon={<FiUsers className="text-amber-500" size={24} />}
            title="Publishers"
            value={stats.publishers}
          />
          
          <StatCard 
            icon={<FiAward className="text-amber-500" size={24} />}
            title="Premium Content"
            value={stats.premiumArticles}
            percentage={Math.round((stats.premiumArticles / stats.totalArticles) * 100) || 0}
          />
          
          <StatCard 
            icon={<FiTrendingUp className="text-amber-500" size={24} />}
            title="Trending Publisher"
            value={stats.trendingPublisher}
            isText={true}
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Main Charts */}
            <div className="grid gap-6 lg:grid-cols-2 mb-8">
              {/* Time Series Chart */}
              <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiActivity className="text-amber-500 mr-2" size={20} />
                    Publishing Activity
                  </h2>
                  <span className="text-sm text-gray-400">Last {timeRange}</span>
                </div>
                <div className="w-full h-64">
                  <Chart
                    chartType="AreaChart"
                    data={getTimeSeriesData()}
                    options={{
                      title: '',
                      titleTextStyle: { color: '#fff' },
                      hAxis: {
                        title: "Date",
                        textStyle: { color: '#9CA3AF' },
                        titleTextStyle: { color: '#9CA3AF' },
                        gridlines: { color: '#374151' }
                      },
                      vAxis: {
                        title: "Articles Published",
                        textStyle: { color: '#9CA3AF' },
                        titleTextStyle: { color: '#9CA3AF' },
                        gridlines: { color: '#374151' }
                      },
                      legend: { position: "none" },
                      areaOpacity: 0.7,
                      colors: ['#F59E0B'],
                      chartArea: { 
                        width: '85%', 
                        height: '75%',
                        backgroundColor: {
                          stroke: '#4B5563',
                          strokeWidth: 1
                        }
                      },
                      backgroundColor: 'transparent',
                      tooltip: { 
                        textStyle: { color: '#1F2937' },
                        trigger: 'focus'
                      }
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              {/* Publisher Distribution */}
              <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiPieChart className="text-amber-500 mr-2" size={20} />
                    Publisher Distribution
                  </h2>
                  <span className="text-sm text-gray-400">By article count</span>
                </div>
                <div className="w-full h-64">
                  <Chart
                    chartType="PieChart"
                    data={[
                      ["Publisher", "Articles"],
                      ...publisherData.slice(1).map(([publisher, count]) => [publisher, count])
                    ]}
                    options={{
                      pieHole: 0.4,
                      is3D: false,
                      pieSliceText: "label",
                      legend: {
                        position: "labeled",
                        textStyle: { color: '#9CA3AF' },
                        alignment: 'center'
                      },
                      colors: publisherData.slice(1).map(item => item[2]),
                      chartArea: { 
                        width: '90%', 
                        height: '80%',
                        backgroundColor: {
                          stroke: '#4B5563',
                          strokeWidth: 1
                        }
                      },
                      backgroundColor: 'transparent',
                      tooltip: { 
                        textStyle: { color: '#1F2937' },
                        showColorCode: true
                      },
                      slices: {
                        0: { offset: 0.1 },
                        1: { offset: 0.05 }
                      }
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Top Publishers */}
              <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-white flex items-center mb-4">
                  <FiBarChart2 className="text-amber-500 mr-2" size={20} />
                  Top Publishers
                </h2>
                <div className="w-full h-64">
                  <Chart
                    chartType="BarChart"
                    data={publisherData}
                    options={{
                      hAxis: {
                        title: "Articles",
                        minValue: 0,
                        textStyle: { color: '#9CA3AF' },
                        titleTextStyle: { color: '#9CA3AF' },
                        gridlines: { color: '#374151' }
                      },
                      vAxis: {
                        title: "Publisher",
                        textStyle: { color: '#9CA3AF' },
                        titleTextStyle: { color: '#9CA3AF' }
                      },
                      bars: "horizontal",
                      legend: "none",
                      colors: publisherData.slice(1).map(item => item[2]),
                      chartArea: { 
                        width: '85%', 
                        height: '75%',
                        backgroundColor: {
                          stroke: '#4B5563',
                          strokeWidth: 1
                        }
                      },
                      backgroundColor: 'transparent',
                      tooltip: { 
                        textStyle: { color: '#1F2937' },
                        showColorCode: true
                      },
                      animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true
                      }
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-white flex items-center mb-4">
                  <FiCalendar className="text-amber-500 mr-2" size={20} />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start p-4 hover:bg-zinc-700 rounded-lg transition-colors">
                        <div className="bg-amber-500/10 p-2 rounded-lg mr-4">
                          <FiActivity className="text-amber-500" size={18} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{activity.title}</h3>
                          <p className="text-sm text-gray-400">{activity.publisher}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {activity.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No recent activity found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, title, value, change, percentage, isPositive, isText }) => {
  return (
    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900 border border-zinc-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          {isText ? (
            <h3 className="text-xl font-bold text-amber-500">{value}</h3>
          ) : (
            <h3 className="text-2xl font-bold">{value}</h3>
          )}
        </div>
        <div className="bg-amber-500/10 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      
      {(change !== undefined || percentage !== undefined) && (
        <div className="mt-4 flex items-center">
          {change !== undefined && (
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span>
          )}
          {percentage !== undefined && (
            <div className="w-full bg-zinc-700 rounded-full h-2 ml-2">
              <div 
                className="bg-amber-500 h-2 rounded-full" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHome;