import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Breadcrumb, Button, Card, Carousel, Container} from "react-bootstrap";
import './index.css';
import axios from "axios";
import {URLs} from "../urls";
import {Link} from "react-router-dom";
import {useCart} from "../product/use-cart";

export const Category = () => {
    const {name} = useParams();
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    useEffect(() => {
        //getSubCategories();
        getCategoryProducts();
    }, [name])

    const getCategoryProducts = () => {
        axios.get(URLs.GET_CATEGORY_PRODUCTS_URL(name))
            .then(response => response.data)
            .then(categoryProducts => {
                setCategory(categoryProducts.category);
                setProducts(categoryProducts.products);
            })
    }

    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    <Card.Title>
                        <Breadcrumb className="nc-breadcrumb">
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                            <Breadcrumb.Item active>{category && category.name && category.name.toUpperCase()}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card.Title>
                </Card.Title>
                <ul className="product-list">
                    {
                        products && products.map(product => {
                            return (
                                <li key={product.id}>
                                    <Card  style={{ width: '18rem' }}>
                                        <Link to={'/product/'+product.id}>
                                            <Card.Img src={product.photos[0].fullUrl} alt={product.photos[0].photo}></Card.Img>
                                            <Card.Body>
                                                 <Card.Title>
                                                        {product.name} | {product.material}  {product.size ? '|' + product.size : ''}  {product.color ? '|'+product.color : ''}
                                                </Card.Title>
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </li>
                           )
                        })
                    }
                </ul>
            </Card.Body>
        </Card>
    )
}
;