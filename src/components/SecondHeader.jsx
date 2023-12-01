import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Cat } from '../datas/Categories';
import Categories from './Categories';


function SecondHeader() {
  return (
    <>
      <Container className='nowrap'>
        <Row className='MyRowCat'>
          {Cat.map((item, index) => (
            <Col className='text-nowrap'>
              <Categories key={index} className='text-nowrap' title={item.title} imageUrl={item.ImageUrl} />
            </Col>
          ))}
        </Row>

      </Container>

    </>
  );
}

export default SecondHeader;
