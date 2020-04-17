
import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import PropTypes from 'prop-types';
import { PageWrapper } from './PageTemplate_styles';
import GlobalStyle from '../../assets/styles/GlobalStyle';

import { theme } from '../../assets/styles/theme';
import NavBar from '../../components/NavBar/NavBar';

const PageTemplate = ( { children } ) => {
   return (
      <ThemeProvider theme={ theme }>
         <GlobalStyle />
         <NavBar />
         <PageWrapper className="aaaa">
            { children }
         </PageWrapper>
      </ThemeProvider>
   );
};

PageTemplate.propTypes = {
   children: PropTypes.shape( [
      PropTypes.arrayOf( PropTypes.node ),
      PropTypes.node,
   ] ).isRequired,
};

export default PageTemplate;
