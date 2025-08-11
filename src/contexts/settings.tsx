"use client";

import { createContext, useState } from "react";

import React from "react";

interface SettingsContextProps {
	averageType: "weighted" | "simple";
	setAverageType: (
		size:
			| SettingsContextProps["averageType"]
			| ((
					prev: SettingsContextProps["averageType"],
			  ) => SettingsContextProps["averageType"]),
	) => void;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const [averageType, setAverageType] = useState<"weighted" | "simple">(
		"weighted",
	);

	return (
		<SettingsContext.Provider
			value={{
				averageType,
				setAverageType,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}
