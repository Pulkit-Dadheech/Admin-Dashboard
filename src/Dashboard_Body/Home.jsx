import React, { useState } from 'react';
import WidgetDashboardCreator from './WidgetDashboardCreator';
import SidebarMainPage from "../sidebar/SidebarMainPage";
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
    const [isActive, setIsActive] = useState(false); // Sidebar visibility state

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    return (
        <div className="home">
            <div className="home-header">
                <div className="home-name">CNAPP Dashboard</div>
                {/* Add Widget button to toggle sidebar */}
                <button onClick={toggleSidebar} className="add-widget-button">
                    Add Widget
                </button>
            </div>

            <div className="home-content">
                <WidgetDashboardCreator toggleSiderbar={toggleSidebar} />
                <div className={`sidebar ${isActive ? 'active' : ''}`}>
                    <SidebarMainPage toggleSidebar={toggleSidebar}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
