import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, hasCookie, getCookie, deleteCookie } from 'cookies-next';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ data, setData ] = useState(null);
  
  useEffect(() => {
    if (!window && !window.location.hash) return;
    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    if (!hasCookie("suapObj") && urlParams.get('access_token')) setCookie("suapObj", JSON.stringify({ token: urlParams.get('access_token'), expires: new Date(new Date().getTime() + urlParams.get('expires_in') * 1000) }));
    history.pushState("", document.title, window.location.pathname + window.location.search);

    if (!hasCookie("suapObj")) return;

    if (Date.parse(new Date()) > Date.parse(JSON.parse(getCookie("suapObj")).expires)) {
      deleteCookie("suapObj");
    };
  }, []);

  return (
    DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  return useContext(GuildsContext);
}
