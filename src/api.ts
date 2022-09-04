import {default_ip} from "./utils/globals";
import {BasicServer, Server} from "./models/Server";

export async function get_servers(): Promise<BasicServer[]>{
    const response = await fetch(default_ip + "/servers")
    if (response.status !== 200){
        throw new Error("Can't get servers")
    }
    const data: {"servers": BasicServer[]} = await response.json()
    return data.servers

}

export async function get_server(sid: string): Promise<Server>{
    const response = await fetch(default_ip + "/servers/" + sid)
    if(response.status === 404) {
        throw new Error("Server not found")
    }
    else if (response.status !== 200){
        throw new Error("An error occurred")
    }
    return await response.json()
}
