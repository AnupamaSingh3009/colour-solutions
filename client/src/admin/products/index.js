import {Card, Button, Table, Modal, Form, Alert, Col, Row, ButtonGroup, Tabs, Tab, Pagination} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faPencil,
    faTrash,
    faUpload,
    faPersonDress,
    faPerson,
    faGenderless
} from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState} from "react";
import axios from "axios";
import { URLs } from "../../urls";
import {ImageTab} from "./image-tab";
import {getAxiosError} from "../../utils";


export function AdminProducts() {
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState({});
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState('');
    const [pageError, setPageError] = useState('');
    const [gender, setGender] = useState('U');
    const [quantity, setQuantity] = useState(0);
    //Images
    const [images, setImages] = useState([]);
    const [uploadModalShow, setUploadModalShow] = useState(false);
    const numberOfImageInputPerModal = 5;
    const [deleteShow, setDeleteShow] = useState(false);

    useEffect(() => {
        axios.get(URLs.GET_CATEGORY_URL)
        .then(response => response.data)
        .then(categories => setCategories(categories));

        getProductList();

    }, [])

    const pageErrorHandler = (error) => {
        const axiosPageError = getAxiosError(error);
        setPageError(axiosPageError.message || '')
    }

    const getProductList = () => {
        axios.get(URLs.GET_PRODUCT_URL, {params: {page,pageSize}})
            .then(response => response.data)
            .then(pagination => {
                setProducts([...pagination.content]);
                setTotalCount(pagination.count);
                setPage(pagination.page);
                setPageSize(pagination.size);
            });
    }

    const getProductById = (id) => {
        return axios.get(`${URLs.GET_PRODUCT_URL}/${id}`)
            .then(response => response.data);
    }

    const onChangeName = (event) => setName(event.target.value);
    const onChangeDescription = (event) => setDescription(event);
    const onChangePrice = (event) => setPrice(+event.target.value);
    const onChangeCategory = (event) => {
        const categoryId = event.target.value;
        const category = categories.find(category => category.id === categoryId) || {};
        setCategory(category);
    }
    const onChangeSize = (event) => setSize(event.target.value);
    const onChangeColor = (event) => setColor(event.target.value);
    const onChangeMaterial = (event) => setMaterial(event.target.value);

    const onChangeGender = (event) => setGender(event.target.value);

    const onChangeQuantity = (event) => setQuantity(event.target.value);
    const handleShow = () => {
        reset();
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        reset();
    };

    const handleUploadModal = (id) => {
        getProductById(id).then(product => {
            setSelectedProduct(product);
            setUploadModalShow(true);
        }).catch(error => pageErrorHandler(error));
    }

    const handleUploadModalClose = () => {
        setImages([]);
        setUploadModalShow(false);
        setSelectedProduct({});
    }

    const handleUploadImages = (event) => {
        setImages(images.concat([...event.target.files]));
    }
    const reset = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setSize('');
        setMaterial('');
        setColor('');
        setCategory({});
        setShow(false);
        setError('');
        setSelectedProduct({});
        setGender('U');
        setQuantity(0);
    }

    const handleEditProduct = (id) => {
        getProductById(id)
            .then(product => {
                setSelectedProduct(product);
                setCategory(product.category);
                setColor(product.color);
                setMaterial(product.material);
                setSize(product.size);
                setPrice(product.price);
                setDescription(product.description);
                setName(product.name);
                setShow(true);
                setGender(product.gender);
                setQuantity(product.quantity);
            }).catch(error => pageErrorHandler(error))
    }

    const handleShowConfirmModal = (id) => {
       getProductById(id)
            .then(product => {
                setSelectedProduct(product);
                setDeleteShow(true);
            }).catch(error => pageErrorHandler(error));
    }
    const handleDeleteModalClose = () => {
        selectedProduct({});
        setDeleteShow(false);
    }

    const handleProductSubmit = () => {
        if(!name) {
            setError('Please enter the product name');
            return;
        }
        if(!category) {
            setError('Please select the category');
            return;
        }

        if(!price && price <= 0) {
            setError('Please enter the price of product');
            return;
        }

        if(!description) {
            setError('Please enter the product description');
            return;
        }


        const payload = {
            name,
            description,
            category,
            size,
            material,
            color,
            price,
            gender,
            quantity
        }
        let promise$;
        if(selectedProduct && selectedProduct.id) {
            payload.id = selectedProduct.id;
            promise$ = axios.put(`${URLs.UPDATE_PRODUCT_URL}/${selectedProduct.id}`, payload);
        } else {
            promise$ = axios.post(URLs.CREATE_PRODUCT_URL, payload);
        }

        promise$.then(() => {
            getProductList();
            reset();
        }).catch(error => pageErrorHandler(error));
    }

    const handleProductImages = () => {
        const formData  = new FormData();
        images.forEach(image => {
            formData.append("images", image)
        });
        axios.post(URLs.UPLOAD_PRODUCT_IMAGE_URL(selectedProduct.id), formData, {
            headers: {
                'Content-type': 'multipart/form-data"'
            }
        })
            .then(() => {
                setUploadModalShow(false);
                setImages([]);
            }).catch(error => pageErrorHandler(error));
    }

    const handleDeleteProduct = () => {
        if(selectedProduct && selectedProduct.id) {
            axios.delete(URLs.DELETE_PRODUCT_URL(selectedProduct.id))
                .then(response => response.data)
                .then(deleted => {
                    setSelectedProduct({});
                    setDeleteShow(false);
                    reset();
                    getProductList();
                }).catch(error => pageErrorHandler(error));
        }
    }

    const deleteProductImages = () => {
        setShow(false);
        setImages([]);
        reset();
    }
    const getCategoryOptions = () => {
        return categories.map(cat => {
            return (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            )
        });
    }

    const getProductsMap = () => {
        return products.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>{product.category && product.category.name}</td>
                    <td>{product.size}</td>
                    <td>{product.material}</td>
                    <td>{product.color}</td>
                    <td>{product.gender && product.gender === 'M' ? 'Male' : product.gender === 'F' ? 'Female' : 'Unisex'}</td>
                    <td>{product.quantity}</td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button variant="primary" onClick={handleEditProduct.bind(null,product.id)} title="Edit Product Detail">
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                            <Button variant="primary" onClick={handleUploadModal.bind(null, product.id)} title="Upload Product Images">
                                <FontAwesomeIcon icon={faUpload} />
                            </Button>
                            <Button variant="danger" title="Delete Product" onClick={handleShowConfirmModal.bind(null, product.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        });
    }

    const getImageInputs = () => {
        const result = [];
         for (let i = 0; i < numberOfImageInputPerModal; i++) {
            result.push((
                <Row className='mt' key={i}>
                    <Col md="12">
                        <Form.Control type="file" onChange={handleUploadImages.bind(null)}/>
                    </Col>
                </Row>
            ));
        }
        return result;
    }

    const paginationItems = [];
    const numOfPages = Math.ceil(totalCount / pageSize);
    for(let p = 1; p <= numOfPages; p++) {
        paginationItems.push(<Pagination.Item key={p} active={p === +page}>{p}</Pagination.Item>)
    }
    return (
        <>
            <Card className="mt">
                <Card.Header><h2>Products</h2></Card.Header>
                <Card.Body>
                    {!!pageError && <Alert key="danger" variant='danger' dismissible onClose={() => reset()}>
                        <Alert.Heading>Oh! You got an error!</Alert.Heading>
                        <p>{pageError}</p>
                    </Alert>
                    }
                    <Button variant="primary" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} /> Create Product
                    </Button>
                    
                    <Table striped bordered hover className="mt">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price(USD)</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Material</th>
                            <th>Color</th>
                            <th>Gender</th>
                            <th>Quantity</th>
                            <th className="wd-64">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getProductsMap()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={8} >
                                <Pagination style={{justifyContent: 'end'}}>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    {paginationItems}
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                </Card.Body>
            </Card>

            {/* Create and Edit Product */}
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.id ? 'Edit' : 'Create'} Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="info" className="mb-3">
                        <Tab eventKey="info" title="Info">
                            {error &&
                                <Alert key='danger' variant='danger'>
                                    {error}
                                </Alert>
                            }
                            <Form>
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            value={name}
                                            onChange={onChangeName}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Gender</Form.Label>
                                        <div key="inline-radio">
                                            <Form.Check
                                                inline
                                                label="M"
                                                type="radio"
                                                name="gender"
                                                value="M"
                                                onChange={onChangeGender}
                                                checked={gender === 'M'}
                                            />
                                            <Form.Check
                                                inline
                                                label="F"
                                                type="radio"
                                                name="gender"
                                                value='F'
                                                onChange={onChangeGender}
                                                checked={gender === 'F'}
                                            />
                                            <Form.Check
                                                inline
                                                label="U"
                                                type="radio"
                                                name="gender"
                                                value='U'
                                                onChange={onChangeGender}
                                                checked={gender === 'U'}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select required defaultValue={category ? category.id: ''} onChange={onChangeCategory} >
                                            <option >Select Category</option>
                                            {getCategoryOptions()}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            value={quantity}
                                            onChange={onChangeQuantity}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Price(<small>USD</small>)</Form.Label>
                                        <Form.Control
                                            required
                                            type='number'
                                            value={price}
                                            onChange={onChangePrice}
                                        />
                                    </Col>

                                </Row>

                                <Row className="align-items-center">
                                    <Col xs="4">
                                        <Form.Label>Size</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            value={size}
                                            onChange={onChangeSize}
                                        />
                                    </Col>
                                    <Col xs="4">
                                        <Form.Label>Material</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            value={material}
                                            onChange={onChangeMaterial}
                                        />
                                    </Col>
                                    <Col xs="4">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            value={color}
                                            onChange={onChangeColor}
                                        />
                                    </Col>

                                </Row>
                                <Row>

                                </Row>
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <Form.Label>Description</Form.Label>
                                        <ReactQuill
                                            required
                                            theme="snow"
                                            value={description}
                                            onChange={onChangeDescription} />
                                    </Col>
                                </Row>
                            </Form>
                        </Tab>
                        { selectedProduct && selectedProduct.id ?
                            <Tab eventKey="photos" title="Photos">
                                <ImageTab photos={selectedProduct.photos} product={selectedProduct.id} deletePhotoCallback={deleteProductImages.bind(null)}/>
                            </Tab>
                            :
                            ''
                        }
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProductSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Image Upload Modal*/}
            <Modal  show={uploadModalShow} onHide={handleUploadModalClose} size="lg">
                <Modal.Header><h2>Upload Images - {selectedProduct && selectedProduct.name ? selectedProduct.name : ''}</h2></Modal.Header>
                <Modal.Body>
                    <Form>
                        {getImageInputs()}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUploadModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProductImages}>
                        Save Images
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirm Dialog */}
            <Modal show={deleteShow} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cofirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete <strong>{selectedProduct && selectedProduct.name? selectedProduct.name : ''}</strong>? </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
