import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Row, Col } from 'antd';
import { FullWidthInputNumber } from '../../StyledFormComponents/StyledFormComponents';
import { StyledRoomFilterOptions } from './RoomFilterOptions_styles';

const RoomFilterOptions = ( { state } ) => {
   const [ filters, setFilters ] = state;

   const onValuesChange = ( newVals ) =>
      setFilters( { ...filters, ...newVals } );

   return (
      <StyledRoomFilterOptions>
         <Form onValuesChange={ onValuesChange }>
            <Row gutter={ 20 }>
               <Col span={ 12 }>
                  <Form.Item
                     label="Room name"
                     name="name">
                     <Input placeholder="Room name" />
                  </Form.Item>
               </Col>
               <Col span={ 12 }>
                  <Form.Item
                     label="Seats"
                     name="seatsNo">
                     <FullWidthInputNumber
                        min={ 0 }
                        placeholder="Seats"
                        type="number"
                        inputtype="numeric"
                        pattern="[0-9]*" />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={ 20 } align="center">
               <Col>
                  <Form.Item
                     valuePropName="checked"
                     label="Projector"
                     name="hasProjector">
                     <Checkbox />
                  </Form.Item>
               </Col>
               <Col>
                  <Form.Item
                     valuePropName="checked"
                     label="Whiteboard"
                     name="hasWhiteboard">
                     <Checkbox />
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </StyledRoomFilterOptions>
   );
};

RoomFilterOptions.propTypes = {
   state: PropTypes.arrayOf( PropTypes.any ).isRequired
};

export default RoomFilterOptions;
