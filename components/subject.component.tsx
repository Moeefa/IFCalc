'use client';

import {
  Button,
  Card,
  CardHeader,
  CardBody, 
  CardFooter,
  AccordionItem,
  useDisclosure,
} from "@nextui-org/react";

export default function SubjectCard({ key, name, grade }: { key: number, name: string, grade: { [index: string]: number | string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const final = (((Number(grade["1"] || 0) * 2) + (Number(grade["2"] || 0) * 2) + (Number(grade["3"] || 0) * 3) +  (Number(grade["4"] || 0) * 3)) / (2 + 2 + 3 + 3));

  return (
    <>
      <AccordionItem 
        key={key}
        aria-label={name} 
	title={name}
	subtitle={
	  <p className={`font-semibold text-transparent bg-clip-text b
g-gradient-to-b ${final >= 6 ? "from-blue-600 to-blue-800" : "from-red-600 to-red-800"}`}>
	    {final >= 6 ? "Aprovado" : "Reprovado"}
	  </p>
	}
      >
	Teste
      </AccordionItem>
    </>
  );
}
