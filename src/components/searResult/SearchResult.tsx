import React, { FC, ReactElement } from 'react';
import { Spin } from 'antd';
import { AimOutlined } from '@ant-design/icons'
import Card from '../card/Card';

import './searchResult.styles.scss';
interface Iresult {
  results: null | object[],
  loading: boolean,
}

const SearchResult: FC<Iresult> = ({ results, loading, }): ReactElement => {
  return (
    <div className="search-result">
      {results && results.map((result: any) => (
        <Card key={result.id} hospital={result} />
      ))}
      {loading && (
        <div className="spin-container">
          <Spin />
        </div>
      )}
      {results === null && !loading && (
        <div className="no-search">
          <h4>Enter a search query to for hospitals</h4>
          <AimOutlined style={{ fontSize: "30px" }} />
        </div>
      )}
    </div>
  )
}

export default SearchResult;