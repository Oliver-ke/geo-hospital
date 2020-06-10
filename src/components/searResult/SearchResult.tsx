import React, { FC, ReactElement } from 'react';
import { Spin } from 'antd';
import { AimOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import Card from '../card/Card';

import './searchResult.styles.scss';
interface Iresult {
  results: null | object[],
  loading: boolean,
}
//<CloudDownloadOutlined />
const SearchResult: FC<Iresult> = ({ results, loading, }): ReactElement => {
  return (
    <div className="search-result">
      {/* Check the results, if greate than 0 display item else show empty icon with message */}
      {results && results.length > 0 ? results.map((result: any) => (
        <Card key={result.id} hospital={result} />
      )) : results?.length === 0 ? (
        <div className="no-search">
          <h4>No data found</h4>
          <CloudDownloadOutlined style={{ fontSize: "30px" }} />
        </div>
      ) : null
      }

      {loading && (
        <div className="spin-container">
          <Spin />
        </div>
      )}
      {results === null && !loading && (
        <div className="no-search">
          <h4>Search for hospitals, clinics, pharmacies, etc</h4>
          <AimOutlined style={{ fontSize: "30px" }} />
        </div>
      )}
    </div>
  )
}

export default SearchResult;