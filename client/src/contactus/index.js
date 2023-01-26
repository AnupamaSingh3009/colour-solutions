import {Breadcrumb, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import './index.css';

export const Contactus = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Breadcrumb className="nc-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                        <Breadcrumb.Item active>CONTACT</Breadcrumb.Item>
                    </Breadcrumb>
                </Card.Title>
                <h4>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</h4>
                <Container>
                    <Row>
                        <Col md="6">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe width="600" height="500" id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=1172,%20Wazidpur,%20Jajmau,&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                                    <a href="https://fmovies-online.net">fmovies</a><br/>
                                    <a href="https://www.embedgooglemap.net">build custom google map</a>
                                </div>
                            </div>
                            <Row className="mt-4 small">
                                <Col>
                                    <h4><FontAwesomeIcon icon={faLocationDot} /> Location:</h4>
                                    <address>
                                        1172, Wazidpur, Jajmau,<br/>
                                        Near Balughat KESCO,<br/>
                                        Kanpur - 208010<br/>
                                        Uttar Pradesh
                                    </address>
                                </Col>
                                <Col>
                                    <h4><FontAwesomeIcon icon={faPhone} /> Call us:</h4>
                                    +91-9889969601,<br/> +91-7704000195
                                </Col>
                                <Col>
                                    <h4><FontAwesomeIcon icon={faEnvelope} /> Email us:</h4>
                                    nirmal.colours@gmail.com<br/>
                                    nirmal.colours@ymail.com
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
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
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}