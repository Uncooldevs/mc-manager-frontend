import "./console.css"
import * as api from "../../api"
import {useState} from "react";
import {Snackbar} from "@mui/material";

function Console(props: { output: string, sid: string }) {

    const [command, set_command] = useState<string>("")
    const [show_snackbar, set_show_snackbar] = useState<boolean>(false)

    function send_command() {
        set_command("")
        api.send_command(props.sid, command).then(()=>{console.log("Send")}).catch(()=>set_show_snackbar(true))
    }

    return <div className="console">
        <textarea id="ta_console" readOnly={true} value={props.output} />
        <input type="text" placeholder="Type command" onKeyDown={(e) => {
            if (e.key == "Enter") {
                send_command()
            }
        }} value={command} onChange={(e) => set_command(e.target.value)}/>
        <Snackbar open={show_snackbar} onClose={()=>set_show_snackbar(false)}/>
    </div>
}

export default Console
