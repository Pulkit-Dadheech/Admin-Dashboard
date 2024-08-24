// src/components/ChartLegend.js
import React from 'react';

export default function ChartLegend({ data, type }) {
    return (
        <div className="legend-container">
            {data.labels.map((label, index) => {
                // Determine background color based on chart type
                const backgroundColor =
                    type === 'Doughnut'
                        ? data.datasets[0].backgroundColor[index]
                        : data.datasets[index].backgroundColor;

                // Get data value based on chart type
                const value =
                    type === 'Doughnut'
                        ? data.datasets[0].data[index]
                        : data.datasets[index].data[0];

                return (
                    <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor }}
                        ></span>
                        <span className="legend-text">{`${label} (${value})`}</span>
                    </div>
                );
            })}
        </div>
    );
}
