import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tab/Tab';
import colors from '../../theme/colors.scss';

import './TabView.scss';

const prefixCls = 'kai-tab-view';

const TabView = React.memo(
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
      onChangeIndex(tabIndex);
    };

    const handleTransitionEnd = () => setTransitionDone(true);

    const renderTabs = () => {
      return tabLabels.map((label, i) => {
        return (
          <Tab
            key={`key-${i}`}
            label={label}
            focusColor={focusColor}
          />
        );
      });
    };

    const renderChildren = () => {
      return React.Children.map(children, (child, i) => {
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

TabView.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeIndex: PropTypes.func,
  focusColor: PropTypes.string,
  children: PropTypes.array,
};

TabView.defaultProps = {
  onChangeIndex: () => {},
  focusColor: colors.defaultFocusColor,
};

export default TabView;
