import { createContext, useContext } from "react";

export const userContext = createContext()

export const UserProvider = userContext.Provider

export const useUserDetails = () => {return useContext(userContext)}