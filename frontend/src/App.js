import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './COMPONENTES/LOGIN/Login';
import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";

import TabelaInscricoes from './COMPONENTES/FELIPE/TabelaInscricoes';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Login path='/cadastro' onLogin={handleLogin} />
      ) : (
        <>
          <ComponenteMenu path='/cadastros' isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />
          <Routes>
            <Route path="/inscricoes" element={<TabelaInscricoes isMenuExpanded={isMenuExpanded} />} />
          </Routes>
        </>
      )}
    </BrowserRouter>  
  );
}

export default App;
