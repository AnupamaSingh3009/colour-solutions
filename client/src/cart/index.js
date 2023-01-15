import {Breadcrumb, Button, Card, Col, Container, Row, Table, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useCart} from "../product/use-cart";
import {subscribe} from "../event";
import axios from "axios";
import {URLs} from "../urls";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

export const ViewCart = (props) => {
    const [count, setCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const {updateCart} = useCart();
    const currency = 'INR';
    useEffect( () => {
        setCartItems(JSON.parse(window.localStorage.getItem('cart')) || []);
        setCount(cartItems.length);
    }, []);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, cartItem) => {
            return total + (cartItem.product.price * cartItem.quantity)
        }, 0);
    });

    const handleQuantity = (cartItem, incrOrDec) => {
        cartItem.quantity+=incrOrDec;
        //cartItem.quantity = parseInt(event.target.value);
        updateCart(cartItem);
        setCartItems(JSON.parse(window.localStorage.getItem('cart')) || []);
    }

    const removeItem = (cartItem) => {
        cartItem.quantity = 0;
        updateCart(cartItem);
        setCartItems(JSON.parse(window.localStorage.getItem('cart')) || []);
    }

    const handleProceedToCheckout = () => {

    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Breadcrumb className="nc-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                        <Breadcrumb.Item active>VIEW CART</Breadcrumb.Item>
                    </Breadcrumb>
                </Card.Title>
                <h2 className="border-bottom border-2 p-3">SHOPPING BAG ({count} ITEMS)</h2>
               <Container>
                   <Row>
                       <Col xs={8}>
                           {
                               cartItems.map( ({product, quantity}) => {
                                   return (
                                       <Row key={product.id} className="border-bottom border-1 p-2">
                                           <Col xs={4}>
                                               {product && product.photos && product.photos.length > 0 ?
                                                   <img src={product.photos[0].fullUrl} alt={product.photos[0].photo}  width={200}/>
                                                   : ''
                                               }
                                           </Col>
                                           <Col>
                                               <h3>{product.name}</h3>
                                               <Container>
                                                   <Row>
                                                       <Col>
                                                           <strong>Price</strong>
                                                       </Col>
                                                       <Col>
                                                           <strong>Quantity</strong>
                                                       </Col>
                                                   </Row>
                                                   <Row>
                                                       <Col>
                                                           {(product.price ).toFixed(2)} {currency}
                                                       </Col>
                                                       <Col>
                                                           <InputGroup style={{width: '100px'}}>
                                                               <Button variant="secondary" size="sm" onClick={() => handleQuantity({product, quantity}, 1)}>
                                                                   <FontAwesomeIcon icon={faPlus}/>
                                                               </Button>
                                                               <Form.Control className="text-center" type="text"
                                                                             size='sm'
                                                                             value={quantity}
                                                                             readOnly={true}
                                                                             />
                                                               <Button variant="secondary" size="sm" onClick={(event) => handleQuantity( {product, quantity}, -1)}>
                                                                   <FontAwesomeIcon icon={faMinus}/>
                                                               </Button>
                                                           </InputGroup>
                                                       </Col>
                                                   </Row>
                                               </Container>
                                               <Button size="sm" variant="danger" onClick={() => removeItem({product, quantity})}>
                                                   Remove
                                               </Button>
                                           </Col>
                                       </Row>
                                   )
                               })
                           }
                       </Col>
                       <Col>
                           { totalPrice > 0 &&
                           <Card>
                               <Card.Header>
                                   <h3>Order Summary</h3>
                               </Card.Header>
                               <Card.Body>

                                   <Container>
                                       <Row className="pb-4">
                                           <Col>
                                               <strong>Item Subtotal:</strong>
                                           </Col>
                                           <Col xs={4}>
                                               {(totalPrice).toFixed(2)}&nbsp;{currency}
                                           </Col>
                                       </Row>
                                       <Row className="pb-4">
                                           <Col>
                                               <strong>Shipping Charges:</strong>
                                           </Col>
                                           <Col xs={4}>
                                                Free
                                           </Col>
                                       </Row>
                                       <Row className="pb-4">
                                           <Col>
                                               <strong>Taxes:</strong>
                                           </Col>
                                           <Col xs={4}>
                                               0 &nbsp;{currency}
                                           </Col>
                                       </Row>
                                       <Row className="pb-2 pt-2 border-top border-2">
                                           <Col>
                                               <strong>Estimated Total:</strong>
                                           </Col>
                                           <Col xs={4}>
                                               {(totalPrice ).toFixed(2)}&nbsp;{currency}
                                           </Col>
                                       </Row>
                                       <Row className="pt-2 pb-2">
                                           <Col className="text-center">
                                               <Button variant="warning" as={Link} to="/order">
                                                   PROCEED TO CHECKOUT
                                               </Button>
                                           </Col>
                                       </Row>
                                   </Container>

                               </Card.Body>
                           </Card>
                           }
                       </Col>
                   </Row>
               </Container>
            </Card.Body>
        </Card>
    )
}