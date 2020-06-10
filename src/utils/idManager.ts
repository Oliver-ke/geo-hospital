import { v4 as uuidv4 } from 'uuid';

export const setUserIdIfNotExist = () => {
  const idExist = localStorage.getItem("geoUserId")
  if (!idExist) {
    const newId = JSON.stringify(uuidv4());
    localStorage.setItem("geoUserId", newId);
    return newId;
  }
  return idExist;
}

export const getUserId = () => {
  const id: string | null = localStorage.getItem("geoUserId");
  if (!id) {
    return setUserIdIfNotExist();
  }
  return id;
}