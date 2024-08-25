import React from "react";

export default function SidebarHeader({toggleSidebar}){
    return (
        <div className={'sidebar-header'}>
            <span className={"sidebar-topbar"}>Add Widget</span>
            <span>
                    <button onClick={toggleSidebar} className={'remove-sidebar-button'}>X</button>
                </span>
        </div>
    )
}