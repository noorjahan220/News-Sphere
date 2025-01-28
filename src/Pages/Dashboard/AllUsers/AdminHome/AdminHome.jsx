import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

const AdminHome = () => {
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
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-8 min-h-screen">
            <div className="container mx-auto text-center">

                <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Dynamic and Static Charts</h1>

                <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
                    {/* Dynamic Pie Chart */}
                    <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Publisher Article Percentage</h2>
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={{
                                title: "Publisher Article Percentage",
                                is3D: true,
                                pieSliceText: "percentage",
                                legend: { position: "bottom" },
                            }}
                            width="100%"
                            height="400px"
                        />
                    </div>

                    {/* Static Bar Chart */}
                    <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Articles by Publisher</h2>
                        <Chart
                            chartType="BarChart"
                            data={publisherData}
                            options={{
                                title: "Articles by Publisher",
                                hAxis: { title: "Articles", minValue: 0 },
                                vAxis: { title: "Publisher" },
                                bars: "horizontal",
                                legend: { position: "none" },
                            }}
                            width="100%"
                            height="400px"
                        />
                    </div>

                </div>

                {/* Static Area Chart */}
                <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-8">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-6">Article Trends Over Time</h2>
                    <Chart
                        chartType="AreaChart"
                        data={[
                            ["Date", "Articles"],
                            ["2023-01", 10],
                            ["2023-02", 15],
                            ["2023-03", 25],
                            ["2023-04", 30],
                        ]}
                        options={{
                            title: "Article Trends Over Time",
                            hAxis: { title: "Date", format: "MMM yyyy" },
                            vAxis: { title: "Articles" },
                            legend: { position: "bottom" },
                            areaOpacity: 0.3,
                        }}
                        width="100%"
                        height="400px"
                    />
                </div>

            </div>
        </div>
    );
};

export default AdminHome;
