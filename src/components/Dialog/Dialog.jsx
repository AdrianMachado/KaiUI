import React from 'react'
import PropTypes from 'prop-types'

const prefixCls = 'kai-dialog';

const Dialog = React.memo(
  props => ({
    header,
    text,
    children
  }) => {

    const itemCls = `${prefixCls}`;
    const containerCls = `${itemCls}-container`;
    const headerCls = `${itemCls}-header`;
    const contentCls = `${itemCls}-content`;
    const textContentCls = `${contentCls}-text`;

    const renderChildren = () => {
      if(text !== null) {
        return (
          <div className={textContentCls}>{text}</div>
        );
      } else {
        return React.Children.map(
          children, (child, index) => {
            const newRef = React.createRef();

            return React.cloneElement(child, {
              index,
              ref: newRef,
            });
        });
      }
    };

    return (
      <div className={itemCls}>
        <div className={containerCls}>
          <label className={headerCls}>{header}</label>
          <div className={contentCls}>
            {renderChildren()}
          </div>
        </div>
      </div>
    );
  }
);

const requireContent = requireOneOf({
  text: PropTypes.string,
  children: PropTypes.array,
});

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  text: requireContent,
  children: requireContent,
  isActive: PropTypes.bool
};

Dialog.defaultProps = {
  isActive: true
};

export default Dialog;