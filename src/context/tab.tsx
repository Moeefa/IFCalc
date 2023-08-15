'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface ContextProps {
    active: number;
    setActive: Dispatch<SetStateAction<number>>;
}

const TabContext = createContext({
    active: 1,
    setActive: (status: number): number => 1,
});

export const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState(1);

    return (
        <TabContext.Provider value={{ active, setActive }}>
            {children}
        </TabContext.Provider>
    );
}

export const useTabContext = () => useContext(TabContext);
