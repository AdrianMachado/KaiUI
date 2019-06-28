import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tab/Tab';

class TabView extends React.Component {
  constructor() {
    super();
    this.renderTabs = this.renderTabs.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.state = { activeTab: 0 };
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  renderTabs() {
    return this.props.tabLabels.map((label, i) => {
      return <Tab key={`key-${i}`} label={label} />;
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className="App">
        <Tabs onChangeIndex={this.handleChangeIndex}>{this.renderTabs()}</Tabs>
        <SwipeableViews
          axis={'x'}
          index={activeTab}
          onChangeIndex={this.handleChangeIndex}
        >
          {this.props.children}
        </SwipeableViews>
      </div>
    );
  }
}

TabView.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string),
};

export default TabView;
