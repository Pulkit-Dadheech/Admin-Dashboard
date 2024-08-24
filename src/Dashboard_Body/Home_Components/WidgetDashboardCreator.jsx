import './WidgetDashboardCreator.css';
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedDashboard } from "../../features/widgets/dashboardSlice";
import { Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import ChartLegend from './ChartLegend';

ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function WidgetDashboardCreator({ toggleSiderbar }) {
    const dashboardData = useSelector(state => state.subDashboard);
    const searchData = useSelector(state => state.subDashboard.searchData); // Get search data
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

    function handleAddButtonClick(id) {
        dispatch(updateSelectedDashboard({ id }));
        toggleSiderbar();
    }


    const isDashboardMatchingSearch = (dashboard) => {
        return dashboard.dashboard_data.some(widget =>
            !searchData || widget.widget_name.toLowerCase().includes(searchData.toLowerCase())
        );
    };

    const filteredDashboards = dashboardData.subDashboard.filter(isDashboardMatchingSearch);

    return (
        <>
            {filteredDashboards.map((dashboard) => (
                <div key={dashboard.id}>
                    <p className="widget-dashboard-header" style={{ marginLeft: '1rem' }}>
                        {dashboard.dashboard_category}
                    </p>
                    <div className="widget-dashboard-container">
                        {/* Filter widgets based on search data */}
                        {dashboard.dashboard_data
                            .filter(widget => !searchData || widget.widget_name.toLowerCase().includes(searchData.toLowerCase()))
                            .map((widget) => (
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
                                                                    height={60}
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

                        {/* Only show empty containers if there are no widgets matching the search criteria and the search is not active */}
                        {!searchData && Array(3 - dashboard.dashboard_data.length).fill().map((_, index) => (
                            <div key={`empty-${index}`} className="widget-container">
                                <button className='add-widget-button' onClick={() => handleAddButtonClick(dashboard.id)}>+Add Widget</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
