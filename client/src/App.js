import {Card, Carousel, Col, Container, Row} from 'react-bootstrap';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {URLs} from "./urls";

function App() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        axios.get(URLs.GET_CATEGORY_URL)
            .then(response => response.data)
            .then(categories => setCategories(categories));
    }, []);

  return (
      <section id="cover" className="d-flex align-items-center justify-content-center" style={{backgroundImage: 'url("/items.jpeg")'}}>
        <Container>
            <Row className="row justify-content-center aos-init aos-animate">
                <Col xl={6} lg={8}>
                    <h1>Colours Solution<span>.</span></h1>
                    <h2>
                        We are one of the leading companies in Kanpur to deal in various types of raw leather and leather chemical products and our major strength is dyeing of various raw leather
                    </h2>
                </Col>
            </Row>
        </Container>
      </section>
      /*<Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-75"
              src="/items.jpeg"
              alt="First slide"
            />
           </Carousel.Item>
        </Carousel>
        <h2>Categories</h2>
        <Container>

            <Row>
                {categories && categories.map(category => {
                    return (
                        <Col>
                        <Card>
                            <Card.Img src={category.photo}></Card.Img>
                            <Card.Footer className="text-center"><h5>{category.name}</h5></Card.Footer>
                        </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
      </Container>
       */
  );
}

export default App;
