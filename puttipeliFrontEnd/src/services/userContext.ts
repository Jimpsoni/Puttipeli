import React from "react";
import { UserContextType } from "../types";

// @ts-expect-error: Vinkuu turhasta
const userContext = React.createContext<UserContextType>({ user: null, setUser: null})

export default userContext
