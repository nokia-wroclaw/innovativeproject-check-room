import styled from 'styled-components/macro';
import { Button, DatePicker, TimePicker, Input, InputNumber, Select } from 'antd';

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

export const FullWidthInputNumber = styled( InputNumber )`
   width: 100%;
`;

export const FullWidthSelect = styled( Select )`
   width: 100%;
`;

export const StyledTextArea = styled( TextArea )`
   resize: none;
`;
