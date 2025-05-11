import { createContext, useContext, useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const { data } = await axiosReq.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // Not logged in or session expired
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
