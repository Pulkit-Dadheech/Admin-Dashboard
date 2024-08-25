// src/components/ChartLegend.js
import React from 'react';

export default function ChartLegend({data, type}) {
    return (
        <div className="legend-container">
            {data.labels.map((label, index) => {
                const backgroundColor = data.datasets[0].backgroundColor[index]
                const value = data.datasets[0].data[index];

                return (
                    <>
                        <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{backgroundColor}}
                        ></span>
                            <span className="legend-text">{`${label} (${value})`}</span>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
