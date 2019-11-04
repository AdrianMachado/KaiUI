import React, { useCallback, useEffect, useRef, useState }  from 'react';
import PropTypes from 'prop-types';
import './Tabs.scss';

const prefixCls = 'kai-tabs';

const Tabs = React.memo(
  props => {
    const {
      onChangeIndex,
      children
    } = props;

    const childRefs = [];
    const [activeChild, setActiveChild] = useState(0);

    const handleTabChange = useCallback(
      childIndex => {
      setActiveChild(childIndex);
        childRefs[childIndex].current.scrollIntoView({
          behavior: 'auto',
          block: 'start',
          inline: 'center',
        });
        onChangeIndex(childIndex);
      },
      [childRefs, onChangeIndex]
    );

    const handleKeyUp = useCallback(
      e => {
        let index = activeChild;
        switch (e.key) {
          case 'ArrowRight':
            index = Math.min(
              index + 1,
              React.Children.count(children) - 1
            );
            if (activeChild !== index) {
              handleTabChange(index);
            }
            break;
          case 'ArrowLeft':
            index = Math.max(index - 1, 0);
            if (activeChild !== index) {
              handleTabChange(index);
            }
            break;
          default:
            break;
        }
      },
      [activeChild, children, handleTabChange]
    );

    const renderChildren = () => {
      return React.Children.map(children, (child, i) => {
        const childRef = useRef();

        childRefs[i] = childRef;

        return React.cloneElement(
          child, {
            index: i,
            onTabChange: handleTabChange,
            isActive: activeChild === i,
            ref: childRef
          }
        );
      });
    };
    
    useEffect(
      () => {
        document.addEventListener('keyup', handleKeyUp);
        return () => document.removeEventListener('keyup', handleKeyUp);
      },
      [handleKeyUp]
    );
  
    return <div className={prefixCls}>{renderChildren()}</div>;
  }
);

Tabs.protoTypes = {
  onChangeIndex: PropTypes.func,
  children: PropTypes.array.isRequired
};

export default Tabs;
