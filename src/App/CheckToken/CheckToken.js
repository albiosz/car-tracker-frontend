import { ReactSession } from 'react-client-session';
import fetchT from '../fetchT/fetchT';

export default async function checkToken() {
  // var token = ReactSession.get("token");
  // if(token === null || token === ""){
  //   return false;
  // }
  const url = 'https://aimtrack.eastus2.azurecontainer.io:8080/health';
  const options = {
    mode: 'cors',
    headers: {
        'jwt': ReactSession.get("token")//token
    }
  };
  const timeout = 2000;

  try {
    const response = await fetchT(url, timeout, options);
    if (response.ok) {
      return true; 
    }
  } catch (e) {
    return false;
  }
}