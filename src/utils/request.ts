import getUserLocation from './getUserLocation';


type keyType = string | any;
const key: keyType = process.env.REACT_APP_GOOGLE_MAP;

export default async (query: string, radius: number | null) => {
  try {
    const { lat, lng } = await getUserLocation();
    const corsProxy = "https://oke-cors.herokuapp.com/";
    let searchEntity = 'textsearch'
    const baseUri: string = `https://maps.googleapis.com/maps/api/place/${searchEntity}/json`;
    let queryParams: string = encodeURI(`?query=${query}&location=${lat},${lng}&radius=${radius}&type=hospital`);
    const matchKeyword = checkTypeFromQuery(query);
    if (matchKeyword) {
      searchEntity = "nearbysearch";
      queryParams = encodeURI(`?keyword=${query}&location=${lat},${lng}&radius=${radius}`);
    }
    const uri: string = `${corsProxy}${baseUri}${queryParams}&key=${key}`;
    const res = await fetch(uri);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

const checkTypeFromQuery = (query: string): string | boolean => {
  const queryLowerCase = query.toLocaleLowerCase();
  const regex = new RegExp(/ \b(\w*pharmacies|pharmacy|clinics|clinic|medical offices|medical office\w*)\b/);
  const isMatch = regex.exec(queryLowerCase);
  if (isMatch) {
    return queryLowerCase;
  }
  return false;
}