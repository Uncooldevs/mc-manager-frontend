import {ServerState} from "./state";
import {Button, Card, CircularProgress} from "@mui/material";
import {create_backup} from "../api";
import {default_ip} from "../utils/globals";
import {get_size} from "../utils/utils";

function Worlds(props: { server: ServerState }) {

    if (props.server.server == undefined) {
        return <CircularProgress/>
    }
    let server = props.server.server

    let backups = server.backups
    let worlds = server.worlds


    return <div>
        {
            worlds.map((world) => {
                return <Card>
                    <p>{world.name}</p>
                    <Button variant="contained" onClick={() => {
                        create_backup(server.sid, world.name)
                    }}>Create Backup</Button>
                    {
                        Object.entries(backups).map(([bid, backup]) => {
                        if (backup.world == world.name) {
                        return <div>
                        <p>{bid}</p>
                        <a href={default_ip + "/servers/backups/" + bid} target={"_blank"}><Button
                        variant={"contained"}>Download</Button></a>
                            <p>{get_size(backup.size)}</p>
                        </div>
                    }

                    })
                    }
                        </Card>
                    })
                    }
                </div>

            }

            export default Worlds
