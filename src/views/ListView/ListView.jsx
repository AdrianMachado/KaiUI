import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ListView.scss';

const prefixCls = 'kai-list-view';

const ListView = React.memo(
  props => {
    const itemRefs = [];

    const [activeItem, setActiveItem] = useState(0);

    const {
      children,
      onChangeIndex,
      isActive,
    } = props;

    const handleChangeIndex = itemIndex => {
      setActiveItem(itemIndex);
      onChangeIndex(itemIndex);
    };

    const setFocusToIndex = useCallback(
      index => ReactDOM.findDOMNode(itemRefs[index].current).focus(),
      [itemRefs]
    );

    const handleKeyDown = useCallback(
      e => {
        let index = activeItem;
        if (!isActive) {
          return;
        }

        switch (e.key) {
          case 'ArrowUp':
            // looping to bottom
            index = index - 1 >= 0 ? index - 1 : itemRefs.length - 1;
            setFocusToIndex(index);
            break;
          case 'ArrowDown':
            // looping to top
            index = index + 1 < itemRefs.length ? index + 1 : 0;
            setFocusToIndex(index);
            break;
          default:
            break;
        }
      },
      [isActive, activeItem, setFocusToIndex, itemRefs]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      },
      [handleKeyDown]
    );

    useEffect(
      () => {
        if(isActive) {
          setFocusToIndex(activeItem)
        }
      },
      [isActive, setFocusToIndex, activeItem]
    );

    const renderChildren = () => {
      let index = -1;
      return React.Children.map(children, child => {
        // Don't focus on separators
        if (child.props.separatorText != null) {
          return child;
        }
        index++;
        const newRef = React.createRef();
        itemRefs[index] = newRef;
        return React.cloneElement(child, {
          index,
          onFocusChange: handleChangeIndex,
          ref: newRef,
        });
      });
    };

    return <div className={prefixCls}>{renderChildren()}</div>;
  }
);

ListView.propTypes = {
  children: PropTypes.array.isRequired,
  onChangeIndex: PropTypes.func,
  // Refocus on tab change
  isActive: PropTypes.bool,
};

ListView.defaultProps = {
  onChangeIndex: () => {},
  isActive: true,
};

export default ListView;
