import React, { useState }  from "react"
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';

const prefixCls = 'kai-om';

const OptionItem = React.memo(
    props => {
      const { 
        index,
        text,
        onClick,
        onFocusChange,
        softKeyManager,
        forwardedRef
      } = props;
      
      const [, setFocused] = useState(false);
      
      const itemCls = `${prefixCls}-item`;
  
      const handleFocusChange = (isNowFocused) => {
        setFocused(isNowFocused);
        if(isNowFocused) {
          softKeyManager.setSoftKeyTexts({ centerText: "Select" });
          softKeyManager.setSoftKeyCallbacks({
            centerCallback: onClick
          });
          onFocusChange(index)
        } else {
          softKeyManager.unregisterSoftKeys();
        }
      };
  
      return (
        <div
          tabIndex="0"
          ref={forwardedRef}
          onFocus={() => handleFocusChange(true)}
          onBlur={() => handleFocusChange(false)}
          className={itemCls}>
          {text}
        </div>
      );
    }
  );
  
  OptionItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    ref: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    onFocusChange: PropTypes.func,
    onClick: PropTypes.func
  };
  
  OptionItem.defaultProps = {
    onFocusChange: () => {},
    onClick: () => {}
  };
  
  export default React.forwardRef((props, ref) => (
    <SoftKeyConsumer>
      {context => (
        <OptionItem
          softKeyManager={context}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SoftKeyConsumer>
  ));