import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { firestore } from '../../utils/firebase.util';
import { getUserId } from '../../utils/idManager';

import './prevSearch.styles.scss';
const userId = getUserId();
type prevSearchType = {
  onPriveQueryClick: Function
}
const PrevSearch: FC<prevSearchType> = ({ onPriveQueryClick }): ReactElement => {
  const [showDropDown, setSHowDropDown] = useState(false);
  const [prevSearch, setPreSearch] = useState<any>([]);

  useEffect(() => {
    firestore.collection(`${userId}`)
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let searches: object[] = []
        querySnapshot.forEach((doc) => {
          searches.push(doc.data());
        });
        if (searches.length > 0) setPreSearch(searches);
      })
  }, [])

  const handlePrevQueryClick = (query: string) => {
    setSHowDropDown(false);
    onPriveQueryClick(query)
  }

  return (
    <div className="prev-container">
      <Button
        onClick={() => setSHowDropDown(!showDropDown)}
        className={showDropDown ? "btn-view-searches active" : "btn-view-searches"}
      >
        View previous searches {!showDropDown ? <DownOutlined /> : <UpOutlined />}
      </Button>
      {showDropDown && (
        <div className="searches">
          {prevSearch.map(({ query }: { query: string }, idx: number) => (
            <div onClick={() => handlePrevQueryClick(query)} key={idx} className="search">
              <h3>{query}</h3>
            </div>
          ))}
          {prevSearch.length === 0 && (
            <div>
              <h4>No search History yet!</h4>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


export default PrevSearch;