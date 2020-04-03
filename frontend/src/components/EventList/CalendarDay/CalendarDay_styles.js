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
   grid-template-rows: auto repeat(96, 10px);
`;

export const GridlineHour = styled.div`
   grid-column: 1/2;
   margin-top: -9px;
   padding: 0 7px;
   font-size: ${( { theme } ) => theme.font.size.xs};
   text-align: right;
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
