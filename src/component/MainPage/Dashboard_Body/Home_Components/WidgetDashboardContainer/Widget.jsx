// src/components/Widget.js
import React from "react";
import { Doughnut, Bar } from 'react-chartjs-2';
import { BsGraphUp } from "react-icons/bs";
import ChartLegend from "../ChartLegend";
import '../../../../../utils/chartConfig.js'; // Ensure Chart.js elements are registered
import './WidgetDashboardContainer.css';

const Widget = ({ widget, onAddButtonClick }) => {
    const barChartOptions = {
        indexAxis: 'y',
        responsive: false,
        maintainAspectRatio: true,
        scales: {
            x: { stacked: true, display: false },
            y: { stacked: true, display: false },
        },
        plugins: {
            legend: { display: false },
        },
        elements: {
            bar: {
                borderRadius: (context) => {
                    const datasetIndex = context.datasetIndex;
                    const datasets = context.chart.data.datasets;
                    const totalDatasets = datasets.length;

                    if (datasetIndex === totalDatasets - 1) {
                        return { topLeft: 0, bottomLeft: 0, topRight: 20, bottomRight: 20 };
                    }
                },
            },
        },
    };

    const handleAddButtonClick = () => {
        onAddButtonClick(widget.id);
    };

    return (
        <div className="widget-container">
            {widget.widget_selected && widget.widget_name !== '' ? (
                <>
                    <div className="widget-title">{widget.widget_name}</div>
                    {widget.widget_data?.[0]?.datasets?.[0]?.label && (
                        <span className="legend-text" style={{ fontSize: "30px" }}>
                            {widget.widget_data[0].datasets[0].data.reduce((acc, value) => acc + value, 0)}
                            <span style={{ fontSize: "15px", fontWeight: '500', alignSelf: "center" }}>
                                {widget.widget_data[0].datasets[0].label}
                            </span>
                        </span>
                    )}
                    {widget.widget_data && widget.widget_data.length > 0 && widget.widget_data[0].labels ? (
                        <div className="widget-body-container">
                            <div className="chart-legend-container">
                                {widget.widget_type === 'Doughnut' ? (
                                    <div className="doughnut-chart-container">
                                        <Doughnut
                                            data={widget.widget_data[0]}
                                            height={180}
                                            width={180}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: { display: false },
                                                },
                                            }}
                                        />
                                    </div>
                                ) : (
                                    widget.widget_type === 'Bar' && (
                                        <Bar
                                            data={widget.widget_data[0]}
                                            options={barChartOptions}
                                            height={60}
                                        />
                                    )
                                )}
                                <ChartLegend data={widget.widget_data[0]} type={widget.widget_type} />
                            </div>
                        </div>
                    ) : (
                        <div className='widget-body-container'>
                            <BsGraphUp size={25} />
                            <div className={'widget-body-not-found-text'}>Graph data not found</div>
                        </div>
                    )}
                </>
            ) : (
                <button className='add-widget-button' onClick={handleAddButtonClick}>
                    +Add Widget
                </button>
            )}
        </div>
    );
};

export default Widget;
