'use client';

import {
  Button,
  Card,
  CardHeader,
  CardBody, 
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function SubjectCard({ name, grade }: { name: string, grade: { [index: string]: number | string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="w-16">
        <CardBody className="flex justify-between">
          <div>
            <p className="text-default-400">{name}</p>
          </div>
          <div>
            <Button onPress={onOpen} radius="full">Ver nota</Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
              <ModalBody>
                Teste
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
