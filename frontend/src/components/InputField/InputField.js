import React from 'react';
import PropTypes from 'prop-types';
import { StyledInputField, Label } from './InputField_styles';

const InputField = ( { label, type, labelPosition, value, onChange } ) => {
   // The trick below is used to confuse Chrome and Safari's
   // autocompletion engines. It inserts zero-width spaces between
   // the letters. This prevents e.g. Safari suggesting user's full
   // name into field called "Room name".
   const text = label.split( '' ).join( String.fromCharCode( 8204 ) );

   return (
      <StyledInputField labelPosition={ labelPosition }>
         { type === 'text' || type === 'search' ?
            <Label>
               { labelPosition === 'left' ? text : null }
               <input type={ type }
                  value={ value }
                  autocompletion="off"
                  onChange={ ( e ) => onChange( e.target.value ) } />
               { labelPosition === 'right' ? text : null }
            </Label>
            : null }

         { type === 'number' ?
            <Label>
               { labelPosition === 'left' ? text : null }
               <input type="number"
                  inputtype="numeric"
                  pattern="[0-9]*"
                  value={ value }
                  autocompletion="off"
                  onChange={ ( e ) => onChange( e.target.value ) } />
               { labelPosition === 'right' ? text : null }
            </Label>
            : null }

         { type === 'checkbox' ?
            <Label hasCheckbox>
               { labelPosition === 'left' ? text : null }
               <input type="checkbox"
                  checked={ value }
                  onChange={ ( e ) => onChange( e.target.checked ) } />
               { labelPosition === 'right' ? text : null }
            </Label>
            : null }
      </StyledInputField>
   );
};

InputField.propTypes = {
   type: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   labelPosition: PropTypes.string,
   value: PropTypes.oneOfType( [
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
   ] ),
   onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
   labelPosition: 'left',
   value: '',
};

export default InputField;
