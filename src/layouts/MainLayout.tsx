import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import {FC} from "react";

const MainLayout:FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;