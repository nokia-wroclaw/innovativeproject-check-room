import styled from 'styled-components/macro';
import { Button, DatePicker, TimePicker } from 'antd';

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
