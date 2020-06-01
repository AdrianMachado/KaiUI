import React, { useState, useEffect, useCallback }  from "react"
import ReactDOM from 'react-dom';

import './OptionMenu.scss';
import TextInput from "../TextInput/TextInput";
import OptionItem from "./OptionItem";

const prefixCls = 'kai-om';

interface LocalProps {
  header: string;
  children: any[];
  onChangeIndex?: (index: number) => void;
  isActive: boolean;
  onExit: () => void;
  enableSearch?: boolean;
}

const OptionMenu = React.memo<LocalProps>(
  props => {
    const {
      header,
      children,
      onChangeIndex,
      isActive,
      onExit,
      enableSearch
    } = props;

    const itemRefs = [];
    const [selectedItem, setSelectedItem] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const itemCls = prefixCls;

    const handleItemChange = useCallback(
      itemIndex => {
        setSelectedItem(itemIndex);
        if(onChangeIndex) {
          onChangeIndex(itemIndex);
        }
      },
      [onChangeIndex]
    );

    const setFocusToIndex = useCallback(
      index => {
        const elem:any|null = ReactDOM.findDOMNode(itemRefs[index].current);
        if(elem) {
          elem.focus();
        }
      },
      [itemRefs]
    );

    const handleKeyDown = useCallback(
      e => {
        let index = selectedItem;
        if (!isActive) {
          return;
        }

        switch(e.key) {
          case 'ArrowUp':
            index = index > 0 ? --index : itemRefs.length - 1;
            setFocusToIndex(index);
            break;
          case 'ArrowDown':
            index = index < itemRefs.length - 1 ? index + 1 : 0;
            setFocusToIndex(index);
            break;  
          case 'Backspace': 
            if(selectedItem !== 0 && onExit) {
              onExit();
            }
            break;
          default:
            break;
        }
      },
      [itemRefs, isActive, selectedItem, setFocusToIndex]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [handleKeyDown]
    );

    useEffect(
      () => {
        if(isActive) {
          setFocusToIndex(selectedItem)
        }
      },
      [isActive, setFocusToIndex, selectedItem]
    );

    const childrenToRender = [...children];
    if(enableSearch === true){
      childrenToRender.unshift(<TextInput 
                                  id="optMenuSearch" 
                                  initialValue={searchTerm ||  ""} 
                                  placeholder={this.props.localization.getUIString("search") + "..."} 
                                  index={0} 
                                  onChange={(ev) => {setSearchTerm(ev.target.value)}} />);
    }


    const renderedItems = React.Children.map(
      childrenToRender, (item, idx) => {
        const itemRef = React.createRef();

        itemRefs[idx] = itemRef;

        return React.cloneElement(
          item, {
            index: idx,
            onFocusChange: handleItemChange,
            ref: itemRef
          }
        );
      }
    );

    const matchingSearchChildren = searchTerm ?
      childrenToRender.filter(child => child.props.id === "optMenuSearch" || 
        (child.props.text && child.props.text.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1))
    : undefined;

    const filteredItems = matchingSearchChildren && matchingSearchChildren.length > 0 ? React.Children.map(
      matchingSearchChildren, (item, idx) => {
        const itemRef = React.createRef();

        itemRefs[idx] = itemRef;

        return React.cloneElement(
          item, {
            index: idx,
            onFocusChange: handleItemChange,
            ref: itemRef
          }
        );
      }
    ) : undefined;

    return (
      <div className={itemCls}>
        <header>{header}</header>
        <nav>
          { filteredItems ? filteredItems : renderedItems }
        </nav>
      </div>
    );
  }
);

export default OptionMenu;