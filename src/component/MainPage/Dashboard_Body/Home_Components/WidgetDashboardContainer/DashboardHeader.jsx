import React from "react";
const DashboardHeader = ({ category }) => (
    <p className="widget-dashboard-header" style={{ marginLeft: '1rem' }}>
        {category}
    </p>
);

export default DashboardHeader;
