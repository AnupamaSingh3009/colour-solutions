import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

export const Contactus = () => {
    return (
        <Card>
            <Card.Header><h2>Contact Us</h2></Card.Header>
            <Card.Body>
                <h4>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</h4>
                <Container>
                    <Row>
                        <Col md="9">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Your Email</Form.Label>
                                    <Form.Control type="text"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Your Message</Form.Label>
                                    <Form.Control as="textarea"></Form.Control>
                                </Form.Group>
                                <br/>
                                <Button variant="primary">
                                    SEND
                                </Button>
                            </Form>
                        </Col>
                        <Col md="3">
                            <ul className="list-unstyled text-center">
                                <li>
                                    <FontAwesomeIcon icon={faLocationDot} /><br/>
                                    <address>
                                        1172, Wazidpur, Jajmau,<br/>
                                        Near Balughat KESCO,<br/>
                                        Kanpur - 208010<br/>
                                        Uttar Pradesh
                                    </address>
                                </li>
                                <li className="mb-1">
                                    <FontAwesomeIcon icon={faPhone} /><br/>
                                    +91-9889969601,<br/> +91-7704000195
                                </li>
                                <li className="mb-1">
                                    <FontAwesomeIcon icon={faEnvelope}/><br/>
                                    nirmal.colours@gmail.com<br/>
                                    nirmal.colours@ymail.com
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}