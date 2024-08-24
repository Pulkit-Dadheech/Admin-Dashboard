import { useSelector,useDispatch } from "react-redux";
import "./DashboardList.css";
import {updateSelectedDashboard } from "../features/widgets/dashboardSlice";

export default function DashboardList() {
    const dashboardData = useSelector((state) => state.subDashboard);
    const selectedDashboardId = dashboardData.selectedDashboardId;
    const dispatch = useDispatch();
    function handleButtonClick(id){
        dispatch(updateSelectedDashboard({id}))
    }

    return (
        <div className="sidebar-dashboard-name-container">
            {dashboardData.subDashboard.map((dashboard) => {
                console.log(`Dashboard ID: ${dashboard.id}, Selected ID: ${selectedDashboardId}`);
                return (
                    <button
                        className="sidebar-dashboard-name"
                        key={dashboard.id}
                        style={{
                            color: dashboard.id === selectedDashboardId ? 'black' : 'grey',
                            fontWeight: 'bolder',
                            // border: "none",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            backgroundColor: "transparent",
                            borderBottom: dashboard.id === selectedDashboardId ? '4px solid black' : '4px solid grey',
                        }}
                        onClick={()=>handleButtonClick(dashboard.id)}
                    >
                        {dashboard.dashboard_category.split(' ')[0]}
                    </button>
                );
            })}
        </div>
    );
}
