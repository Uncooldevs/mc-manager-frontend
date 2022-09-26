import {FormControlLabel, Switch, TextField} from "@mui/material";
import {ServerState} from "./state";


function ServerSettings(props: { server?: ServerState }) {
    if (props.server?.properties === undefined) {
        return <h2>Error</h2>
    }

    console.log(props.server.properties)
    return <div className="server-settings">
        <h1>Server Settings</h1>
        {
            Object.entries(props.server.properties).map(([key, value]) => {
                if (typeof value === "string") {
                    return <div><TextField variant="outlined" label={key} value={value}/></div>
                }
                else if (typeof value === "boolean"){
                    return <div><FormControlLabel control={<Switch value={value} checked={value}/>} label={key}/></div>
                }
            })
        }

    </div>

}

export default ServerSettings
