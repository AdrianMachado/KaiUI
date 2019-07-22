import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tab/Tab';
import colors from '../../theme/colors.scss';

import './TabView.scss';

const prefixCls = 'kai-tab-view';

class TabView extends React.PureComponent {
  constructor() {
    super();
    this.renderChildren = this.renderChildren.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.state = { activeTab: 0, isTransitionDone: true };
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex, isTransitionDone: false });
    this.props.onChangeIndex(tabIndex);
  }

  handleTransitionEnd() {
    this.setState({ isTransitionDone: true });
  }

  renderTabs() {
    return this.props.tabLabels.map((label, i) => {
      return (
        <Tab
          key={`key-${i}`}
          label={label}
          focusColor={this.props.focusColor}
        />
      );
    });
  }

  renderChildren() {
    const { activeTab, isTransitionDone } = this.state;
    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        isActive: activeTab === i && isTransitionDone,
      });
    });
  }

  render() {
    const { activeTab } = this.state;
    const tabViewTabs = `${prefixCls}-tabs`;
    const tabViewContent = `${prefixCls}-content`;
    return (
      <div className={prefixCls}>
        <div className={tabViewTabs}>
          <Tabs onChangeIndex={this.handleChangeIndex}>
            {this.renderTabs()}
          </Tabs>
        </div>

        <div className={tabViewContent}>
          <SwipeableViews
            axis={'x'}
            index={activeTab}
            onChangeIndex={this.handleChangeIndex}
            onTransitionEnd={this.handleTransitionEnd}
            disabled={true}
          >
            {this.renderChildren()}
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

TabView.defaultProps = {
  onChangeIndex: () => {},
  focusColor: colors.defaultFocusColor,
};

TabView.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeIndex: PropTypes.func,
  focusColor: PropTypes.string,
};

export default TabView;
