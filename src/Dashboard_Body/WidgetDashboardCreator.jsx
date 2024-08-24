import './WidgetDashboardCreator.css';
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedDashboard } from "../features/widgets/dashboardSlice";
import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import ChartLegend from './ChartLegend'; // Import the new legend component

ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function WidgetDashboardCreator({ toggleSiderbar }) {
    const dashboardData = useSelector(state => state.subDashboard);
    const dispatch = useDispatch();

    const barChartOptions = {
        indexAxis: 'y',
        responsive: false,
        maintainAspectRatio: true,
        scales: {
            x: { stacked: true, display: false },
            y: { stacked: true, display: false },
        },
        plugins: {
            legend: {
                display: false, // Disable the default legend
            },
        },
        elements: {
            bar: {
                borderRadius: (context) => {
                    const index = context.dataIndex;
                    const datasetIndex = context.datasetIndex;
                    const datasets = context.chart.data.datasets;
                    const totalDatasets = datasets.length;

                    if (datasetIndex === 0) {
                        return { topLeft: 20, bottomLeft: 20, topRight: 0, bottomRight: 0 };
                    }

                    if (datasetIndex === totalDatasets - 1) {
                        return { topLeft: 0, bottomLeft: 0, topRight: 20, bottomRight: 20 };
                    }

                    return 0;
                },
            },
        },
    };

    function handleAddButtonClick(id) {
        dispatch(updateSelectedDashboard({ id }));
        toggleSiderbar();
    }

    return (
        <>
            {dashboardData.subDashboard.map((dashboard) => (
                <div key={dashboard.id}>
                    <p className="widget-dashboard-header">{dashboard.dashboard_category}</p>
                    <div className="widget-dashboard-container">
                        {dashboard.dashboard_data.map((widget) => (
                            <div key={widget.id} className="widget-container">
                                {widget.widget_selected && widget.widget_name !== '' ? (
                                    <>
                                        <div className="widget-title">{widget.widget_name}</div>
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
                                                                        legend: {
                                                                            display: false, // Disable the default legend
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        widget.widget_type === 'Bar' && (
                                                            <Bar
                                                                data={widget.widget_data[0]}
                                                                options={barChartOptions}
                                                                height={80}
                                                            />
                                                        )
                                                    )}
                                                    <ChartLegend data={widget.widget_data[0]} type={widget.widget_type} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='widget-body-container'>Graph data not found</div>
                                        )}
                                    </>
                                ) : (
                                    <button className='add-widget-button' onClick={() => handleAddButtonClick(dashboard.id)}>+Add Widget</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
