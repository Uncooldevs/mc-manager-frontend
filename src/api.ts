import {default_ip} from "./utils/globals";
import {BasicServer} from "./models/Server";

export async function get_servers(): Promise<BasicServer[]>{
    const response = await fetch(default_ip + "/servers")
    if (response.status !== 200){
        throw new Error("Can't get servers")
    }
    const data: {"servers": BasicServer[]} = await response.json()
    return data.servers

}
