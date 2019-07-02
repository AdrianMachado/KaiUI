import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ListView.scss';

const prefixCls = 'kai-list-view';

class ListView extends React.Component {
  constructor() {
    super();
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setFocusToIndex = this.setFocusToIndex.bind(this);
    document.addEventListener('keydown', e => this.handleKeyDown(e));
    this.state = { activeItem: 0 };
  }

  componentDidMount() {
    if (this.props.isActive) {
      this.setFocusToIndex(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.setFocusToIndex(this.state.activeItem);
    }
  }

  itemRefs = [];

  handleChangeIndex(itemIndex) {
    this.setState({ activeItem: itemIndex });
    this.props.onChangeIndex(itemIndex);
  }

  setFocusToIndex(index) {
    ReactDOM.findDOMNode(this.itemRefs[index].current).focus();
    this.handleChangeIndex(index);
  }

  handleKeyDown(e) {
    let index = this.state.activeItem;
    if (!this.props.isActive) {
      return;
    }
    switch (e.key) {
      case 'ArrowUp':
        // looping to bottom
        index = index - 1 >= 0 ? index - 1 : this.itemRefs.length - 1;
        this.setFocusToIndex(index);
        break;
      case 'ArrowDown':
        // looping to top
        index = index + 1 < this.itemRefs.length ? index + 1 : 0;
        this.setFocusToIndex(index);
        break;
      default:
        break;
    }
  }

  renderChildren() {
    let index = -1;
    return React.Children.map(this.props.children, child => {
      // Don't focus on separators
      if (child.props.separatorText != null) {
        return child;
      }
      index++;
      const newRef = React.createRef();
      this.itemRefs[index] = newRef;
      return React.cloneElement(child, {
        index,
        onFocusChange: this.handleChangeIndex,
        ref: newRef,
      });
    });
  }

  render() {
    return <div className={prefixCls}>{this.renderChildren()}</div>;
  }
}

ListView.defaultProps = {
  onChangeIndex: () => {},
  isActive: true,
};

ListView.propTypes = {
  children: PropTypes.array.isRequired,
  onChangeIndex: PropTypes.func,
  // Refocus on tab change
  isActive: PropTypes.bool,
};

export default ListView;
