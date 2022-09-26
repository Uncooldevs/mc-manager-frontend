import {default_ip} from "./utils/globals";
import {BasicServer, Server} from "./models/Server";

export async function get_servers(): Promise<BasicServer[]> {
    const response = await fetch(default_ip + "/servers")
    if (response.status !== 200) {
        throw new Error("Can't get servers")
    }
    const data: { "servers": BasicServer[] } = await response.json()
    return data.servers

}

export async function send_command(sid: string, command: string): Promise<void> {
    const response = await fetch(default_ip + "/servers/" + sid + "/command",
        {
            method: "POST", body: JSON.stringify({
                "command": command
            }),
            headers: {'Content-Type': 'application/json'}
        })

    if (response.status !== 200) {
        throw new Error("Sending command failed")
    }

}

export async function get_server(sid: string): Promise<Server> {
    const response = await fetch(default_ip + "/servers/" + sid)
    if (response.status === 404) {
        throw new Error("Server not found")
    } else if (response.status !== 200) {
        throw new Error("An error occurred")
    }
    return await response.json()
}

export async function start_server(sid: string): Promise<void> {
    const response = await fetch(default_ip + "/servers/" + sid + "/start", {method: "POST"})
    if (response.status !== 200) {
        throw new Error("Can't start server")
    }
}

export async function stop_server(sid: string): Promise<void> {
    const response = await fetch(default_ip + "/servers/" + sid + "/stop", {method: "POST"})
    if (response.status !== 200) {
        throw new Error("Can't stop server")
    }
}

export async function get_available_versions(): Promise<string[]> {
    const resp = await fetch(default_ip + "/available_versions")
    if (resp.status !== 200) {
        throw new Error("Cant fetch available versions")
    }

    return (await resp.json()).available_versions

}
