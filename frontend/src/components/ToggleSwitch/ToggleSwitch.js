import React from 'react';
import PropTypes from 'prop-types';
import { StyledToggleSwitch } from './ToggleSwitch_styles';

const ToggleSwitch = ( { toggleFunc, value, name } ) => {
   return (
      <StyledToggleSwitch onClick={ toggleFunc } value={ value }>
         { name }
      </StyledToggleSwitch>
   );
};

ToggleSwitch.propTypes = {
   toggleFunc: PropTypes.func.isRequired,
   value: PropTypes.bool,
   name: PropTypes.string,
};
ToggleSwitch.defaultProps = {
   name: '',
   value: false
};

export default ToggleSwitch;
