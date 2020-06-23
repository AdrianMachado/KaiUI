import React, { useState, useEffect, useCallback } from 'react';
import './TriColumnListView.scss';
import ListView from '../ListView/ListView';
import ScrollingListView from '../ScrollingListView/ScrollingListView';

const prefixCls = 'kai-tricol-view';

interface LocalProps {
  onChangeIndex?: (index: number) => void,
  focusColor?: string,
  col1Children: any[],
  col2Children: any[],
  col3Children: any[],
  onCol1ChangeIndex?: (index: number) => void,
  onCol2ChangeIndex?: (index: number) => void,
  onCol3ChangeIndex?: (index: number) => void,
  selectedCol1Index?: number,
  selectedCol2Index?: number,
  selectedCol3Index?: number
}

const TriColListView = React.memo<LocalProps>(
  props => {
    const {
      onChangeIndex,
      focusColor,
      col1Children,
      col2Children,
      col3Children,
      onCol1ChangeIndex,
      onCol2ChangeIndex,
      onCol3ChangeIndex,
      selectedCol1Index,
      selectedCol2Index,
      selectedCol3Index
    } = props;

    const [activeTab, setActiveTab] = useState(0);
    const [isTransitionDone, setTransitionDone] = useState(true);

    const handleChangeIndex = tabIndex => {
      // NOTE: Ensure you set state for tab transition first.
      // Otherwise you will face strange race condition bugs.
      setTransitionDone(false);
      setActiveTab(tabIndex);
      if(onChangeIndex) {
        onChangeIndex(tabIndex);
      }
    };

    
    const handleKeyDown = useCallback(
      e => {
        let index = activeTab;
        switch (e.key) {
          case 'ArrowLeft':
            index = index - 1 >= 0 ? index - 1 : 2;
            setActiveTab(index);
            break;
          case 'ArrowRight':
            index = index + 1 < 3 ? index + 1 : 0;
            setActiveTab(index);
          default:
            break;
        }
      },
      [activeTab, setActiveTab]
    );

    useEffect( 
      () => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      },
      [handleKeyDown]
    );

    const renderChildren = (children) => {
      return React.Children.map(children, (child:any, i) => {
        return React.cloneElement(child, {
          isActive: activeTab === i && isTransitionDone,
          onFocusChange: handleChangeIndex,
          focusClass: "defaultFocusCls"
        });
      });
    };

    return (
      <div className={prefixCls}>
        <div className={prefixCls+"-content"}>
            <ScrollingListView 
                isActive={activeTab === 0} 
                className="col" 
                initialSelectedIndex={selectedCol1Index}
                onChangeIndex={(index) => onCol1ChangeIndex(index)}
            >
              {renderChildren(col1Children)}
            </ScrollingListView>
            <ScrollingListView 
                isActive={activeTab === 1} 
                className="col" 
                initialSelectedIndex={selectedCol2Index}
                onChangeIndex={(index) => onCol2ChangeIndex(index)}
            >
              {renderChildren(col2Children)}
            </ScrollingListView>
            <ScrollingListView 
              isActive={activeTab === 2} 
              className="col" 
              initialSelectedIndex={selectedCol3Index}
              onChangeIndex={(index) => onCol3ChangeIndex(index)}
            >
              {renderChildren(col3Children)}
            </ScrollingListView>
        </div>
      </div>
    );
  }
);

export default TriColListView;
