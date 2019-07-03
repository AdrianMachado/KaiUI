import React from 'react';
import PropTypes from 'prop-types';
import './BodyTextListItem.scss';

const prefixCls = 'kai-btl';

class BodyTextListItem extends React.Component {
  render() {
    const { header, body, forwardedRef, onFocusChange } = this.props;

    const itemCls = prefixCls;
    const headerCls = `${prefixCls}-header`;
    const bodyCls = `${prefixCls}-body ${body ? '' : 'hidden'}`;

    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
      >
        <span className={headerCls}>{header}</span>
        <label className={bodyCls}>{body}</label>
      </div>
    );
  }
}

BodyTextListItem.defaultProps = {
  body: null,
};

BodyTextListItem.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string,
  forwardedRed: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onFocusChange: PropTypes.func,
};

export default React.forwardRef((props, ref) => (
  <BodyTextListItem forwardedRef={ref} {...props} />
));
