import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';


function CustomSideBarAdmin() {
  return (
    <div>
      <div className="admin-side-bar-container">
        <Header as="h1" color="orange" className="title" content="TryBeer" style={{ marginTop: 20 }}>
          {/* <h1>TryBeer</h1> */}
        </Header>
        <div className="menu-container">
          <div className="side-menu">
            <Link
              to="/admin/orders"
              className="item-menu"
              data-testid="side-menu-item-orders"
            >
              Pedidos
            </Link>
            <Link
              to="/admin/profile"
              className="item-menu"
              data-testid="side-menu-item-profile"
            >
              Perfil
            </Link>
          </div>
          <div className="side-exit">
            <Link
              to="/login"
              className="item-menu"
              data-testid="side-menu-item-logout"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSideBarAdmin;
