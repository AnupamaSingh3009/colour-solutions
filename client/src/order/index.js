import {Accordion, Breadcrumb, Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import './index.css';

const orderInfo = {
    name: '',
    company: '',
    email: '',
    contactNo: '',
    address: '',
    city: '',
    state: '',
    country: ''
}
export const ViewOrder = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderBy, setOrderBy] = useState({...orderInfo});
    const [shipTo, setShipTo] = useState({...orderInfo});

    const currency = 'INR';
    useEffect( () => {
        setCartItems(JSON.parse(window.localStorage.getItem('cart')) || []);
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Card.Title>
                        <Breadcrumb className="nc-breadcrumb">
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                            <Breadcrumb.Item active>ORDER</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card.Title>
                   <Container>
                       <Row>
                           <Col>
                               <Card>
                                   <Card.Header><h3>Items</h3></Card.Header>
                                   <Card.Body>
                                       <Container className="order-items">
                                           <Row className="border-bottom border-1 p-2">
                                               <Col></Col>
                                               <Col>
                                                   <strong>Name</strong>
                                               </Col>
                                               <Col>
                                                   <strong>Price</strong>
                                               </Col>
                                               <Col>
                                                   <strong>Quantity</strong>
                                               </Col>
                                           </Row>
                                           {
                                               cartItems.map( ({product, quantity}) => {
                                                   return (

                                                       <Row key={product.id} className="border-bottom border-1 p-2">
                                                           <Col>
                                                               {product && product.photos && product.photos.length > 0 ?
                                                                   <img src={product.photos[0].fullUrl} alt={product.photos[0].photo}  width={50}/>
                                                                   : ''
                                                               }
                                                           </Col>
                                                           <Col>
                                                               {product.name}
                                                           </Col>
                                                           <Col>
                                                               {(product.price )} {currency}
                                                           </Col>
                                                           <Col>
                                                               {quantity}
                                                           </Col>
                                                       </Row>
                                                   );
                                               })
                                           }
                                       </Container>
                                   </Card.Body>
                               </Card>
                           </Col>
                           <Col>
                               <Card>
                                   <Card.Header><h3>Order By:</h3></Card.Header>
                                   <Card.Body>
                                       <Form className="order-form">
                                           <Form.Group as={Row}>
                                               <Form.Label column sm={3}>Name</Form.Label>
                                               <Col sm={9}><Form.Control type="text" value={orderBy.name}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Company</Form.Label>
                                               <Col sm={9}><Form.Control type="text" value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Email</Form.Label>
                                               <Col sm={9}><Form.Control type="email"  value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Contact No.</Form.Label>
                                               <Col sm={9}><Form.Control type="text"  value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Address</Form.Label>
                                               <Col sm={9}><Form.Control as="textarea" rows={3}  value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>City</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"  value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>State</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"  value={orderBy.company}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Country</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"  value={orderBy.company}/></Col>
                                           </Form.Group>
                                       </Form>
                                   </Card.Body>
                               </Card>
                           </Col>
                           <Col>
                               <Card>
                                   <Card.Header><h3>Ship To:</h3></Card.Header>
                                   <Card.Body>
                                       <Form className="order-form">
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Name</Form.Label>
                                               <Col sm={9}><Form.Control type="text"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Company</Form.Label>
                                               <Col sm={9}><Form.Control type="text"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Email</Form.Label>
                                               <Col sm={9}><Form.Control type="email"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Contact No.</Form.Label>
                                               <Col sm={9}><Form.Control type="text"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Address</Form.Label>
                                               <Col sm={9}><Form.Control as="textarea" rows={3}/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>City</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>State</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"/></Col>
                                           </Form.Group>
                                           <Form.Group as={Row} className="pt-2">
                                               <Form.Label column sm={3}>Country</Form.Label>
                                               <Col sm={9}> <Form.Control  type="text"/></Col>
                                           </Form.Group>
                                       </Form>
                                   </Card.Body>
                               </Card>
                           </Col>
                       </Row>
                       <Row className="pt-2">
                           <Col>

                           </Col>
                       </Row>
                       <Row className="pt-2 pb-2">
                           <Col className="text-center">
                               <Button variant="primary">
                                   Place Order
                               </Button>
                           </Col>
                       </Row>
                   </Container>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}