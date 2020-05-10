import React, { useState, useEffect, useCallback }  from "react"
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './OptionMenu.scss';

const prefixCls = 'kai-om';

const OptionMenu = React.memo<any>(
  props => {
    const {
      header,
      children,
      onChangeIndex,
      isActive
    } = props;

    const itemRefs = [];
    const [selectedItem, setSelectedItem] = useState(0);

    const itemCls = prefixCls;

    const handleItemChange = useCallback(
      itemIndex => {
        setSelectedItem(itemIndex);
        if(onChangeIndex)
          onChangeIndex(itemIndex);
      },
      [onChangeIndex]
    );

    const setFocusToIndex = useCallback(
      index => {
        const elem:any|null = ReactDOM.findDOMNode(itemRefs[index].current);
        if(elem)
          elem.focus();
      },
      [itemRefs]
    );

    const handleKeyDown = useCallback(
      e => {
        let index = selectedItem;
        if (!isActive) {
          return;
        }

        switch(e.key) {
          case 'ArrowUp':
            index = index > 0 ? --index : itemRefs.length - 1;
            setFocusToIndex(index);
            break;
          case 'ArrowDown':
            index = index < itemRefs.length - 1 ? index + 1 : 0;
            setFocusToIndex(index);
            break;
          default:
            break;
        }
      },
      [itemRefs, isActive, selectedItem, setFocusToIndex]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [handleKeyDown]
    );

    useEffect(
      () => {
        if(isActive) {
          setFocusToIndex(selectedItem)
        }
      },
      [isActive, setFocusToIndex, selectedItem]
    );

    const renderedItems = React.Children.map(
      children, (item, idx) => {
        const itemRef = React.createRef();

        itemRefs[idx] = itemRef;

        return React.cloneElement(
          item, {
            index: idx,
            onFocusChange: handleItemChange,
            ref: itemRef
          }
        );
      }
    );

    return (
      <div className={itemCls}>
        <header>{header}</header>
        <nav>
          { renderedItems }
        </nav>
      </div>
    );
  }
);
/*
OptionMenu.propTypes = {
  header: PropTypes.string,
  children: PropTypes.array.isRequired,
  onChangeIndex: PropTypes.func,
  isActive: PropTypes.bool,
};

OptionMenu.defaultProps = {
  header: "Options",
  onChangeIndex: () => {},
  isActive: true
};*/

export default OptionMenu;