import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Input, Checkbox, Row, Col, Select } from 'antd';
import { FullWidthInputNumber } from '../../StyledFormComponents/StyledFormComponents';
import { StyledRoomFilterOptions } from './RoomFilterOptions_styles';
import RoomMetadataDTO from '../../../services/parsing/RoomMetadataDTO';

const RoomFilterOptions = ( { state } ) => {
   const { roomsData, filters, setFilters } = state;

   const rooms = roomsData.map( ( room ) => RoomMetadataDTO.from( room ) );
   const buildings = _.uniq(
      rooms
         .filter( ( room ) => room.location )
         .map( ( room ) => room.location.building )
   );

   const onValuesChange = ( newVals ) => setFilters( { ...filters, ...newVals } );

   return (
      <StyledRoomFilterOptions>
         <Form onValuesChange={ onValuesChange }>
            <Row gutter={ 20 }>
               <Col span={ 12 }>
                  <Form.Item label="Room name" name="name">
                     <Input placeholder="Room name" />
                  </Form.Item>
               </Col>
               <Col span={ 12 }>
                  <Form.Item label="Seats" name="seatsNo">
                     <FullWidthInputNumber
                        min={ 0 }
                        placeholder="Seats"
                        type="number"
                        inputtype="numeric"
                        pattern="[0-9]*"
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={ 20 }>
               <Col span={ 12 }>
                  <Form.Item label="Building" name="building">
                     <Select placeholder="Building" showSearch allowClear>
                        { buildings.map( ( building ) => (
                           <Select.Option key={ building } value={ building }>{ building }</Select.Option>
                        ) ) }
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Row align="center">
               <Col span={ 12 }>
                  <Form.Item valuePropName="checked" name="hasProjector">
                     <Checkbox>Projector</Checkbox>
                  </Form.Item>
               </Col>
               <Col span={ 12 }>
                  <Form.Item valuePropName="checked" name="hasWhiteboard">
                     <Checkbox>Whiteboard</Checkbox>
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </StyledRoomFilterOptions>
   );
};

RoomFilterOptions.propTypes = {
   state: PropTypes.shape( {
      filters: PropTypes.object,
      setFilters: PropTypes.func,
      roomsData: PropTypes.array,
   } ).isRequired,
};

export default RoomFilterOptions;
