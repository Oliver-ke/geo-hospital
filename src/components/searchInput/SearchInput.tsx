import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Input } from 'antd';

import './searchInput.styles.scss';

interface searchInpute {
  updateSearchQuery: Function
}
const SearchInput: FC<searchInpute> = ({ updateSearchQuery }): ReactElement => {
  const { Search } = Input;
  const [inputText, setInputText] = useState("");
  const handleOnchange = (e: any) => {
    setInputText(e.target.value);
  }

  useEffect(() => {
    updateSearchQuery(inputText);
  }, [inputText])
  return (
    <div className="search-input-wrapper">
      <Search
        onChange={handleOnchange}
        className="search-input"
        placeholder="Search hospital"
        value={inputText}
      />
    </div>
  )
}

export default SearchInput;