import {Link, useParams} from "react-router-dom";
import SideTabBarWithBack, {TabEntry} from "../utils/SideTabs";
import Dashboard from "./Dashboard";
import {useEffect, useState} from "react";
import {Server} from "../models/Server";
import {get_server} from "../api";


function ServerInfo() {
    const {server_id} = useParams()
    const [current_server, setCurrentServer] = useState<Server>()
    const [error, setError] = useState<string>("")

    function load_sever() {
        get_server(server_id as string).then((server) => {
            setCurrentServer(server)
        }).catch((error) => {
            console.log(error)
            setError(error.toString())
        })

    }

    useEffect(() => {
        load_sever()
    }, [])

    if (error !== "") {
        return <div>
            <h1>Server not found</h1>
            <Link to={"/"}>Back</Link>
        </div>
    } else {
        return <SideTabBarWithBack tabs={[
            new TabEntry("Dashboard", <Dashboard server={current_server}/>),
            new TabEntry("Players", <h1>Players</h1>),
        ]}/>
    }
}

export default ServerInfo
