import React, {useEffect, useState} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Link from "@mui/material/Link"
import Homepage from "./Homepage/Homepage";
import CreateServerPage from "./CreateServer/CreateServerPage";
import ServerInfo from "./ServerInfo/ServerInfo";
import * as api from "./api";

const Layout = () => {
    return <div>
        <div className="content">
            <Outlet/>
        </div>
        Github: <Link href="https://github.com/orgs/Uncooldevs/repositories">Repositories</Link>
    </div>
};

function App() {
    const [available_versions, set_available_versions] = useState<string[]>(["latest"])

    function load_available_versions() {
        api.get_available_versions().then((versions) => {
            set_available_versions(versions)
        }).catch((err) => {
            console.error(err)
        })
    }
    useEffect(()=>{
        load_available_versions()
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Homepage/>}/>
                        <Route path="create" element={<CreateServerPage available_versions={available_versions}/>}/>
                        <Route path="settings" element={<h1>settings</h1>}/>
                        <Route path="server/:server_id" element={<ServerInfo/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
