import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering components used in the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherOverview: React.FC<any> = ({ data }: any) => {
    const metersToMiles = (distanceInMeters: number) => {
        const conversionFactor = 0.000621371;
        const distanceInMiles = distanceInMeters * conversionFactor;
        return distanceInMiles.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: 'Wind Speed',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Temperature',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Wave Height',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        if (data) {
            const distances = data.map((point: any) => metersToMiles(point.distance));
            const windSpeeds = data.map((point: any) => point.weather?.wind?.speed || 0);
            const temperatures = data.map((point: any) => point.weather?.air?.temperature?.value || 0);
            const waveHeights = data.map((point: any) => point.weather?.wave?.height || 0);

            setChartData({
                ...chartData,
                labels: distances,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: windSpeeds,
                    },
                    {
                        ...chartData.datasets[1],
                        data: temperatures,
                    },
                    {
                        ...chartData.datasets[2],
                        data: waveHeights,
                    }
                ]
            });
        }
    }, [data]);

    return (
        <div className='weatherchart'>
            <Line
                data={chartData}
                options={{
                    scales: {
                        x: {
                            ticks: {
                                callback: (value: any) => (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' mi'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    elements: {
                        line: {
                            tension: 0.4
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};

export default WeatherOverview;
