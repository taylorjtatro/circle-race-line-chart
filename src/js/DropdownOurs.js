import React from 'react';

export const DropdownOurs = ({options, id, selectedValue, onSelectedValueChange}) => (
    <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
        {/* we will use es6 destructuring to pull out value and label from our options here */}
        {/* So by setting selected which is a boolean that says the option is initially selected. So now the menu will initialize to be whatever we set as our initial value */}
        {options.map(({value, label}) => (
            <option key={value} value={value} selected={value===selectedValue}>{label}</option>
        ))}
    </select>
)