import React from "react";
import './WidgetDashboardContainer.css';

const EmptyWidgetContainer = ({ onAddButtonClick }) => (
    <div className='widget-container'>
        <button className='add-widget-button' onClick={onAddButtonClick}>
            +Add Widget
        </button>
    </div>
);

export default EmptyWidgetContainer;
