import {Server} from "../models/Server";
import {CircularProgress} from "@mui/material";


function Dashboard(props: { server: Server | undefined }) {

    if (props.server === undefined) {
        return <CircularProgress/>
    }

    return <div>
        <h1>Dashboard - {props.server.name}</h1>

    </div>

}

export default Dashboard;
