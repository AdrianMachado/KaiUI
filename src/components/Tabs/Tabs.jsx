import React from 'react';
import PropTypes from 'prop-types';
import './Tabs.scss';

const prefixCls = 'kai-tabs';

class Tabs extends React.Component {
  constructor() {
    super();
    // Bind the method to the component context
    this.renderChildren = this.renderChildren.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    this.state = { activeChild: 0 };
  }

  tabRefs = [];

  handleClick(childIndex) {
    this.setState({ activeChild: childIndex });
    this.refs[childIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
    this.props.onChangeIndex(childIndex);
  }

  handleKeyDown(e) {
    let index = this.state.activeChild;
    switch (e.key) {
      case 'ArrowRight':
        index = Math.min(
          index + 1,
          React.Children.count(this.props.children) - 1
        );
        this.setState({ activeChild: index });
        this.props.onChangeIndex(index);
        break;
      case 'ArrowLeft':
        index = Math.max(index - 1, 0);
        this.setState({ activeChild: index });
        this.props.onChangeIndex(index);
        break;
      default:
        break;
    }
  }

  renderChildren() {
    const { activeChild } = this.state;
    return React.Children.map(this.props.children, (child, i) => {
      return (
        <div ref={i}>
          {React.cloneElement(child, {
            index: i,
            handleClick: this.handleClick,
            isActive: activeChild === i,
          })}
        </div>
      );
    });
  }
  render() {
    return <div className={prefixCls}>{this.renderChildren()}</div>;
  }
}

Tabs.protoTypes = {
  onChangeIndex: PropTypes.func,
  children: PropTypes.array.isRequired,
};

export default Tabs;
