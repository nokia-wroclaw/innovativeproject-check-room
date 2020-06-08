import styled from 'styled-components/macro';

export const StyledAdminRoomListItem = styled.div`
   padding: 8px;
   display: grid;
   grid-gap: 2px;
   grid-template-columns: minmax(0, 1fr) 100px 70px;
   font-size: ${( { theme } ) => theme.font.size.xs};
   ${( { theme } ) => theme.mdq.md} {
      font-size: ${( { theme } ) => theme.font.size.s};
   }
   background: #ccc;
   :nth-child(odd) {
      background: #f5f5f5;
   }
`;

export const UserInfo = styled.div`
   word-wrap: break-word;
`;

export const UserActions = styled.div`
   text-align: center;
`;
