import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../assets/soul-pet-logo.svg";
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light style={{backgroundColor: "#3b2712"}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'><img src={logo} height="70px" alt="SoulPet" /></MDBNavbarBrand>

        <MDBNavbarToggler
        style={{ color: '#a69e96' }}
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='ms-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <Link to='/dashboard' className='nav-link' onClick={() => setShowBasic(false)}>Dashboard</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/clientes' className='nav-link' onClick={() => setShowBasic(false)}>Clientes</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/pets' className='nav-link' onClick={() => setShowBasic(false)}>Pets</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/produtos' className='nav-link' onClick={() => setShowBasic(false)}>Produtos</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/pedidos' className='nav-link' onClick={() => setShowBasic(false)}>Pedidos</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/servicos' className='nav-link' onClick={() => setShowBasic(false)}>Serviços</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to='/agendamentos' className='nav-link' onClick={() => setShowBasic(false)}>Agendamentos</Link>
            </MDBNavbarItem>
          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
