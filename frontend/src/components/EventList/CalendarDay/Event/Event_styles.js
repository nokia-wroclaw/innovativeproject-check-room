import styled from 'styled-components/macro';
import { rgba } from 'polished';

export const StyledEvent = styled.div`
   display: flex;
   background: ${( { theme } ) => rgba( theme.primary, 0.4 )};
   overflow: hidden;
   margin: -2px 0 2px;
   border-radius: 3px;
   /* line-height: 10px; */
   /* white-space: nowrap; */
`;

export const EventName = styled.p`
   max-height: 100%;
   display: block;
   margin: 0;
   padding: 1px;
   font-size: ${( { theme } ) => theme.font.size.xs};
   text-align: center;
`;

export const EventLink = styled.a`
   display: flex;
   align-items: center;
   justify-content: center;

   width: 100%;
   color: ${( { theme } ) => theme.text};
   text-decoration: none;
`;
