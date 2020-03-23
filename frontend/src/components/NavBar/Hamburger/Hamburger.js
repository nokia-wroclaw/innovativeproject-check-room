import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, InnerButton } from './Hamburger_styles';

const Hamburger = ( { isOpen, ...props } ) => {
   return (
      <StyledButton { ...props }>
         <InnerButton isOpen={ isOpen } />
      </StyledButton>
   );
};

Hamburger.propTypes = {
   isOpen: PropTypes.bool,
};
Hamburger.defaultProps = {
   isOpen: false,
};

export default Hamburger;
