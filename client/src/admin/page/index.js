import {useEffect, useState} from 'react';
import {Card, Form, Table, Button, Modal, Alert, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios, { isAxiosError } from 'axios';
import { URLs } from '../../urls';
import { getAxiosError } from "../../utils";

export function AdminPage() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [show, setShow] = useState('');
    const [error, setError] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
    const [pages, setPages] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    useEffect(() => {
        getPages().then(pages => {setPages(pages)})
    }, []);

    const getPages = () => {
        return axios.get(URLs.GET_PAGES_URL)
        .then(response => response.data);
    }

    const getPageById = (id) => {
        return axios.get(`${URLs.GET_PAGES_URL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            const err = getAxiosError(error);
            setError(err.message || '');
        });
    }

    const reset = () => {
        setConfirmDialog(false);
        setShow(false);
        setSelectedPage({});
        setTitle('');
        setContent('');
    }
    
    const handleShowConfirmModal = (id) => {
        getPageById(id)
        .then(page => {
            setSelectedPage(page);
            setTitle(page.title);
            setContent(page.content);
            setConfirmDialog(true);
        })
    }

    const handleEditPage = (id) => {
        getPageById(id)
        .then(page => {
            setSelectedPage(page);
            setTitle(page.title);
            setContent(page.content);
            setShow(true);
        });
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeContent = (event) => {
        setContent(event);
    }

    const handleShow = () => {
        reset();
        setShow(true);
    }
    const handleClose = () => {
        reset();
        setShow(false); 
    }
    const handlePage = () => {
        if(!title) {
            setError('Please enter the title');
            return;
        }
        if(!content) {
            setError('Please enter the content');
            return;
        }
        let pagePayload = {
            title,
            content
        };
        let promise$;
        if(!!selectedPage && !!selectedPage.id) {
            pagePayload.id = selectedPage.id;
            promise$ = axios.put(`${URLs.UPDATE_PAGES_URL}/${selectedPage.id}`, pagePayload);
        } else {
            promise$ = axios.post(URLs.CREATE_PAGES_URL, pagePayload);
        }

        promise$.then(response => {
            getPages().then(pages => setPages(pages));
            reset();
        }).catch(error => {
            const err = isAxiosError(error);
            setError(err.message || '');
        });
    }

    const handleDeletePage = () => {
        if(selectedPage && selectedPage.id) {
            axios.delete(`${URLs.DELETE_PAGES_URL}/${selectedPage.id}`).then((response) => {
                getPages().then(pages => setPages(pages));
                reset();
            }).catch(error => {
                const err = getAxiosError(error);
                setError(err.message || '');
            });
        }
    }

    function handleDeleteModalClose() {
        reset();
        setConfirmDialog(false);
    }

    const getPageMap = () => {
        return pages.map( page => {
            return (
                <tr key={page.id}>
                    <td>{page.title}</td>
                    <td dangerouslySetInnerHTML={{__html: page.content}} ></td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button variant="primary" onClick={handleEditPage.bind(null,page.id)}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                            <Button variant="danger" onClick={handleShowConfirmModal.bind(null, page.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }


    return (
        <>
            <Card className="mt">
                <Card.Header><h2>Page</h2></Card.Header>
                <Card.Body>
                <Button variant="primary" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} /> Create Page
                </Button>
                <Table striped bordered hover className="mt">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Content</th>
                            <th className="wd-64">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPageMap()}
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
            
            {/* Delete Confirm Dialog */} 
            <Modal show={confirmDialog} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Cofirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete <strong>{title? title : ''}</strong>? </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeletePage}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create and Edit Page Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{selectedPage.id ? 'Edit' : 'Create'} Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && 
                        <Alert key='danger' variant='danger'>
                            {error}
                        </Alert>
                    }
                    <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required 
                            type='text' 
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <ReactQuill 
                        required 
                        theme="snow" 
                        value={content} 
                        onChange={onChangeContent} 
                        style={{height: '250px', marginBottom: '1rem'}}/>;
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}