import './Home.css';
import WidgetDashboardCreator from "./WidgetDashboardCreator";

export default function Home(){
    const data=[{

    }, {

    }]
    return (
        <div className='home'>
            <div className={'home-name'} >CNAPP Dashboard</div>
            <WidgetDashboardCreator header={'CSPM Executive Dasboard'} widgetData={data}/>
        </div>
    )
}