
export enum ServerStatus{
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    STARTING = "STARTING",
    STOPPING = "STOPPING",
    INSTALLING = "INSTALLING",
    NOT_INSTALLED = "NOT_INSTALLED"
}



export interface BasicServer{
    name: string
    icon?: string
    version: string
    status: ServerStatus
    sid: string
}

export interface Server{
    name: string
    version: string
    status: ServerStatus
    sid: string
    properties: {}
    worlds: World[]
    backups: { [key: string]: Backup }
}

export interface World{
    name: string,
    path: string,
    version: string
}

export interface Backup {
    sid: string
    time: string
    world: string
    version: string
    path: string
    size: number
}


