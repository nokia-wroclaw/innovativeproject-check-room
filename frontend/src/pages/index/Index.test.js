import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from './Index';

test( 'renders without errors', () => {
   render(
      <BrowserRouter>
         <Index />
      </BrowserRouter>
   );

} );
