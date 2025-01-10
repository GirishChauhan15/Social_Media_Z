import { createContext, useContext } from "react";

export const postContext = createContext()

export const PostProvider = postContext.Provider

export const usePost = () => {return useContext(postContext)}