import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';

import './BodyTextListItem.scss';

const prefixCls = 'kai-btl';

const BodyTextListItem = React.memo(
  React.forwardRef((props, ref) => {
    const {
      header,
      body,
      focusColor,
      index,
      onFocusChange
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const headerCls = `${prefixCls}-header`;
    const bodyCls = `${prefixCls}-body ${body ? '' : 'hidden'}`;

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        onFocusChange(index);
      }
    }

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={ref}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <span className={headerCls}>{header}</span>
        <label className={bodyCls}>{body}</label>
      </div>
    );
  }
));

BodyTextListItem.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string,
  focusColor: PropTypes.string,
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
};

BodyTextListItem.defaultProps = {
  body: null,
  focusColor: colors.defaultFocusColor,
};

export default BodyTextListItem;
