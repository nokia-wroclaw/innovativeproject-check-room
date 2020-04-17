import styled from 'styled-components/macro';

export const StyledToggleSwitch = styled.button`
   margin: 10px auto 20px;
   display: block;
   background: ${( { theme, value } ) => ( value ? theme.secondary : 'none' )};
   border: solid grey 1px;
   padding: 5px 10px;

`;
