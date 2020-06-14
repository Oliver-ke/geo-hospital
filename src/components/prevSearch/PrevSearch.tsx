import React, { FC, ReactElement, useState, useEffect, Fragment } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import './prevSearch.styles.scss';

const GET_USER_HISTORY = gql`
  query gethistory{
    userHistory{
      query
      results{
        name
        address
        location{
          lng
          lat
        }
      }
    }
  }
`
type prevSearchType = {
  onPriveQueryClick: Function
}

const PrevSearch: FC<prevSearchType> = ({ onPriveQueryClick }): ReactElement => {
  const [showDropDown, setSHowDropDown] = useState(false);
  const [prevSearch, setPreSearch] = useState<any>([]);
  const { loading, error, data } = useQuery(GET_USER_HISTORY, {
    pollInterval: 500
  });

  useEffect(() => {
    if (data && data.userHistory) {
      setPreSearch(data.userHistory)
    }
  }, [data])

  const handlePrevQueryClick = (query: string, results: object[]) => {
    setSHowDropDown(false);
    onPriveQueryClick(query, results)
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
          {
            loading ? (
              <div>
                <h4>Loading...</h4>
              </div>
            ) : (
                <Fragment>
                  {prevSearch.map(
                    ({ query, results }: { query: string, results: object[] }, idx: number) => (
                      <div
                        onClick={() => handlePrevQueryClick(query, results)}
                        key={idx} className="search"
                      >
                        <h3>{query}</h3>
                      </div>
                    ))}
                </Fragment>
              )
          }
          {prevSearch.length === 0 && !loading && (
            <div>
              {!error ? (<h4>No search History yet!</h4>) : (
                <h4>Error fetching search history</h4>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


export default PrevSearch;