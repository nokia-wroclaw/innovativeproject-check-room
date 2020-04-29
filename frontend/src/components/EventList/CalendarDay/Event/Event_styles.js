import styled from 'styled-components/macro';
import { rgba } from 'polished';

export const StyledEvent = styled.div`
   display: flex;
   background: ${( { theme } ) => rgba( theme.primary, 0.4 )};
   overflow: hidden;
   margin: -1px 0 2px;
   border-radius: 3px;
`;

export const EventName = styled.p`
   word-wrap: break-word;
   max-height: 100%;
   max-width: 100%;
   display: block;
   margin: 0;
   padding: 1px;
   font-size: ${( { theme, isCompact } ) =>
      theme.font.size[isCompact ? 'xxs' : 'xs']};

   text-align: center;
   ${( { theme } ) => theme.mdq.lg} {
      font-size: ${( { theme } ) => theme.font.size.xs};
   }
`;

export const EventButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   background: none;
   border: none;
   width: 100%;
   color: ${( { theme } ) => theme.text};
   text-decoration: none;
`;
