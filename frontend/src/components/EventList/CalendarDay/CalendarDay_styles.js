import styled from 'styled-components/macro';
import { darken } from 'polished';

export const StyledCalendarDay = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const DayBorder = styled.div`
   grid-column: 2/3;
   grid-row: 2/-1;
   border: 2px #dddddd solid;
   z-index:1;
`;

export const Day = styled.div`
   display: grid;
   width: ${( { isCompact } ) => ( isCompact ? '100%' : '90%' )};
   grid-template-columns: ${( { isCompact } ) => ( isCompact ? '0' : 'auto' )} 1fr;

   overflow: hidden;
   ${( { theme } ) => theme.mdq.lg} {
      /* grid-template-columns: 0 1fr; */
      width: 100%;
   }
   grid-template-rows: ${( {
      isFullDay,
      hourRangeWhenNotFullDay: hours,
      isCompact,
   } ) =>
      isFullDay
         ? `auto repeat(${24 * 4}, 10px)`
         : `auto repeat(${hours[0] * 4}, 0)
                 repeat(${( hours[1] - hours[0] ) * 4}, ${ isCompact? '15px' : '10px' })
                 repeat(${( 24 - hours[1] ) * 4}, 0px)`};
`;

export const GridlineHour = styled.div`
   transform: translateY(-8px);
   grid-column: 1/2;
   margin: 0 7px;
   font-size: ${( { theme } ) => theme.font.size.xs};
   text-align: right;
   overflow: hidden;
`;

export const GridlineRow = styled.div`
   grid-column: 2/3;
   border-top: 1px #dddddd;
   height: 0px;
   border-top-style: solid;
   &:nth-child(2n) {
      border-top-style: dashed;
   }
`;

export const DayInfo = styled.div`
   text-align: center;
   grid-column: 2/3;
   grid-row: 1/2;
`;

export const AllDayButton = styled.button`
   margin: 10px;
   padding: 10px 20px;
   min-width: 170px;
   color: ${( props ) => props.theme.white};
   ${( { isCompact } ) => ( isCompact ? 'display: none' : '' )};
   background: ${( { theme, isFullDay } ) =>
      theme[isFullDay ? 'secondary' : 'primary']};
   border: none;
   grid-column: 2/3;
   grid-row: 2/3;
   transition: transform 0.3s, background-color 0.3s;
   font-size: ${( props ) => props.theme.font.size.s};
   :hover {
      transform: scale(1.15);
      background: ${( { theme, isFullDay } ) =>
      darken( 0.1, theme[isFullDay ? 'secondary' : 'primary'] )};
   }
`;

export const EventsGrid = styled.div`
   grid-column: 2;
   grid-row: 2 / 96;
   display: grid;
   grid-template-rows: ${( {
      isFullDay,
      hourRangeWhenNotFullDay: hours,
      isCompact,
   } ) =>
      isFullDay
         ? `auto repeat(${24 * 4}, 10px)`
         : `auto repeat(${hours[0] * 4}, 0)
                 repeat(${( hours[1] - hours[0] ) * 4},  ${ isCompact? '15px' : '10px' })
                 repeat(${( 24 - hours[1] ) * 4}, 0px)`};
   grid-gap: 0 1px;
   padding: 2px;
`;
