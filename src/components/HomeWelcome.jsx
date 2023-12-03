import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MenuItems } from '../datas/HomeFilters';
import { Link } from 'react-router-dom';
import { HomeProduct } from '../datas/HomeProducts';

function HomeWelcome() {
  const scrollIntoView = (index) => {
    const element = document.getElementById(index);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container fluid>
      <Row xs={1} lg={2} md={2}>
        <Col className='text-start p-5 bg-dark  bg-opacity-25' lg={3} md={2} xs={12}>
          
          {/* <h2>Grand Frais Rabat</h2>
          <hr /> */}
             <Row xs={2} lg={1} md={2} className='d-flex'>
          {MenuItems.map((item, index) => (
            <Col key={index}  className='h-100'>
              <Link
                className='mb-1 fs-5 btn bg-light text-success bg-opacity-75 w-100 h-100 '
                to={'#' + item.title}
                onClick={() => scrollIntoView(index)}
              >
                {item.title}
              </Link>
            </Col>
          ))}
          </Row>
        </Col>
        <Col lg={8} className=' p-5'>
        
            {MenuItems.map((item, index) => (
              <div key={index} id={index}>
                  <hr />
                <h2>{item.title}</h2>
             
                <Row lg={6} md={4} xs={3}>
                  {filteredProducts(item.title).map((product, pIndex) => (
                    <Col key={pIndex}>
                      <Card className="text-center mb-2" style={{ width: '100%' }}>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Footer className="text-muted text-truncate">{product.product}</Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
        
        </Col>
      </Row>
    </Container>
  );
}

// Function to filter products based on homeFilter
const filteredProducts = (filter) => {
  return HomeProduct.filter((product) => product.homeFilter === filter);
};

export default HomeWelcome;
