import DashboardList from "./DashboardList";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetSelection, addWidget } from "../features/widgets/dashboardSlice";
import "./SidebarMainPage.css";
import React, { useState } from "react";

export default function SidebarMainPage({ toggleSidebar }) {
    const dispatch = useDispatch();
    const dashboardData = useSelector((state) => state.subDashboard);
    const selectedDashboardId = dashboardData.selectedDashboardId;

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newWidgetName, setNewWidgetName] = useState("");

    function handleCheckboxChange(data) {
        dispatch(toggleWidgetSelection(data));
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (newWidgetName.trim() !== "") {
            dispatch(addWidget({
                dashboardId: selectedDashboardId,
                widgetName: newWidgetName
            }));
            setNewWidgetName("");
            setIsFormVisible(false);
        }
    }

    return (
        <div className='sidebar-content'>
            <div className={'sidebar-header'}>
                <span className={"sidebar-topbar"}>Add Widget</span>
                <span>
                    <button onClick={toggleSidebar} className={'remove-sidebar-button'}>X</button>
                </span>
            </div>
            <DashboardList />
            {dashboardData.subDashboard.map((dashboard) => {
                if (dashboard.id === selectedDashboardId) {
                    return (
                        dashboard.dashboard_data.map((widget) => (
                            widget.widget_name !== null && widget.widget_name !== '' && (
                                <div key={widget.id} className={'sidebar-widget-list'}>
                                    <input
                                        type="checkbox"
                                        checked={widget.widget_selected}
                                        onChange={() => handleCheckboxChange({
                                            dashboardId: dashboard.id,
                                            widgetId: widget.id
                                        })}
                                    />
                                    <label>{widget.widget_name}</label>
                                </div>
                            )
                        ))
                    )
                }
            })}
            <div className='add-widget-section'>
                {!isFormVisible ? (
                    <button onClick={() => setIsFormVisible(true)}>Add New Widget</button>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={newWidgetName}
                            onChange={(e) => setNewWidgetName(e.target.value)}
                            placeholder="Widget Name"
                        />
                        <button type="submit">Add Widget</button>
                        <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
}
