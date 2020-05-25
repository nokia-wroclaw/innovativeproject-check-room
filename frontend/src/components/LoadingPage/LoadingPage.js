import React from 'react';
import { Spin } from 'antd';
import { StyledLoadingPage } from './LoadingPage_styles';

const LoadingPage = () => {
   return <StyledLoadingPage>
      <Spin size="large" />
   </StyledLoadingPage>;
};

export default LoadingPage;
