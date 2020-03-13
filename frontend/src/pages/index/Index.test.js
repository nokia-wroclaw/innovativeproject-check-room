import React from 'react';
import { render } from '@testing-library/react';
import Index from './Index';

test( 'renders learn react link', () => {
   const { getByText } = render( <Index /> );
   const linkElement = getByText( 'Hello World' );
   expect( linkElement ).toBeInTheDocument();
} );
