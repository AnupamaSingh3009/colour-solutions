import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Header.css'
import {forwardRef, useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "../../urls";
import {Link} from "react-router-dom";
import {Badge, Button, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faGlobe, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "../../product/use-cart";
import {publish} from "../../event";

function Header(){
    const expand = 'md';
    const [menu, setMenu] = useState({});
    const {count} = useCart();

    useEffect(() => {

        axios.get(URLs.GET_MENU_URL)
            .then(response => response.data)
            .then(menu => setMenu(menu));

        window.sessionStorage.setItem('currency', window.sessionStorage.getItem('currency') || 'USD');
    }, []);

    const onSelectCurrency = (currency) => {
       window.sessionStorage.setItem('currency', currency);
       publish('currencyChanged', currency);
    }

    return (
        <Navbar key='md' bg="light" expand='md' className="ybg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src='/subtitle.jpeg' alt="Colour Solutions" height='45'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Colour Solutions
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 nc-link">
                  <Nav.Link as={Link} key='home' to="/">HOME</Nav.Link>
                  <NavDropdown title="SHOP" key='shop'>
                  {menu.categories && menu.categories.map(category => {
                        return (
                            <NavDropdown.Item key={category} as={Link} to={'/category/'+category}>{category.toUpperCase()}</NavDropdown.Item>
                        )
                  })}
                  </NavDropdown>
                  <Nav.Link as={Link}  to={'/about-us'}>ABOUT US</Nav.Link>
                  <Nav.Link as={Link}  to={'/contact-us'}>CONTACT US</Nav.Link>
                  <Nav.Link as={Link} to={'/view-cart'}>
                      <span className="nc-cart">
                          <span className="nc-cart-icon">
                              <FontAwesomeIcon icon={faCartShopping}/>
                          </span>
                          {count > 0 ?
                              <span className="badge">
                              <Badge bg="info">{count}</Badge>
                          </span>
                              :''
                          }
                      </span>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
       
    );
}

export default Header;