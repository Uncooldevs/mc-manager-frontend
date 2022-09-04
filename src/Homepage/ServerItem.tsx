import {BasicServer} from "../models/Server";
import {Card} from "@mui/material";
import {Link} from "react-router-dom";


function ServerItem(props: { server: BasicServer }) {
    return <Link to={"/server/" + props.server.server_id}><Card>
        <span>{props.server.name}</span>
        <span> {props.server.status}</span>
        <span>{props.server.version}</span>
    </Card></Link>
}

export default ServerItem
