import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, InnerButton } from './Hamburger_styles';

const Hamburger = ( { isOpen, onClick } ) => {

   return (
      <StyledButton onClick={ onClick }>
         <InnerButton isOpen={ isOpen } />
      </StyledButton>
   );
};

Hamburger.propTypes = {
   isOpen: PropTypes.bool,
   onClick: PropTypes.func.isRequired
};
Hamburger.defaultProps = {
   isOpen: false,
};

export default Hamburger;
