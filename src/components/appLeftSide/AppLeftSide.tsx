import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Col } from 'antd'
import AppHeader from '../header/Header';
import SearchInput from '../searchInput/SearchInput';
import RadiusSlider from '../radiusSlider/RadiusSlider';
import SearchResult from '../searResult/SearchResult';
import getUserLocation from '../../utils/getUserLocation';

import './appLeftSide.styles.scss';

type keyType = string | any;
const key: keyType = process.env.REACT_APP_GOOGLE_MAP;

const AppLeftSide: FC = (): ReactElement => {
  const [query, setQuery] = useState<null | String>(null);
  const [result, setResult] = useState<null | object[]>(null);
  const [radius, setRadius] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fire api call on search change
    (async () => {
      try {
        if (!query || query.trim() === "") {
          return setResult(null);
        }
        setLoading(true);
        const { lat, lng } = await getUserLocation();
        const corsProxy = "https://oke-cors.herokuapp.com/"
        const baseUri: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        const queryParams: string = encodeURI(`?keyword=${query}&radius=${radius}&location=${lat},${lng}&type=hospital`);
        const uri: string = `${corsProxy}${baseUri}${queryParams}&key=${key}`;
        const res = await fetch(uri);
        const data = await res.json();
        setResult(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Filed to make request");
      }
    })();
  }, [query, radius])
  return (
    <Col xs={{ span: 19 }} md={{ span: 6 }} className="app-left-side">
      <AppHeader />
      <RadiusSlider updateSlider={setRadius} />
      <SearchInput updateSearchQuery={setQuery} />
      <SearchResult loading={loading} results={result} />
    </Col>
  )
}

export default AppLeftSide;