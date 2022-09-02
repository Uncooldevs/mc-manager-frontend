import {BasicServer} from "../models/Server";


function ServerItem(props: {server: BasicServer}){
    return <div>
        {props.server.name}, {props.server.status}, {props.server.version}
    </div>
}

export default ServerItem
