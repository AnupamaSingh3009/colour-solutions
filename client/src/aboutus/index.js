import {Breadcrumb, Card, Col, Container, Row, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export const AboutUs = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Breadcrumb className="nc-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>HOME</Breadcrumb.Item>
                        <Breadcrumb.Item active>ABOUT US</Breadcrumb.Item>
                    </Breadcrumb>
                </Card.Title>
                <Container>
                    <Row>
                        <Col>
                            <img src='/aboutus.jpeg' />
                        </Col>
                        <Col>
                            <h2>Company</h2>
                            <p>
                                Now in its 12th year since its inception in 2011, CS has been on quite the journey. Styled to spell class and hand-crafted to give you a piece that’s truly one of a kind, CS offers you leather accessories with sophisticated detailing and exquisite textures in the season’s must-have colors. Apart from the physical craftsmanship that goes into every CS piece, we infuse it with the soul of CS. The brand carries with it an aura of sophistication, endurance, and quality. The logo, inspired by the Royal Seals of old, symbolizes tradition, passion for perfection, and a quiet elegance reserved for a chosen few. It is a seal of approval on each and every one of its high-quality hand-crafted and engineered leatherware.
                            </p>
                            <h3>Milestones</h3>
                            <ul>
                                <li>Founded in 2011</li>
                                <li>24/7 native support</li>
                            </ul>
                            <h3>Team</h3>
                            <p className="text-center">
                                <Image src="/csOwner.jpeg" roundedCircle style={{width: '150px'}}/>
                                <p>Mr. Ajeet Singh</p>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}