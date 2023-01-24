import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "../urls";
import {Breadcrumb, Button, Card, Carousel, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {publish, subscribe} from "../event";
import {useCart} from "./use-cart";


export function ProductDetail () {
    const {id} = useParams();
    const [index, setIndex] = useState(0);
    const [product, setProduct] = useState({});
    const currency = 'USD';
    const {updateCart} = useCart();

    useEffect(() => {
        axios.get(`${URLs.GET_PRODUCT_URL}/${id}`)
            .then(response => response.data)
            .then(product => setProduct(product));

    }, [id]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Breadcrumb className="nc-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                        {
                            product && product.category &&
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/category/'+product.category.name}}>
                                {product.category.name.toUpperCase()}
                            </Breadcrumb.Item>
                        }
                        <Breadcrumb.Item active>{product && product.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </Card.Title>
                <Container>
                    <Row>
                        <Col>
                            <h2>{product.name} | {product.material}  {product.size ? '|' + product.size : ''}  {product.color ? '|'+product.color : ''}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {product.photos && product.photos.map(photo => {
                                    return (
                                        <Carousel.Item key={photo.photo}>
                                            <img className="d-block w-100" src={photo.fullUrl} alt={photo.photo}/>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Col>
                        <Col>
                            <p dangerouslySetInnerHTML={{__html: product.description}}></p>
                            <p><strong>Stock: </strong>{product.quantity > 0 ?`Available in stocks(${product.quantity})`: `Not available`}</p>
                            <div>
                                <small>M.R.P(Inclusive all taxes)</small> {(product.price)}
                                &nbsp;{currency}
                            </div>
                            <br/>
                            <Button variant="success"
                                    onClick={() => updateCart({product, currency})}>Add to Cart</Button>
                        </Col>
                    </Row>
                </Container>

            </Card.Body>
        </Card>
    )
}