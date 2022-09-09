import {Server} from "../models/Server";

export interface Player {
    name: string
    is_online: boolean
    is_op: boolean
    is_banned: boolean
}

export interface OpPlayer extends Player {
    op_level: number
}

export interface Players {
    online_players: Player[],
    op_players: OpPlayer[],
    banned_players: Player[]
}

export interface Metrics {
    cpu: { percent: number },
    memory: {
        total: number,
        used: number,
        server: number
    },
}


export interface ServerState {
    server?: Server
    properties?: { [key: string]: any }
    players?: Players
    metrics?: Metrics
    output?: string
}
