import { Card, Table, Modal, Button, Form, ButtonGroup, Alert } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faPencil, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "../../urls";
import './index.css';
import { getAxiosError } from "../../utils";

function AdminCategory() {
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryParent, setCategoryParent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        let mounted = true;
        getCategories().then(data => {
            if(mounted) {
                setCategories(data);
            }
        })
        return () => mounted = false;
    }, []);

    const getCategories = () => {
        return axios.get(URLs.GET_CATEGORY_URL)
        .then(response => response.data);
    }

    const reset = () => {
        setShow(false);
        setCategoryName('');
        setCategoryDescription('');
        setError('');
        setSelectedCategory({});
        setDeleteShow(false);
        setCategoryParent({});
    }

    const onChangeCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    const onChangeCategoryDescription = (event) => {
        setCategoryDescription(event.target.value);
    }

    const onChangeCategoryParent = (event) => {
        setCategoryParent(event.target.value);
    }

    const handleClose = () => {
        reset();
    }

    const handleShow = () => {
        reset();
        setShow(true);
    }

    const handleCreateCategory = (event) => {
        if(!categoryName) {
            setError('Please enter name');
            return;
        }
        const categoryPayload = {
            name: categoryName,
            description: categoryDescription,
            parent: categoryParent
        };
        let promise$;
        if(!!selectedCategory && !!selectedCategory.id) {
            categoryPayload.id = selectedCategory.id;
            promise$ = axios.put(`${URLs.UPDATE_CATEGORY_URL}/${selectedCategory.id}`, categoryPayload);
        } else {
            promise$ = axios.post(URLs.CREATE_CATEGORY_URL, categoryPayload);
        }
        promise$.then( () => {
            getCategories().then(categories => {
                setCategories(categories);
                reset();
            }).catch(error => {
                const err = getAxiosError(error);
                setError(err.message || '');
            })
        }).catch(error => {
            const err = getAxiosError(error);
            setError(err.message || '');
        });
    }

    const handleShowConfirmModal = (id) => {
        axios.get(`${URLs.GET_CATEGORY_URL}/${id}`)
        .then((response) => response.data)
        .then(category => {
            setSelectedCategory(category);
            setCategoryName(category.name);
            setCategoryDescription(category.description);
            setDeleteShow(true);
        });
    }

    const handleEditCategory = (id) => {
        axios.get(`${URLs.GET_CATEGORY_URL}/${id}`)
        .then((response) => response.data)
        .then(category => {
            setSelectedCategory(category);
            setCategoryName(category.name);
            setCategoryDescription(category.description);
            setCategoryParent(category.parent);
            setShow(true);
        });
    }

    const handleDeleteCategory = () => {
        if(!!selectedCategory && !!selectedCategory.id) {
            axios.delete(`${URLs.DELETE_CATEGORY_URL}/${selectedCategory.id}`).then((deleted) => {
                if(deleted) {
                    getCategories().then(categories => {
                        setCategories(categories);
                        reset();
                        setDeleteShow(false);
                        setSelectedCategory({});
                    }).catch(error => {
                        const err = getAxiosError(error);
                        setError(err.message || '');
                    });
                }
            })
        }
    }

    const handleDeleteModalClose = () => {
        setSelectedCategory({});
        setDeleteShow(false);
    }

    const getCategoriesMap = () => {
        return categories.map( (category) => 
        (
            <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.parent && category.parent.name}</td>
                <td className="wd-64">
                    <ButtonGroup size="sm">
                        <Button variant="primary" onClick={handleEditCategory.bind(null,category.id)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button variant="danger" onClick={handleShowConfirmModal.bind(null, category.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        ));
    }

    return (
       <> 
       <Card className="mt">
        <Card.Header><h2>Category</h2></Card.Header>
        <Card.Body>
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Create Category
            </Button>
            <Table striped bordered hover className="mt">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Parent</th>
                        <th className="wd-64">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getCategoriesMap()}
                </tbody>
            </Table>
        </Card.Body>
       </Card>
       {/* Delete Confirm Dialog */} 
       <Modal show={deleteShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cofirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete <strong>{categoryName? categoryName : ''}</strong>? </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleDeleteCategory}>
                Delete
            </Button>
        </Modal.Footer>
       </Modal>

       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory && selectedCategory.id ? 'Edit' : 'Create'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error && 
                <Alert key='danger' variant='danger'>
                    {error}
                </Alert>
            }
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type='text' 
                        value={categoryName}
                        onChange={onChangeCategoryName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Parent</Form.Label>
                    <Form.Select defaultValue={categoryParent && categoryParent.id} onChange={onChangeCategoryParent}>
                        <option>Select Parent Category</option>
                        {categories && categories.map(category => {
                            return <option key={category.id} value={category.id}> {category.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as='textarea' 
                        rows={3}
                        value={categoryDescription}
                        onChange={onChangeCategoryDescription}
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleCreateCategory}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AdminCategory;