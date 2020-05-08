import styled from 'styled-components/macro';
import { Button, DatePicker, TimePicker, Input } from 'antd';

const { TextArea } = Input;
const { RangePicker } = TimePicker;

export const CenteredButton = styled( Button )`
   display: block;
   margin: 0 auto;
`;

export const FullWidthDatePicker = styled( DatePicker )`
   display: flex;
`;

export const FullWidthRangePicker = styled( RangePicker )`
   display: flex;
`;

export const StyledTextArea = styled( TextArea )`
   resize: none;
`;
