import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  AppShell,
  Title,
  Text
} from '@mantine/core';

const Privacy = () => {
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
          Esta página é dedicada à política de privacidade oferecida pelo nosso serviço.
          <br/><br/>
          Nesta página você encontrará como utilizamos e obtemos os seus dados,
          se o utilizador quiser fazer alguma reclamação ou excluir seus dados completamente de nosso banco de dados
          entre em contato:{" "}
          <Link href="mailto:luizhenrique.xinaider.ifmt@gmail.com" passHref>
            <Text variant="link" component="a">luizhenrique.xinaider.ifmt@gmail.com</Text>
          </Link>
          <br/><br/>
          <Title order={3} align="center">Coleta e uso de dados do usuário</Title>
          Ao iniciar uma sessão com o SUAP em nosso site, coletamos apenas 
          informações básicas, como suas matérias e as respectivas notas bimestrais, o número de matrícula para podermos identificar 
          o usuário e procurar por notas salvas em nosso banco de dados para facilitar a utilização.
          <br/><br/>
          Ao clicar no botão de salvar quando estiver iniciado uma sessão com o SUAP, as notas do usuário 
          ficarão salvas no banco de dados do nosso site.
        </Text>
      </AppShell>
    </>
  );
};

export default Privacy;
