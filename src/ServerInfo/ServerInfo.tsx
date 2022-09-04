import {useParams} from "react-router-dom";
import SideTabBarWithBack, {TabEntry} from "../utils/SideTabs";



function ServerInfo() {
    const {server_id} = useParams()

    return SideTabBarWithBack({
        tabs: [
            new TabEntry("Dashboard", <h1>Server Info + {server_id}</h1>),
            new TabEntry("Players", <h1>Players</h1>),
        ]
    })

}

export default ServerInfo
