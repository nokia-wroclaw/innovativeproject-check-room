import styled from 'styled-components';

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
`;

export const Day = styled.div`
   display: grid;
   width: 90%;
   grid-template-columns: auto minmax(100px, 1fr);
   ${( { theme } ) => theme.mdq.lg} {
      /* grid-template-columns: 0 1fr; */
      width: 100%;
   }
   grid-template-rows: ${( { isFullDay } ) =>
      isFullDay
         ? `auto repeat(${24 * 4}, 10px)`
         : `auto repeat(${7 * 4}, 0) repeat(${11 * 4}, 10px) repeat(${7 *
              4}, 0px)`};
`;

export const GridlineHour = styled.div`
   transform: translateY(-8px);
   grid-column: 1/2;
   padding: 0 7px;
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
   background: none;
   border: none;
   grid-column: 2/3;
   grid-row: 2/3;
   font-size: ${( props ) => props.theme.font.size.s};
`;
