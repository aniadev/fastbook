import React from 'react'
import './Sidebar.css'
import UserProfileItem from '../UserProfileItem'


function Sidebar() {
    return (
        <div className="menu">
            <ul>
                <li>
                    <UserProfileItem />
                </li>
                <li className="active"><p>Trang chủ</p></li>
                <li><p>Messenger</p></li>
            </ul>
        </div>
    )
}


export default Sidebar

