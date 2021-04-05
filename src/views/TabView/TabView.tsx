import React, { ReactElement, ReactEventHandler, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tab/Tab';
import colors from '../../theme/colors.scss';
import './TabView.scss';
import { ReactElements } from '../../utils/types';

const prefixCls = 'kai-tab-view';

interface LocalProps {
  tabLabels: string[],
  onChangeIndex?: (index: number) => void,
  focusColor?: string,
  children: ReactElements
}

const TabView = React.memo<LocalProps>(
  props => {
    const {
      tabLabels,
      onChangeIndex,
      focusColor,
      children
    } = props;

    const [activeTab, setActiveTab] = useState(0);
    const [isTransitionDone, setTransitionDone] = useState(true);

    const tabViewTabs = `${prefixCls}-tabs`;
    const tabViewContent = `${prefixCls}-content`;

    const handleChangeIndex = tabIndex => {
      // NOTE: Ensure you set state for tab transition first.
      //       Otherwise you will face strange race condition bugs.
      setTransitionDone(false);
      setActiveTab(tabIndex);
      if(onChangeIndex){
        onChangeIndex(tabIndex);
      }
    };

    const handleTransitionEnd = () => setTransitionDone(true);

    const renderTabs = () => {
      return tabLabels.map((label, i) => {
        return (
          <Tab
            key={`key-${i}`}
            label={label}
            focusColor={(focusColor || colors.defaultFocusColor)}
          />
        );
      });
    };

    const renderChildren = () => {
      return React.Children.map(children, (child:ReactElement, i) => {
        return React.cloneElement(child, {
          isActive: activeTab === i && isTransitionDone,
        });
      });
    };

    return (
      <div className={prefixCls}>
        <div className={tabViewTabs}>
          <Tabs onChangeIndex={handleChangeIndex}>
            {renderTabs()}
          </Tabs>
        </div>

        <div className={tabViewContent}>
          <SwipeableViews
            axis={'x'}
            index={activeTab}
            onChangeIndex={handleChangeIndex}
            onTransitionEnd={handleTransitionEnd}
            disabled={true}
          >
            {renderChildren()}
          </SwipeableViews>
        </div>
      </div>
    );
  }
);

export default TabView;
