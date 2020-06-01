import React, { useCallback, useEffect, useState } from 'react';
import './ScrollingListView.scss';
import classNames from 'classnames';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';

const prefixCls = 'kai-scroll-list-view';

interface LocalProps {
  children: any[];
  onChangeIndex?: (index: number) => void;
  isActive: boolean;
  className?: string;
  initialSelectedIndex?: number;
}

const ScrollingListView = React.memo<LocalProps>(
  (props) => {
    const {
      children,
      onChangeIndex,
      isActive,
      className,
      initialSelectedIndex
    } = props;

    const [activeItem, setActiveItem] = useState(initialSelectedIndex === undefined ? 1 : initialSelectedIndex);

    const handleChangeIndex = itemIndex => {
      if(onChangeIndex) {
        onChangeIndex(itemIndex);
      }
    };

    const handleKeyDown = useCallback(
      e => {
        let index = activeItem;
        if (!isActive) {
          return;
        }

        switch (e.key) {
          case 'ArrowUp':
            index = index - 1 >= 0 ? index - 1 : index;
            setActiveItem(index);
            handleChangeIndex(index);
            break;
          case 'ArrowDown':
            index = index + 1 < children.length ? index + 1 : index;
            setActiveItem(index);
            handleChangeIndex(index);
            break;
          default:
            break;
        }
      },
      [isActive, activeItem, setActiveItem]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      },
      [handleKeyDown]
    );

    const renderChildren = () => {
      const childrenToDisplay = children.filter((item, i) => i >= activeItem - 1 && i <= activeItem + 1);

      if(childrenToDisplay.length === 2){
        if(activeItem === 0){
          childrenToDisplay.unshift(<BodyTextListItem header=""/>);
        }
        else if(activeItem === children.length){
          childrenToDisplay.push(<BodyTextListItem header=""/>);
        }
      }

      let index = -1;
      return React.Children.map(childrenToDisplay, child => {
        // Don't focus on separators
        if (!child || child.props.separatorText != null) {
          return child;
        }
        index++;
        const newRef = React.createRef();
        return React.cloneElement(child, {
          index,
          ref: newRef,
          className: classNames(
                        index === 1 ? prefixCls + "-middleItem" : prefixCls + "-nonMiddleItem",
                        index === 1 && isActive ? prefixCls + "-activeItem" : ''
                     )
        });
      });
    };

    return <div className={classNames(prefixCls, (className||''))}>{renderChildren()}</div>;
  }
);

export default ScrollingListView;
