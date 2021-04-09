import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './HorizontalListView.scss';
import classNames from 'classnames';

const prefixCls = 'kai-horizontal-list-view';

const HorizontalListView = React.memo<any>(
  (props) => {
    const itemRefs:any[] = [];

    const [activeItem, setActiveItem] = useState(0);

    const {
      children,
      onChangeIndex,
      isActive,
      className
    } = props;

    const handleChangeIndex = itemIndex => {
      setActiveItem(itemIndex);
      if(onChangeIndex) {
        onChangeIndex(itemIndex);
      }
    };

    const setFocusToIndex = useCallback(
      index => {
        let item = itemRefs[index];
        if(!item){
          item = itemRefs[0];
        } 
        const elem:any|null = ReactDOM.findDOMNode(item.current);
        if(elem){
          elem.focus();
        }
      },
      [itemRefs]
    );

    const handleKeyDown = useCallback(
      e => {
        let index = activeItem;
        if (!isActive) {
          return;
        }

        switch (e.key) {
          case 'ArrowLeft':
            index = index - 1 >= 0 ? index - 1 : itemRefs.length - 1;
            setFocusToIndex(index);
            break;
          case 'ArrowUp':
            index = index - 1 >= 0 ? index - 1 : itemRefs.length - 1;
            setFocusToIndex(index);
            break;
          case 'ArrowRight':
            index = index + 1 < itemRefs.length ? index + 1 : 0;
            setFocusToIndex(index);
          case 'ArrowDown':
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
      return React.Children.map(children, (child:ReactElement) => {
        // Don't focus on separators
        if (!child || child.props.separatorText != null) {
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

    return <div className={classNames(prefixCls, (className||''))}>{renderChildren()}</div>;
  }
);

export default HorizontalListView;
