import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Col } from 'antd'
import AppHeader from '../header/Header';
import SearchInput from '../searchInput/SearchInput';
import RadiusSlider from '../radiusSlider/RadiusSlider';
import SearchResult from '../searResult/SearchResult';
import request from '../../utils/request';
import PrevSearch from '../prevSearch/PrevSearch';
import { useDebounce } from '../../custom-hooks/useDebounce';
import { cacheUserSearch } from '../../utils/firebase.util';
import { getUserId } from '../../utils/idManager';

import './appLeftSide.styles.scss';


const userId = getUserId();

const AppLeftSide: FC = (): ReactElement => {
  const [result, setResult] = useState<null | object[]>(null);
  const [radius, setRadius] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [query, setQuery, { signal }] = useDebounce('');

  useEffect(() => {
    // fire api call on search change
    (async () => {
      try {
        if (!query || query.trim() === "") {
          return setResult(null);
        }
        // clear innitial inout for new query
        if (inputVal !== "") setInputVal("");
        setLoading(true);
        const data = await request(query, radius);
        setResult(data.results);

        //cache query
        await cacheUserSearch(query, userId);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Filed to make request");
      }
    })();
  }, [signal])

  const onPriveQueryClick = async (query: string) => {
    try {
      setLoading(true);
      setInputVal(query);
      const data = await request(query, radius);
      setResult(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Failed to make request")
    }
  }

  return (
    <Col xs={{ span: 19 }} md={{ span: 6 }} className="app-left-side">
      <AppHeader />
      <RadiusSlider updateSlider={setRadius} />
      <SearchInput inputVal={inputVal} updateSearchQuery={setQuery} />
      <PrevSearch onPriveQueryClick={onPriveQueryClick} />
      <SearchResult loading={loading} results={result} />
    </Col>
  )
}

export default AppLeftSide;