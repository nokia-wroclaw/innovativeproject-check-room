import styled from 'styled-components/macro';

export const StyledQRCode = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

   a {
      padding: 10px 20px 20px;
   }

   canvas {
      width: 200px !important;
      height: 200px !important;
   }

   @media print {
      canvas {
         margin-top: 100px;
         width: 400px !important;
         height: 400px !important;
      }

      a {
         display: none;
      }
   }
`;
