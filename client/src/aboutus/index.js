import {Card, Col, Container, Row} from "react-bootstrap";

export const AboutUs = () => {
    return (
        <Card>
            <Card.Header><h2>About US</h2></Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <img src='/aboutus.jpeg' />
                        </Col>
                        <Col>
                            <h2>Company</h2>
                            <p>
                                Now in its 10th year since its inception in 2012, CS has been on quite the journey. Styled to spell class and hand-crafted to give you a piece that’s truly one of a kind, CS offers you leather accessories with sophisticated detailing and exquisite textures in the season’s must-have colors. Apart from the physical craftsmanship that goes into every CS piece, we infuse it with the soul of CS. The brand carries with it an aura of sophistication, endurance, and quality. The logo, inspired by the Royal Seals of old, symbolizes tradition, passion for perfection, and a quiet elegance reserved for a chosen few. It is a seal of approval on each and every one of its high-quality hand-crafted and engineered leatherware.
                            </p>
                            <h3>Milestones</h3>
                            <ul>
                                <li>Founded in 2000</li>
                                <li>24/7 native support</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}