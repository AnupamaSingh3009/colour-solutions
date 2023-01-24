import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "../urls";
import {Breadcrumb, Button, Card, Carousel, Col, Container, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {publish, subscribe} from "../event";
import {useCart} from "./use-cart";
import './index.css';

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

    const getBreadCrumb = () => {
        if(product && product.category) {
            let current = product.category;
            const breadCrumbs = [];
            while(!!current) {
                breadCrumbs.push(
                    <Breadcrumb.Item key={current.id} linkAs={Link} linkProps={{to: '/category/'+current.name}}>
                    {current.name.toUpperCase()}
                    </Breadcrumb.Item>);
                current = current.parent;
            }
            return breadCrumbs.reverse();
        }
        return [];
    }


    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Breadcrumb className="nc-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                        {getBreadCrumb()}
                        <Breadcrumb.Item active>{product && product.name && product.name.toUpperCase()}</Breadcrumb.Item>
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
                            <Carousel activeIndex={index} onSelect={handleSelect} className="product_images">
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