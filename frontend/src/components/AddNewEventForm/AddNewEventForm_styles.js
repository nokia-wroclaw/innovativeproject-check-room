import styled from 'styled-components/macro';
import { Form } from 'antd';

export const StyledAddNewEventForm = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

   a {
      padding: 10px 20px 20px;
   }
`;

export const StyledForm = styled( Form )`
   margin-top: 40px;
`;
