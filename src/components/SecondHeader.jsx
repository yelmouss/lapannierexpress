import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Cat } from '../datas/Categories';
import Categories from './Categories';

import CustomScroll from 'react-custom-scroll';
function SecondHeader() {
  return (
    <>
      <Container className='nowrap col-11'>
      <CustomScroll >
        <Row className='MyRowCat'>
       
          {Cat.map((item, index) => (
            <Col key={index} className='text-nowrap'>
              <Categories key={index} className='text-nowrap' title={item.title} imageUrl={item.ImageUrl} />
            </Col>
          ))}
          
        </Row>
        </CustomScroll>
      </Container>

    </>
  );
}

export default SecondHeader;
