import {Link, useParams} from "react-router-dom";
import SideTabBarWithBack, {TabEntry} from "../utils/SideTabs";
import Dashboard from "./Dashboard";
import {useEffect, useRef, useState} from "react";
import * as api from "../api";
import {Players, ServerState} from "./state";
import ServerSettings from "./ServerSettings";
import {default_ip} from "../utils/globals";
import {Server} from "../models/Server";
import PlayerList from "./PlayerTab";
import Worlds from "./Worlds";


function ServerInfo() {
    const {server_id} = useParams()
    const [current_server, setCurrentServer] = useState<ServerState>({
        output: "",
        properties: {},
        server: undefined, players: undefined, metrics: undefined})
    const [error, setError] = useState<string>("")
    const ws = useRef<WebSocket>()


    function load_sever() {
        api.get_server(server_id as string).then((server) => {
            setCurrentServer((values) => ({...values, server: server, properties: server.properties}))
        }).catch((error) => {
            console.log(error)
            setError(error.toString())
        })
    }

    function scrollToBottom() {
        const text_area = document.getElementById("ta_console")
        if (text_area != null)
            text_area.scrollTop = text_area.scrollHeight
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
            const data: { type: string, value: any } = JSON.parse(msg.data)

            if (data.type === "output") {
                setCurrentServer((values) => ({...values, output: values?.output + (data.value ?? "") + "\n"}))
                scrollToBottom()
            } else if (data.type === "players") {
                setCurrentServer((values) => ({...values, players: data.value}))
            } else if (data.type === "system_metrics") {
                setCurrentServer((values) => ({...values, metrics: data.value}))
            } else if (data.type === "status") {
                const server: Server | undefined = current_server.server
                if (server === undefined) {
                    return
                }
                server.status = data.value
                setCurrentServer((values) => ({...values, server: server}))

            }
            else if (data.type === "properties") {
                setCurrentServer((values) => ({...values, properties: data.value}))
            }

        }

        ws.current.onopen = () => {
            console.log("Websocket opened")
            setCurrentServer((values) => ({...values, output: ""}))
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

    }, [current_server?.server?.sid])


    if (error !== "") {
        return <div>
            <h1>Server not found</h1>
            <Link to={"/"}>Back</Link>
        </div>
    } else {
        return <SideTabBarWithBack tabs={[
            new TabEntry("Dashboard", <Dashboard server={current_server} update_state_func={setCurrentServer}/>),
            new TabEntry("Players", <PlayerList server={current_server}/>),
            new TabEntry("Settings", <ServerSettings server={current_server}/>),
            new TabEntry("Worlds", <Worlds server={current_server}/>)
        ]}/>
    }
}

export default ServerInfo
