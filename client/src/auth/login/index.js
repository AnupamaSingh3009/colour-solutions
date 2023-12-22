import React, { useState} from "react";
import {Form, Card, Button, Alert} from "react-bootstrap";
import './index.css';
import { useAuth } from "../use-auth";
import { useNavigate } from "react-router";

export const LoginComponent = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLoginClick = (event) => {
        const loginPayload = {
            username,
            password
        };
        auth.login(loginPayload).then((token) => {
            console.log("Token ", token);
            navigate('/admin/category');
        }).catch(error => {
            console.log('errr', error);
            if(error && error.code === 'ERR_BAD_REQUEST') {
                setError('Please enter valid the username or password');
            } else {
                setError(error.message);
            }
        });
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    return (
        <div className="login-wrapper">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title>
                        <img src='logo.jpeg' alt="Logo" className="center-image" width="20%"/> 
                        <img src='subtitle.jpeg' alt="subtitle" className="center-image" width="80%"/>
                    </Card.Title>
                    {error && <Alert key='danger' variant='danger'>
                            {error}
                        </Alert>
                    }
                    <Form className="login-form">
                        <Form.Group controlId="usernameId">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="username" 
                                placeholder="Enter user name"
                                value={username}
                                required
                                onChange={onChangeUsername}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="passwordId">
                            <Form.Label>Your password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={onChangePassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="center">
                            <Button variant="success" type="submit" onClick={onLoginClick}>
                                Login
                            </Button>&nbsp;
                            <Button variant="primary" type="button">
                                Forgot Password
                            </Button>
                        </div>
                    </Form>
                </Card.Body>    
            </Card>
        </div>
    )
}