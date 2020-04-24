import styled from 'styled-components/macro';
import { lighten, darken } from 'polished';

export const StyledToggleSwitch = styled.button`
   margin: 10px auto 20px;
   display: block;
   background: ${( { theme, value } ) =>
      value ? theme.secondary : theme.primary};
   color: ${( props ) => props.theme.white};
   border: solid grey 1px;
   font-size: ${( props ) => props.theme.font.size.s};
   padding: 10px 20px;
   transition: transform 0.3s, background-color 0.3s;
   :hover {
      transform: scale(1.2);
      background: ${( { theme, value } ) =>
      value ? darken( 0.1, theme.secondary ) : darken( 0.1, theme.primary )};
   }
`;
