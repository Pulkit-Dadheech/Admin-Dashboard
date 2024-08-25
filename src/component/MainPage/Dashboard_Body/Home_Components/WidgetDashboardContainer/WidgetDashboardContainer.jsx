import './WidgetDashboardContainer.css';
import { useSelector, useDispatch } from "react-redux";
import {updateSelectedDashboard} from "../../../../../features/widgets/dashboardSlice";
import DashboardHeader from './DashboardHeader';
import Widget from './Widget';
import EmptyWidgetContainer from './EmptyWidgetContainer';
import React from "react";

export default function WidgetDashboardCreator({ toggleSidebar }) {
    const dashboardData = useSelector(state => state.subDashboard);
    const searchData = useSelector(state => state.subDashboard.searchData);
    const dispatch = useDispatch();

    const handleAddButtonClick = (id) => {
        dispatch(updateSelectedDashboard({ id }));
        toggleSidebar();
    };

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
                    <DashboardHeader category={dashboard.dashboard_category} />
                    <div className="widget-dashboard-container">
                        {dashboard.dashboard_data
                            .filter(widget => !searchData || widget.widget_name.toLowerCase().includes(searchData.toLowerCase()))
                            .map((widget) => (
                                <Widget
                                    key={widget.id}
                                    widget={widget}
                                    onAddButtonClick={() => handleAddButtonClick(dashboard.id)}
                                />
                            ))}
                        {!searchData && Array(3 - dashboard.dashboard_data.length).fill().map((_, index) => (
                            <EmptyWidgetContainer
                                key={`empty-${index}`}
                                onAddButtonClick={() => handleAddButtonClick(dashboard.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
