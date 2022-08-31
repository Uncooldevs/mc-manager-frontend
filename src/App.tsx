import React from 'react';
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";


const Layout = () => {

  return <div>
      <ul className="nav">
          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/create">Create Server</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/settings">Settings</Link>
          </li>
      </ul>
    <div className="content">
      <Outlet/>
    </div>

  </div>
};

function App() {

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<h1>Home</h1>}/>
              <Route path="create" element={<h1>create</h1>}/>
              <Route path="settings" element={<h1>settings</h1>}/>
              <Route path="server/:server_id" element={<h1>server</h1>}/>
              <Route path="*" element={<h1>404</h1>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
