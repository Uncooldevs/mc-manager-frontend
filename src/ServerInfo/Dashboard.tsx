import {Button, CircularProgress} from "@mui/material";
import Console from "./console/console";
import {ServerState} from "./state";
import {ServerStatus} from "../models/Server";
import {start_server, stop_server} from "../api";
import {get_size} from "../utils/utils";


function Dashboard(props: { server: ServerState | undefined, update_state_func: (state: (values: any) => any) => void }) {

    if (props.server?.server === undefined) {
        return <CircularProgress/>
    }

    function render_metrics() {
        if (props.server?.metrics === undefined) {
            return <CircularProgress/>
        }
        return <div>
            <h2>Metrics</h2>
            <p>Memory: {get_size(props.server.metrics.memory.server)}</p>
            <p>CPU: {props.server.metrics.cpu.percent}%</p>
        </div>
    }

    return <div>
        <h1>Dashboard - {props.server.server?.name}</h1>
        <h3>{props.server.server.status}</h3>
        <Button variant="contained" onClick={() => {
            if (props.server?.server?.sid === undefined) {
                return
            }
            props.update_state_func((values) => ({...values, output: ""}))
            start_server(props.server.server.sid).catch(console.error)
        }} disabled={props.server.server?.status === ServerStatus.RUNNING}>Start</Button>
        <Button variant={"contained"} disabled={props.server.server?.status !== ServerStatus.RUNNING}
                onClick={() => {
                    if (props.server?.server?.sid === undefined) {
                        return
                    }
                    stop_server(props.server.server.sid).catch(console.error)
                }}
        >Stop</Button>

        <Console output={props.server.output ?? ""}/>

        {render_metrics()}
    </div>

}

export default Dashboard;
