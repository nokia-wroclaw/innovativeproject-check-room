import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CenteredBlock } from './Greeter_styles';

const Index = ( { amountOfRooms } ) => {
   return (
      <CenteredBlock>
         <h3>Welcome to Check Room.</h3>
         <p>See <Link to="/rooms">Rooms</Link> for room availability information.</p>
         <p>We are currently managing { amountOfRooms } rooms.</p>
      </CenteredBlock>
   );
};

Index.propTypes = {
   amountOfRooms: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
};

export default Index;
