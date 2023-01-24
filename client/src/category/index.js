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
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        getSubCategories().then(categorySubCategories => {
            console.log(category);
            if(categorySubCategories.subcategories.length === 0) {
                getCategoryProducts();
            }
        });

        //getCategoryProducts();
    }, [name])

    const getSubCategories = () => {
        return axios.get(URLs.GET_SUB_CATEGORIES_BY_NAME_URL(name))
            .then(response => response.data)
            .then(categorySubCategories => {
                setCategory(categorySubCategories.category);
                setCategories(categorySubCategories.subcategories);
                return categorySubCategories;
            });
    }
    const getCategoryProducts = () => {
        axios.get(URLs.GET_CATEGORY_PRODUCTS_URL(name))
            .then(response => response.data)
            .then(categoryProducts => {
                setCategory(categoryProducts.category);
                setProducts(categoryProducts.products);
            });
    }

    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    <Card.Title>
                        <Breadcrumb className="nc-breadcrumb">
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                            {category && category.parent && <Breadcrumb.Item linkAs={Link} linkProps={{to: '/category/'+category.parent.name}}>{category.parent.name.toUpperCase()}</Breadcrumb.Item>}
                            <Breadcrumb.Item active>{category && category.name && category.name.toUpperCase()}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card.Title>
                </Card.Title>
                {category && category.description ? <p>{category.description}</p> : ''}
                {
                    categories && categories.length > 0 ?
                        <ul className="categories-list">
                            {
                                categories.map(category => {
                                   return (
                                       <li key={category.id}>
                                           <Card  style={{ width: '18rem' }}>
                                               <Link to={`/category/${category.name}`}>
                                               <Card.Img src={category.photo ? category.photo : '/no-photo.jpeg'} alt={category.name}></Card.Img>
                                               <Card.Body>
                                                   <Card.Title>{category.name}</Card.Title>
                                               </Card.Body>
                                               </Link>
                                           </Card>
                                       </li>
                                   );
                                })
                            }
                        </ul>
                        :
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
                }
            </Card.Body>
        </Card>
    )
}
;