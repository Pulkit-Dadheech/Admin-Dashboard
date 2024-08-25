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
                        labels: ["Connected", "Not Connected"],
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
                        labels: ['Critical', 'High', 'Medium', 'Low'],
                        datasets: [
                            {
                                label: 'Vulnerabilities',
                                data: [9, 150, 400, 911],
                                backgroundColor: ['#b71c1c', '#f57c00', '#ffb300', '#cfd8dc'],
                            }
                        ]
                    }],
                    widget_selected: true
                },
                {
                    id: nanoid(),
                    widget_name: 'Image Security Issues',
                    widget_type: 'Bar',
                    widget_data: [{
                        labels: ['Critical', 'High', 'Medium', 'Low','Least'],
                        datasets: [
                            {
                                label: 'Total Images',
                                data: [2,2,3,2,4],
                                backgroundColor: ['#850808', '#e72e48', '#d35e03', '#ffb300','#84898c'],
                            }
                        ]
                    }],
                    widget_selected: true
                }
            ]
        }
    ],
    selectedDashboardId: '0F',
    searchData: '',
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

        updateWidgetName: (state, action) => {
            const {dashboardId, widgetId, widgetName} = action.payload;
            const dashboard = state.subDashboard.find(
                (dashboard) => dashboard.id === dashboardId
            );
            if (dashboard) {
                const widget = dashboard.dashboard_data.find(
                    (widget) => widget.id === widgetId
                );
                if (widget) {
                    widget.widget_name = widgetName;
                }
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
        },
        updateSearchData : (state,action) =>{
            const {name} = action.payload;
            state.searchData = name;
        }
    }
});

export const {
    addDashboard,
    removeDashboard,
    updateDashboardName,
    addWidget,
    removeWidget,
    updateWidgetName,
    updateWidget,
    toggleWidgetSelection,
    updateSelectedDashboard,
    updateSearchData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
