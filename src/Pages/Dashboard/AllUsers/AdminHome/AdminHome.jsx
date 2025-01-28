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
                console.log("Fetched News Data:", data);

                const groupedData = data.reduce((acc, article) => {
                    if (article.publisher) {
                        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
                    }
                    return acc;
                }, {});

                console.log("Grouped Data:", groupedData);

                // Convert grouped data into chart-ready format
                const chartData = [["Publisher", "Articles"]];
                for (const [publisher, count] of Object.entries(groupedData)) {
                    chartData.push([publisher, count]);
                }

                console.log("Publisher Data for Bar Chart:", chartData);
                setPublisherData(chartData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news data:", error);
            }
        };

        fetchNewsData();
    }, []);

    // Calculate Pie Chart Data
    const totalArticles = publisherData.slice(1).reduce((sum, [, count]) => sum + count, 0);
    console.log("Total Articles:", totalArticles);

    const pieChartData = [["Publisher", "Percentage"]];
    if (totalArticles > 0) {
        publisherData.slice(1).forEach(([publisher, count]) => {
            const percentage = ((count / totalArticles) * 100).toFixed(2);
            if (!isNaN(percentage)) {
                pieChartData.push([publisher, parseFloat(percentage)]);
            }
        });
    }

    console.log("Pie Chart Data:", JSON.stringify(pieChartData, null, 2));
    return (
        <div className="charts-container">
            <h1>Dynamic and Static Charts</h1>

            {/* Dynamic Pie Chart */}
            <div className="chart">
                <h2>Publisher Article Percentage</h2>
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
            <div className="chart">
                <h2>Articles by Publisher</h2>
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

            {/* Static Area Chart */}
            <div className="chart">
                <h2>Article Trends Over Time</h2>
                <Chart
                    chartType="AreaChart"
                    data={[
                        ["Date", "Articles"],
                        ["2023-01", 10],
                        ["2023-02", 15],
                        ["2023-03", 25],
                        ["2023-04", 30],
                    ]} // Replace with dynamic data if available
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
    );
};

export default AdminHome;
