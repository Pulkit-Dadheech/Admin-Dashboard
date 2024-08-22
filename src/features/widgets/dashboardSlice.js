import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    subDashboard: [
        {
            id:0,
            dashboard_name: 'CSPM Executive Dashboard',
            dashboard_data: [
                {
                    id: 0,
                    widget_name: 'Cloud Accounts',
                    widget_data: [{status: "Connected", count: 2},
                        {status: "Not Connected", count: 2}]
                }
            ]
        }]
};
export const dashboardSlice = createSlice({
    name: 'subDashboard',
    initialState,
    reducers: {
        addDashboard: (state, action) => {
            const subDashboard = {
                id: nanoid(),
                dashboardName: action.payload.dashboardName,
                dashboardData: []
            }
            state.subDashboard.push(subDashboard);
        },

        removeDashboard: (state, action) => {
            const {dashboardId} =action.payload;
            state.subDashboard = state.subDashboard.filter((dashboard) => dashboard.id !==dashboardId );
            if(state.subDashboard){
                state.subDashboard.dashboard_name = action.payload.dashboardName;
            }
        },

        updateDashboardName: (state,action)=>{
            const {dashboardId,dashboardName} =action.payload;
            const dashboard = state.subDashboard.find((dashboard)=>dashboard.id === dashboardId);
            if(dashboard) dashboard.dashboard_name = dashboardName;
        },

        addWidget: (state,action)=> {
            const { dashboardId, widgetName, widgetData } = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                dashboard.dashboardData.push({
                    id: nanoid(), // Unique ID for the widget
                    widget_name: widgetName,
                    widget_data: widgetData,
                });
            }
        },

        removeWidget: (state, action) => {
            const { dashboardId, widgetId } = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                dashboard.dashboardData = dashboard.dashboardData.filter(
                    (widget) => widget.id !== widgetId
                );
            }
        },

        updateWidget: (state, action) => {
            const { dashboardId, widgetId, newWidgetData } = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                const widget = dashboard.dashboardData.find(
                    (widget) => widget.id === widgetId
                );
                if (widget) {
                    widget.widget_name = newWidgetData.widgetName || widget.widget_name;
                    widget.widget_data = newWidgetData.widgetData || widget.widget_data;
                }
            }
        }

    }
})

export const {addDashboard,removeDashboard,updateDashboardName,addWidget,removeWidget,updateWidget} = dashboardSlice.actions

export default dashboardSlice.reducer