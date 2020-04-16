import styled from 'styled-components/macro';
import { rgba } from 'polished';

export const StyledEvent = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background: ${( { theme } ) => rgba( theme.primary, 0.4 )};
   grid-column: 2/3;
   overflow: hidden;
`;

export const EventName = styled.p`
   margin: 0;
   text-align: center;
`;

export const EventLink = styled.a`
   color: ${( { theme } ) => theme.text};
   text-decoration: none;
`;
