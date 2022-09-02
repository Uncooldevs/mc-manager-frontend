import {Button, CircularProgress} from "@mui/material";
import {default_ip} from "../utils/globals";
import ServerItem from "./ServerItem";
import {BasicServer} from "../models/Server";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Homepage() {

    const [servers, set_servers] = useState<BasicServer[]>()

    function load_servers() {
        fetch(default_ip + "/servers")
            .then(response => response.json())
            .then((server_list: { servers: [BasicServer] }) => {
                    set_servers(server_list.servers)
                    console.log(servers)
                }
            ).catch(() => {
            console.error("Failed...")
        })
    }

    useEffect(() => {
        load_servers()
    }, [])

    function render_serverlist() {
        if (servers === undefined) {
            return <CircularProgress/>
        } else if (servers.length === 0) {
            return "No servers found"
        }
        return servers.map((item: BasicServer, index: number) => {
            return <ServerItem server={item} key={index}/>
        })
    }

    return <div>
        <div className="buttons">
            <Link to={"/create"}><Button variant="contained">Create New Server</Button></Link>
            <Link to={"/settings"}><Button variant="contained">Settings</Button></Link>
            <Button variant="contained" onClick={load_servers}>Reload</Button>
        </div>

        {render_serverlist()}

    </div>
}

export default Homepage
