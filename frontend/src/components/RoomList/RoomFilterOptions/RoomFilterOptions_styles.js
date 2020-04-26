import styled from 'styled-components/macro';

export const StyledRoomFilterOptions = styled.div`
   width: 100%;
   max-width: 600px;

   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 10px;
`;

export const Field = styled.label`
   text-align: center;

   input[type="text"],
   input[type="number"] {
      width: 200px;
      margin-left: 15px;
   }
`;
