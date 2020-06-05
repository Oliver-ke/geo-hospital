import { createContext } from 'react'

export const locationContext = createContext<any | undefined>(undefined);


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
    case "SET_USER_LOCATION":
      return {
        ...state,
        ...action.payload,
        name: "Your current location from IP"
      }
    default:
      return state
  }
};