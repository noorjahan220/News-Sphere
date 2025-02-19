import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { FaSun, FaMoon } from 'react-icons/fa';
import { useOutletContext } from "react-router-dom";

const AdminHome = () => {
  const { isDarkMode, toggleDarkMode } = useOutletContext();
  const [publisherData, setPublisherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/news");
        const groupedData = data.reduce((acc, article) => {
          if (article.publisher) {
            acc[article.publisher] = (acc[article.publisher] || 0) + 1;
          }
          return acc;
        }, {});
        
        const chartData = [["Publisher", "Articles"]];
        for (const [publisher, count] of Object.entries(groupedData)) {
          chartData.push([publisher, count]);
        }

        setPublisherData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  const totalArticles = publisherData.slice(1).reduce((sum, [, count]) => sum + count, 0);

  const pieChartData = [["Publisher", "Percentage"]];
  if (totalArticles > 0) {
    publisherData.slice(1).forEach(([publisher, count]) => {
      const percentage = ((count / totalArticles) * 100).toFixed(2);
      if (!isNaN(percentage)) {
        pieChartData.push([publisher, parseFloat(percentage)]);
      }
    });
  }

  return (
    <div className={`p-4 md:p-8 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
     

      <div className="container mx-auto text-center mt-8">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">Analytics Dashboard</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4">Loading analytics...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1">
              {/* Pie Chart Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Article Distribution</h2>
                <div className="w-full h-48 md:h-64">
                  <Chart
                    chartType="PieChart"
                    data={pieChartData}
                    options={{
                      titleTextStyle: { fontSize: 16 },
                      pieHole: 0.4,
                      is3D: false,
                      pieSliceText: "label",
                      legend: {
                        position: "labeled",
                        textStyle: { fontSize: 14 },
                      },
                      colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
                      chartArea: { width: '90%', height: '80%' },
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              {/* Bar Chart Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Articles by Publisher</h2>
                <div className="w-full h-48 md:h-64">
                  <Chart
                    chartType="BarChart"
                    data={publisherData}
                    options={{
                      titleTextStyle: { fontSize: 16 },
                      hAxis: {
                        title: "Articles",
                        minValue: 0,
                        textStyle: { fontSize: 12 },
                      },
                      vAxis: {
                        title: "Publisher",
                        textStyle: { fontSize: 12 },
                      },
                      bars: "horizontal",
                      legend: "none",
                      colors: ['#3B82F6'],
                      chartArea: { width: '85%', height: '75%' },
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>

            {/* Area Chart Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6 md:mt-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Publishing Trends</h2>
              <div className="w-full h-48 md:h-64">
                <Chart
                  chartType="AreaChart"
                  data={[["Date", "Articles"], ["Jan", 10], ["Feb", 15], ["Mar", 25], ["Apr", 30]]}
                  options={{
                    titleTextStyle: { fontSize: 16 },
                    hAxis: {
                      title: "Date",
                      textStyle: { fontSize: 12 },
                    },
                    vAxis: {
                      title: "Articles",
                      textStyle: { fontSize: 12 },
                    },
                    legend: { position: "none" },
                    areaOpacity: 0.2,
                    colors: ['#3B82F6'],
                    chartArea: { width: '85%', height: '75%' },
                  }}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
