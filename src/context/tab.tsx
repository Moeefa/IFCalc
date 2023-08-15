'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface ContextProps {
    active: number;
    setActive: Dispatch<SetStateAction<number>>;
}

const TabContext = createContext<ContextProps>({
    active: 0,
    setActive: (): number => 0,
});

export const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState(0);

    return (
        <TabContext.Provider value={{ active, setActive }}>
            {children}
        </TabContext.Provider>
    );
}

export const useTabContext = () => useContext(TabContext);
