import styled from 'styled-components/macro';
import { rgba } from 'polished';

export const StyledEvent = styled.div`
   display: flex;
   align-items: center;
   background: ${( { theme } ) => rgba( theme.primary, 0.4 )};
   overflow: hidden;
   margin: -2px 0 2px;
   border-radius: 3px;
   white-space: nowrap;
`;

export const EventName = styled.p`
   display: block;
   margin: 0;
   padding: 3px;
   text-align: center;
`;

export const EventLink = styled.a`
   width: 100%;
   color: ${( { theme } ) => theme.text};
   text-decoration: none;
`;
