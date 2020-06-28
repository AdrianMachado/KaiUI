import React from 'react';
import { SoftKeyContext, SoftKeyContextProps } from './SoftKeyProvider';

export interface SoftKeyManagerProps{
  softKeyManager: SoftKeyContextProps
}

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
