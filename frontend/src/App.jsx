import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes.constants.js';
import './App.css'

import MainLayout from './layout/MainLayout.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';

function App() {

  return (
    <Routes>
      <Route path={ROUTES.LOGIN.path} element={<Login />} />
      <Route path={ROUTES.REGISTER.path} element={<Register />} />

        <Route path={ROUTES.HOME.path} element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path={ROUTES.SETTINGS.path} element={<p>Settings</p>} />
        </Route>
    </Routes>

  );
};

export default App
