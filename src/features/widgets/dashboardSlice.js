import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    subDashboard: [
        {
            id: '0F',
            dashboard_category: 'CSPM Executive Dashboard',
            dashboard_data: [
                {
                    id: nanoid(),
                    widget_name: 'Cloud Accounts',
                    widget_type: 'Doughnut',
                    widget_data: [{
                        labels: ["Connected", "NotConnected"],
                        datasets: [{
                            data: [2, 2],
                            backgroundColor: ['#1e90ff', '#87cefa'],
                        }],
                    }],
                    widget_selected: true,
                },
                {
                    id: nanoid(),
                    widget_name: 'Cloud Account Risk Management',
                    widget_type: 'Doughnut',
                    widget_data: [{
                        labels: ["Failed", "Warning", "Not Available", "Passed"],
                        datasets: [{
                            data: [1689, 681, 36, 7253],
                            backgroundColor: ['#ff6347', '#ffd700', '#949ea2', '#19b73e'],
                        }],
                    }],
                    widget_selected: true
                },
                {
                    id: nanoid(),
                    widget_name: '',
                    widget_type: 'Doughnut',
                    widget_data: [],
                    widget_selected: true,

                }
            ],
        },
        {
            id: nanoid(),
            dashboard_category: 'CWPP Dashboard',
            widget_type: 'Doughnut',
            dashboard_data: [
                {
                    id: nanoid(),
                    widget_name: 'Top 5 Namespace Specific Alerts',
                    widget_type: 'Doughnut',
                    widget_data: [],
                    widget_selected: true
                },
                {
                    id: nanoid(),
                    widget_name: 'Workload Alerts',
                    widget_type: 'Doughnut',
                    widget_data: [],
                    widget_selected: true
                },
                {
                    id: nanoid(),
                    widget_name: '',
                    widget_type: 'Doughnut',
                    widget_data: [],
                    widget_selected: true
                }
            ]
        },
        {
            id: nanoid(),
            dashboard_category: 'Registry Scan',
            dashboard_data: [
                {
                    id: nanoid(),
                    widget_name: 'Image Risk Assessment',
                    widget_type: 'Bar',
                    widget_data: [{
                        labels: ['Vulnerabilities'],
                        datasets: [
                            {
                                label: 'Critical',
                                data: [9],
                                backgroundColor: '#b71c1c', // Critical - Red
                            },
                            {
                                label: 'High',
                                data: [150],
                                backgroundColor: '#f57c00', // High - Orange
                            },
                            {
                                label: 'Medium',
                                data: [400],
                                backgroundColor: '#ffb300', // Medium - Yellow
                            },
                            {
                                label: 'Low',
                                data: [911],
                                backgroundColor: '#cfd8dc', // Low - Grey
                            },
                        ],
                    }],
                    widget_selected: true
                },
                {
                    id: nanoid(),
                    widget_name: 'Image Security Issues',
                    widget_type: 'Bar',
                    widget_data: [],
                    widget_selected: true
                }
            ]
        }
    ],
    selectedDashboardId: '0F',
};

export const dashboardSlice = createSlice({
    name: 'subDashboard',
    initialState,
    reducers: {
        addDashboard: (state, action) => {
            const subDashboard = {
                id: nanoid(),
                dashboard_category: action.payload.dashboardName,
                dashboard_data: []
            };
            state.subDashboard.push(subDashboard);
        },

        removeDashboard: (state, action) => {
            const {dashboardId} = action.payload;
            state.subDashboard = state.subDashboard.filter(
                (dashboard) => dashboard.id !== dashboardId
            );
        },

        updateDashboardName: (state, action) => {
            const {dashboardId, dashboardName} = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                dashboard.dashboard_category = dashboardName;
            }
        },

        addWidget(state, action) {
            const { dashboardId, widgetName } = action.payload;
            const dashboard = state.subDashboard.find(d => d.id === dashboardId);
            if (dashboard) {
                if (!dashboard.dashboard_data) {
                    dashboard.dashboard_data = [];
                }
                dashboard.dashboard_data.push({
                    id: nanoid(),
                    widget_name: widgetName,
                    widget_selected: false
                });
            }
        },

        removeWidget: (state, action) => {
            const {dashboardId, widgetId} = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                dashboard.dashboard_category = dashboard.dashboard_data.filter(
                    (widget) => widget.id !== widgetId
                );
            }
        },

        updateWidget: (state, action) => {
            const {dashboardId, widgetId, newWidgetData} = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                const widget = dashboard.dashboard_data.find(
                    (widget) => widget.id === widgetId
                );
                if (widget) {
                    widget.widget_name = newWidgetData.widgetName || widget.widget_name;
                    widget.widget_data = newWidgetData.widgetData || widget.widget_data;
                }
            }
        },
        updateSelectedDashboard : (state,action)=> {
            const {id} = action.payload;
            state.selectedDashboardId = id;
        },
        toggleWidgetSelection: (state, action) => {
            const {dashboardId, widgetId} = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                const widget = dashboard.dashboard_data.find(
                    (widget) => widget.id === widgetId
                );
                if (widget) {
                    widget.widget_selected = !widget.widget_selected;
                }
            }
        }
    }
});

export const {
    addDashboard,
    removeDashboard,
    updateDashboardName,
    addWidget,
    removeWidget,
    updateWidget,
    toggleWidgetSelection,
    updateSelectedDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
