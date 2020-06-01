import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './ListView.scss';
import classNames from 'classnames';

interface LocalProps {
  isActive?: boolean;
  children: any[];
  onChangeIndex?: (index: number) => void;
  className?: string;
}

const prefixCls = 'kai-list-view';

const ListView = React.memo<LocalProps>(
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
        if(itemRefs[index]){
          const elem:any|null = ReactDOM.findDOMNode(itemRefs[index].current);
          if(elem){
            elem.focus();
          }
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
          case 'ArrowUp':
            // looping to bottom
            index = index - 1 >= 0 ? index - 1 : index;
            setFocusToIndex(index);
            break;
          case 'ArrowDown':
            // looping to top
            index = index + 1 < itemRefs.length ? index + 1 : index;
            setFocusToIndex(index);
            break;
          //TODO: Handle right to go to next (if enabled)
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

export default ListView;
