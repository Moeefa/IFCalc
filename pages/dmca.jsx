import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import {
  AppShell,
  Text,
  List,
  useMantineTheme
} from '@mantine/core';

export default function DMCA() {
  const theme = useMantineTheme();

  return (
    <>
      <AppShell header={<Header/>} footer={<Footer/>}>
        <Text 
          style={{
            padding: 25,
            textAlign: "justify",
            textJustify: "inter-word"
          }}
        >
          <Link href="mailto:luizhenrique.xinaider.ifmt@gmail.com" passHref>
            <Text variant="link" component="a">luizhenrique.xinaider.ifmt@gmail.com</Text>
          </Link>
          <br/>
          Se o proprietário dos direitos autorais acreditar que sua obra foi copiada sem permissão, você deverá especificar as informações a seguir. Seu aviso de retirada deve conter as seguintes informações:
          <br/>
          O proprietário dos direitos autorais ou agente designado deve:
          <br/>
          <List type="ordered">
            <List.Item>Apresentar uma assinatura física ou eletrônica.</List.Item>
            <List.Item>Apresentar uma descrição da obra cujos direitos autorias foram violados.</List.Item>
            <List.Item>Identificar onde tal obra está localizada no site.</List.Item>
            <List.Item>Especificar informações de contato, como nome, endereço, número de telefone e e-mail.</List.Item>
            <List.Item>Apresentar uma declaração de boa-fé de que o uso que resultou na violação não foi autorizado pelo proprietário dos direitos autorais, seu agente designado ou a legislação.</List.Item>
            <List.Item>Apresentar uma declaração sob pena de perjúrio de que as informações contidas no aviso são precisas e de que o remetente é o proprietário dos direitos autorais ou um agente autorizado a atuar em nome do proprietário.</List.Item>
          </List>
          <br/>
          O proprietário dos direitos autorais ou seu agente designado que fizer declarações falsas relacionadas à violação de direitos autorais poderá ser responsabilizado por danos incorridos como resultado da remoção ou do bloqueio da suposta obra sob direitos autorais.
        </Text>
      </AppShell>
    </>
  );
};
