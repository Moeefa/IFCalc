'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface ContextProps {
    tab: string,
    setTab: Dispatch<SetStateAction<string>>,
}

const TabContext = createContext<ContextProps>({
    tab: 'final',
    setTab: (): string => '',
});

export const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [tab, setTab] = useState('final');

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    );
}

export const useTabContext = () => useContext(TabContext);
