import { BsSearch } from 'react-icons/bs';
import './Header.css';
import { useSelector, useDispatch } from "react-redux";
import { updateSearchData } from "../features/widgets/dashboardSlice";
import { useState, useEffect } from "react";

export default function Header() {
    const searchData = useSelector(state => state.subDashboard.searchData); // Select searchData directly
    const dispatch = useDispatch();
    const [searchWidgetName, setSearchWidgetName] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchWidgetName !== searchData) {
                dispatch(updateSearchData({ name: searchWidgetName }));
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchWidgetName, dispatch, searchData]);

    function handleSearchInputChange(event) {
        setSearchWidgetName(event.target.value);
    }

    return (
        <header className="header">
            <div className="header-left">
                <div className="header-name">Home &gt; Dashboard v2</div>
            </div>

            <div className="header-right">
                <div className="header-search">
                    <BsSearch className="search-icon" />
                    <input
                        type="text"
                        value={searchWidgetName}
                        onChange={handleSearchInputChange}
                        className="search-input"
                        placeholder="Search widgets..."
                    />
                </div>
            </div>
        </header>
    );
}
