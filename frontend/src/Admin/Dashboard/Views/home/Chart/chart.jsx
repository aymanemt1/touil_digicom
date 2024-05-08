import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MultiLineChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('https://touildigicom.ma/api/statistics')
            .then(response => response.json())
            .then(data => {
                const filteredData = Object.entries(data)
                    .filter(([key, value]) => !key.includes('Trashed'))
                    .reduce((acc, [key, value]) => {
                        acc.labels.push(key);
                        acc.counts.push(value);
                        return acc;
                    }, { labels: [], counts: [] });

                setChartData({
                    labels: filteredData.labels,
                    datasets: [{
                        label: 'Counts',
                        data: filteredData.counts,
                        backgroundColor: '#1B67B0',
                        borderColor: '#bbd6ef',
                        borderWidth: 1
                    }]
                });
            })
            .catch(error => console.error(error));
    }, []);
    
    useEffect(() => {
        if (chartData) {
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    );
};

export default MultiLineChart;
