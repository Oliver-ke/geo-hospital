import React, { FC, ReactElement, useState, useEffect } from "react";
import { Col } from "antd";
import AppHeader from "../header/Header";
import SearchInput from "../searchInput/SearchInput";
import RadiusSlider from "../radiusSlider/RadiusSlider";
import SearchResult from "../searResult/SearchResult";
import PrevSearch from "../prevSearch/PrevSearch";
import { useDebounce } from "../../custom-hooks/useDebounce";
import getUserLocation from "../../utils/getUserLocation";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import "./appLeftSide.styles.scss";

const GET_SEARCH_RESULT = gql`
  query userSearch($query: String!, $radius: Int!, $lng: Float!, $lat: Float!) {
    searchWithSaveHistory(
      query: $query
      radius: $radius
      lng: $lng
      lat: $lat
    ) {
      id
      address
      name
      location {
        lng
        lat
      }
    }
  }
`;

const AppLeftSide: FC = (): ReactElement => {
  const [radius, setRadius] = useState<null | number>(1000);
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<object[] | null>(null);
  const [getSearchResult, { loading, data }] = useLazyQuery(GET_SEARCH_RESULT);
  // custom hooks to debounce multiple request
  const [query, setQuery, { signal }] = useDebounce("");

  useEffect(() => {
    if (data && data.searchWithSaveHistory) {
      setResult(data.searchWithSaveHistory);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        if (!query || query.trim() === "") {
          return setResult(null);
        }
        // clear innitial input for new query
        if (inputVal !== "") setInputVal("");
        const { lat, lng } = await getUserLocation();
        getSearchResult({ variables: { query, radius, lng, lat } });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getSearchResult, inputVal, query, radius, signal]);

  const onPriveQueryClick = async (query: string, results: object[]) => {
    setInputVal(query);
    setResult(results);
  };

  return (
    <Col xs={{ span: 19 }} md={{ span: 6 }} className="app-left-side">
      <AppHeader />
      <RadiusSlider updateSlider={setRadius} />
      <SearchInput inputVal={inputVal} updateSearchQuery={setQuery} />
      <PrevSearch onPriveQueryClick={onPriveQueryClick} />
      <SearchResult loading={loading} results={result ? result : null} />
    </Col>
  );
};

export default AppLeftSide;
