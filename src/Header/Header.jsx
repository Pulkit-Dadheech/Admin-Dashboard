import {BsSearch} from 'react-icons/bs'
import './Header.css';
export default function Header(){
    return (
        <header className={'header'}>

            <div className={'header-left'}>
                <div className={"header-name"}>Home > Dashboard v2</div>
            </div>

            <div className={'header-right'}>
                <div className={'header-search-icon'}>
                    <BsSearch className={'icon'}/>
                </div>
                {/*<SearchComponent/>*/}
                {/*search component not necessary*/}

            </div>
        </header>
    )
}