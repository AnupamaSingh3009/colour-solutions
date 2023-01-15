import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import './index.css';

export function HeaderAndFooter({children}) {
    const location = useLocation();

    const {pathname} = location;

    const isActive = (path) => {
        return pathname.indexOf(path) !== -1 ? 'active' : ''
    }

    return (
        <React.Fragment>
            
            <Navbar bg="light" expand="lg" className='ybg'>
                <Container>
                    <Navbar.Brand href="#home">
                      <img src='../subtitle.jpeg' alt="subtitle" width="40%"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nc-link" >
                        <Nav.Link as={Link} to="/admin/category" className={isActive('/admin/category')}>Category</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products" className={isActive('/admin/products')}>Products</Nav.Link>
                        <Nav.Link as={Link} to="/admin/page" className={isActive('/admin/page')}>Pages</Nav.Link>
                        <Nav.Link as={Link} to="/admin/orders" className={isActive('/admin/orders')}>Orders</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                {children}
            </Container>
            <Navbar fixed="bottom">
                <Navbar.Brand>&copy; Copyright - 2023</Navbar.Brand>
            </Navbar>
        </React.Fragment>
    )
}