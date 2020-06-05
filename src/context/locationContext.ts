import { createContext } from 'react'

export const LocationContex = createContext<any | undefined>(undefined);


export const initialState = {
  lat: null,
  lng: null,
  name: null
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CARD_SELECTED":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
};