import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Link from "@mui/material/Link"
import Homepage from "./Homepage/Homepage";
import CreateServerPage from "./CreateServer/CreateServerPage";
import ServerInfo from "./ServerInfo/ServerInfo";

const Layout = () => {
  return <div><div className="content">
      <Outlet/>
    </div>

  Github: <Link href="https://github.com/orgs/Uncooldevs/repositories">Repositories</Link>
  </div>
};

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Homepage/>}/>
              <Route path="create" element={<CreateServerPage/>}/>
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
