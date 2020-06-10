
interface posType {
  lat: number,
  lng: number
}

export default () => new Promise<posType | any>((resolve, reject) => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition((position) => {
      const pos: posType = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      resolve(pos);
    }, () => {
      reject("Failed to get users location")
    }, options);
  } else {
    reject("Browser does not support location")
  }
})