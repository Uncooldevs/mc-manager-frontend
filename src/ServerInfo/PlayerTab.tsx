import {ServerState} from "./state";
import {CircularProgress} from "@mui/material";


function PlayerList(props: { server: ServerState | undefined }) {
    if (props.server === undefined || props.server.players?.online_players === undefined) {
        return <CircularProgress/>
    }

    return <div>
        <h1>Players</h1>
        {
            (props.server.players.online_players.length === 0)
                ? <p>No players online</p>
                : props.server.players.online_players.map((player) => {
                    return <div>
                        <p>{player.name}
                        </p></div>
                })

        }
    </div>

}

export default PlayerList
