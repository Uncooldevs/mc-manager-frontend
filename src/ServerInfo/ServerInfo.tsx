import {Link, useParams} from "react-router-dom";
import SideTabBarWithBack, {TabEntry} from "../utils/SideTabs";
import Dashboard from "./Dashboard";
import {useEffect, useRef, useState} from "react";
import {get_server} from "../api";
import {Metrics, Players, ServerState} from "./state";
import ServerSettings from "./ServerSettings";
import {default_ip} from "../utils/globals";


function ServerInfo() {
    const {server_id} = useParams()
    const [current_server, setCurrentServer] = useState<ServerState>()
    const [error, setError] = useState<string>("")
    const ws = useRef<WebSocket>()


    function load_sever() {
        get_server(server_id as string).then((server) => {
            setCurrentServer((values)=>({...values, server: server}))
        }).catch((error) => {
            console.log(error)
            setError(error.toString())
        })

    }

    useEffect(() => {
        load_sever()
    }, [])

    useEffect(() => {
        if (current_server?.server === undefined) {
            return
        }

        ws.current = new WebSocket(`ws://${default_ip.replace("http://", "")}/servers/${current_server?.server.sid}/websocket`)

        ws.current.onmessage = (msg) => {
            const data: {type: string, output?: string, players?: Players, "metrics": Metrics} = JSON.parse(msg.data)

            if (data.type === "output") {
                setCurrentServer((values)=>({...values, output: values?.output + (data.output ?? "")}))
            }
            else if (data.type === "players") {
                setCurrentServer((values)=>({...values, players: data.players}))
            }
            else if (data.type === "metrics"){
                setCurrentServer((values)=>({...values, metrics: data.metrics}))
            }

        }

        ws.current.onopen = () => {
            console.log("Websocket opened")
            setCurrentServer((values)=>({...values, output: ""}))
        }

        ws.current.onerror = (err) => {
            console.log(err)
        }

        ws.current.onclose = () => {
            console.log("Websocket closed")

        }
        return () => {
            ws.current?.close()
        }

    }, [current_server?.server?.sid, current_server?.server?.status])


    if (error !== "") {
        return <div>
            <h1>Server not found</h1>
            <Link to={"/"}>Back</Link>
        </div>
    } else {
        return <SideTabBarWithBack tabs={[
            new TabEntry("Dashboard", <Dashboard server={current_server} update_state_func={setCurrentServer}/>),
            new TabEntry("Players", <h1>Players</h1>),
            new TabEntry("Settings", <ServerSettings/>)
        ]}/>
    }
}

export default ServerInfo
