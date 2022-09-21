import {Button, Card, CircularProgress, Stack} from "@mui/material";
import ServerItem from "./ServerItem";
import {BasicServer} from "../models/Server";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as api from "../api";


function Homepage() {

    const [servers, set_servers] = useState<BasicServer[] | string>()

    function load_servers() {
        api.get_servers().then(
            set_servers
        ).catch((err)=>{
            set_servers(err.toString())
        })
    }


    useEffect(() => {
        load_servers()
    }, [])

    function render_serverlist() {
        if (servers === undefined) {
            return <CircularProgress/>
        } else if (typeof servers === "string") {
            return <Card>{servers}</Card>
        }else if(servers.length === 0){
            return <Card>No servers found</Card>
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

        <Stack spacing={2}>
            {render_serverlist()}
        </Stack>
    </div>
}

export default Homepage
