'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

const TabContext = createContext({});

export const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState(0);

    return (
        <TabContext.Provider value={{ active, setActive }}>
            {children}
        </TabContext.Provider>
    );
}

export const useTabContext = () => useContext(TabContext);
