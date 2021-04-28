import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";


// items props types
// [
//   { key: 'abc', value: 'Abc'}
// ]
const CustomDropdown = (props) => {
  const { items, onSelect } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setDropdownValue] = useState(items[3].value);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleOnSelect = (item) => {
    setDropdownValue(item.value);
    onSelect(item.key);
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {value}
      </DropdownToggle>
      <DropdownMenu>
        {
          items.map(item => <DropdownItem key={item.key} onClick={() => handleOnSelect(item)}>{item.value}</DropdownItem>)
        } 
      </DropdownMenu>
    </Dropdown>
  );
}

export default CustomDropdown;
