import DashboardList from "./Sidebar_Dashboard_Header/DashboardList";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetSelection, addWidget, updateWidgetName, removeWidget } from "../../../features/widgets/dashboardSlice"; // Import deleteWidget action
import "./SidebarMainPage.css";
import React, { useState } from "react";
import EditableLabel from './Widget_Name_Editor/EditableLabel';
import SidebarHeader from "../Sidebar_Header/SidebarHeader";

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

    function handleSaveWidgetName(dashboardId, widgetId, widgetName) {
        if (widgetName.trim() !== "") {
            dispatch(updateWidgetName({ dashboardId, widgetId, widgetName }));
        } else {
            alert('Widget name cannot be empty');
        }
    }

    function handleDeleteWidget(dashboardId, widgetId) {
        if (window.confirm('Are you sure you want to delete this widget?')) {
            dispatch(removeWidget({ dashboardId, widgetId }));
        }
    }

    return (
        <div className='sidebar-content'>
            <SidebarHeader toggleSidebar={toggleSidebar}/>
            <DashboardList/>
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
                                        className={'sidebar-widget-list-checkbox'}
                                    />
                                    <EditableLabel
                                        initialValue={widget.widget_name}
                                        onSave={(newName) => handleSaveWidgetName(dashboard.id, widget.id, newName)}
                                        onDelete={() => handleDeleteWidget(dashboard.id, widget.id)}
                                    />
                                </div>
                            )
                        ))
                    );
                }
            })}
            <div className='add-widget-section'>
                {!isFormVisible ? (
                    <button className="sidebar-add-widget-button" onClick={() => setIsFormVisible(true)}>
                        + Add New Widget
                    </button>
                ) : (
                    <form className="widget-form" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            className="widget-input"
                            value={newWidgetName}
                            onChange={(e) => setNewWidgetName(e.target.value)}
                            placeholder="Widget Name"
                        />
                        <div className="form-buttons">
                            <button type="submit" className="submit-button">Add Widget</button>
                            <button type="button" className="cancel-button"
                                    onClick={() => setIsFormVisible(false)}>Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
