import React from 'react';
import { SoftKeyContext } from './SoftKeyProvider';

export const SoftKeyConsumer = ({ children }) => (
  <SoftKeyContext.Consumer>
    {context => children(context)}
  </SoftKeyContext.Consumer>
);

export const withSoftKeyManager = Comp => props => (
  <SoftKeyConsumer>
    {context => <Comp softKeyManager={context} {...props} />}
  </SoftKeyConsumer>
);
