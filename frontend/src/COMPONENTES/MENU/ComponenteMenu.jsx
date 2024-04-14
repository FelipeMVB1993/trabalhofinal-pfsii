import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ComponenteMenu.css';


function ComponenteMenu({ isMenuExpanded, setMenuExpanded }) {
  const [itemSelecionado, setItemSelecionado] = useState("/cadastro");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Cadastros", path: "/cadastro", iconClass: "bi bi-card-list" },
    { name: "Inscrições", path: "/inscricoes", iconClass: "bi bi-person-badge-fill" },

    { name: "Voltar", path: "/cadastro", iconClass: "fas fa-arrow-left" }
  ];

  const handleMenuItemClick = (path) => {
    if (path !== "Voltar") {
      setItemSelecionado(path);
    } else {
      // Navigate to the login page when "Voltar" is clicked
      navigate('/login');
    }
  };

  return (
    <div>
      <nav
        className={`sidebar ${isMenuExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setMenuExpanded(true)}
        onMouseLeave={() => setMenuExpanded(false)}
      >
        <div className="logo"></div>
        <ul className="menu">
          {menuItems.map(item => (
            <li
              key={item.path}
              className={itemSelecionado === item.path ? 'highlighted' : ''}
              onClick={() => handleMenuItemClick(item.path)}
            >
              <NavLink to={item.path}>
                <i className={item.iconClass}></i>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div id='cabecalho' className={isMenuExpanded ? 'expanded' : ''}>
        <div className="main--content">
          <div className="header--wrapper">
            <div className="header--title">
              <h3 id='texto'> Sistema de Gerenciamento de Vagas - SGV </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponenteMenu;
