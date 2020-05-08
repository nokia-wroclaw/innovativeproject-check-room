import styled from 'styled-components/macro';

export const StyledInputField = styled.div`
   input {
      ${( { labelPosition } ) => {
      if ( labelPosition === 'left' ) {
         return 'margin-left: 15px;';
      }

      return 'margin-right: 15px;';
   }}
      width: 200px;
      max-width: 50vw;
      border: solid 1px #b1b1b1;
      border-radius: 5px;
   }

   input[type="checkbox"] {
      width: initial;
   }
`;

export const Label = styled.label`
   display: flex;
   align-items: center;
   justify-content: ${( { hasCheckbox } ) => hasCheckbox ? 'center' : 'space-between'};
`;
