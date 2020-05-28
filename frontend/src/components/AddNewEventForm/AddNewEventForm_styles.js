import styled from 'styled-components/macro';
import { Form } from 'antd';
import RoomHeader from '../RoomHeader/RoomHeader';

export const StyledAddNewEventForm = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

`;

export const StyledForm = styled( Form )`
   margin-top: 40px;
`;
