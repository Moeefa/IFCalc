import Image from 'next/image';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, hasCookie, getCookie, deleteCookie } from 'cookies-next';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons';
import {
  NumberInput,
  ActionIcon,
  TextInput,
  AppShell,
  Skeleton,
  Divider,
  Button,
  Loader,
  Group,
  Modal,
  Tabs,
  Text,
  Box,
  useMantineTheme
} from '@mantine/core';

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  numinput: {
    width: 150,
  },
  
  average: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    marginTop: 15,
    width: "95%",
    minWidth: "5%",
    '@media (min-width: 500px)': {
      width: "25%",
    },
  },

  subject: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    marginTop: 5,
    width: "95%",
    height: 97,
    minWidth: "5%",
    '@media (min-width: 1100px)': {
      width: "25%",
    },
  },

  skeleton: {
    marginTop: 5,
    width: "95%",
    minWidth: "5%",
    height: 97,
    alignItems: "center",
    '@media (min-width: 1100px)': {
      width: "25%",
    },
  },

  warntext: {
    marginTop: 5,
    width: "80%",
    minWidth: "5%",
    '@media (min-width: 500px)': {
      width: "25%",
    },
  },

  nameinput: {
    marginBottom: 30
  },

  wraptext: {
    flex: 1,
    maxWidth: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

const Page = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const [data, setData] = useState(null);
  const [ads, setAds] = useState(null);

  /* if data var fetch fail */
  const [axiosFailed, setAxiosFailed] = useState(false);
  
  const [year, setYear] = useState({ nome: '', '1': 0, '2': 0, '3': 0, '4': 0, avg: 0 });
  const [bim, setBim] = useState({ nome: '', bimestre: 1, nota: 0, conceito: 0, avg: 0 });
  
  const [opened, setOpened] = useState({ type: -1 });
  
  useEffect(() => {
    if (!window.location.hash) return;
    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    if (!hasCookie("suapObj") && urlParams.get('access_token')) setCookie("suapObj", JSON.stringify({ message: "N??o mostre o seu token a ningu??m! Ele d?? acesso tanto a sua conta do SUAP quanto do IFCalc.", token: urlParams.get('access_token') }, { maxAge: urlParams.get('expires_in') }));
    
    router.push('/', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    if (!hasCookie("suapObj")) return;
    axios
      .get('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token } })
      .then((res) => setData(res.data))
      .catch((error) => setAxiosFailed(true));
  }, []);

  useEffect(() => {
    setBim({...bim, avg: ((bim.nota || 0) * 0.8) + (bim.conceito || 0) });
  }, [bim.nota, bim.conceito]);

  useEffect(() => {
    setYear({...year, avg: ((((year['1'] || 0) * 2) + ((year['2'] || 0) * 2) + ((year['3'] || 0) * 3) +  ((year['4'] || 0) * 3)) / (2 + 2 + 3 + 3)) });
  }, [year['1'], year['2'], year['3'], year['4']]);

  const saveData = (type) => {
    setData(null);
    switch (type) {
      case 0:
        axios
          .put('/api/user', { notas: year }, { params: { token: JSON.parse(getCookie("suapObj")).token, nome: year.nome, type: 0 } })
          .then((res) => setData(res.data))
          .catch((error) => setAxiosFailed(true));
        break;
      case 1:
        axios
          .put('/api/user', { notas: { nota: bim.nota, conceito: bim.conceito } }, { params: { token: JSON.parse(getCookie("suapObj")).token, nome: bim.nome, bimestre: bim.bimestre, type: 1 } })
          .then((res) => setData(res.data))
          .catch((error) => setAxiosFailed(true));
        break;
    }
  }; 

  const deleteData = (type, name, bimestre) => {
    setData(null);
    switch (type) {
      case 0:
        axios
          .delete('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token, nome: name, type: 0 } })
          .then((res) => setData(res.data))
          .catch((error) => setAxiosFailed(true));
        break;
      case 1:
        axios
          .delete('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token, nome: name, bimestre: bimestre, type: 1 } })
          .then((res) => setData(res.data))
          .catch((error) => setAxiosFailed(true));
        break;
    }
  };
  
  return (
    <>
      {/*hasCookie("suapObj") 
        ? <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
        : <></>*/}

      <AppShell header={<Header/>} footer={<Footer/>}>
        <Group position="center">
          <Carousel/>
        </Group>

        <Tabs variant="outline" radius="md" style={{ padding: 25 }} defaultValue="anual">
          <Tabs.List>
            <Tabs.Tab value="anual">M??dia anual</Tabs.Tab>
            <Tabs.Tab value="bimestral">M??dia bimestral</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="anual" pt="xs">
            {hasCookie("suapObj")
              ? <Group position="center">
                  <TextInput
                    value={year.nome}
                    onChange={(event) => setYear({...year, nome: event.currentTarget.value})}
                    placeholder="Matem??tica"
                    label="Nome da mat??ria"
                    description="Insira o nome da mat??ria para salvar a sua nota na sua conta"
                    className={classes.nameinput}
                  />
                </Group>
              : <></>}
            <Group position="center" spacing="lg">
              {[...Array(4)].map((_, i) => (
                <NumberInput
                  key={i + 1}
                  label={`M??dia do ${i + 1}?? bimestre`}
                  max={10}
                  min={0}
                  placeholder="0,0"
                  precision={1}
                  step={0.5}
                  decimalSeparator=","
                  onChange={(value) => setYear({...year, [`${i + 1}`]: value })}
                  className={classes.numinput}
                />
              ))}
            </Group>

            <Group position="center">
              {hasCookie("suapObj") 
                ? <Button radius="lg" style={{ marginTop: 30 }} size="xs" variant="default" color="dark" onClick={() => saveData(0)}>Salvar/Editar</Button>
                : <></>}
            </Group>
            
            <Group position="center">
              <Box className={classes.average}>
                <Text size="xl">M??dia final: {Number(year.avg.toFixed(2)).toLocaleString("pt-BR")}</Text>
                <Divider my="sm"/>
                {year.avg.toFixed(2) >= 6
                  ? <Text variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                  : <>
                      <Text variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>
                      <Text size="sm">
                        {(year['1'] === 0 || year['2'] === 0)
                          ? <>Nota necess??ria no 1?? ou 2?? bimestre: {Number((((6 - year.avg) / 2) * 10).toFixed(2)).toLocaleString("pt-BR")}</>
                          : <>Nota necess??ria no 3?? ou 4?? bimestre: {Number((((6 - year.avg) / 3) * 10).toFixed(2)).toLocaleString("pt-BR")}</>}
                      </Text>
                    </>}
              </Box>
            </Group>

            {hasCookie("suapObj")
              ? <>
                  <Divider my="sm"/>
                  <Group position="center">
                    {axiosFailed
                      ? <Text>N??o consegui obter os dados, recarregue a p??gina para tentar novamente, se persistir entre em contato: <Text href="mailto:luizhenrique.xinaider.ifmt@gmail.com" variant="link" component={Link}>luizhenrique.xinaider.ifmt@gmail.com</Text></Text>
                      : !data
                        ? <Skeleton style={{ height: 75 }} className={classes.skeleton} radius="md"/>
                        : !data.data || (data.data && data.data.materias_anual && data.data.materias_anual.length <= 0)
                          ? <Text>Voc?? n??o tem notas salvas</Text>
                          : data.data.materias_anual.sort((a, b) => a.nome.localeCompare(b.nome) || a.bimestre - b.bimestre).map(m => (
                            <>
                              <Modal styles={(theme) => ({
                                modal: {
                                  width: "25%",
                                  '@media (max-width: 768px)': {
                                    width: "75%",
                                  },
                                } 
                              })} radius="md" title={m.nome} centered opened={opened.type === 0 && opened.nome === m.nome} onClose={() => setOpened({ type: -1 })}>
                                <Text align="center"><Text weight={700} span color="dimmed">1?? bimestre: </Text> {Number(m.notas[1]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">2?? bimestre: </Text> {Number(m.notas[2]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">3?? bimestre: </Text> {Number(m.notas[3]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">4?? bimestre: </Text> {Number(m.notas[4]).toLocaleString('pt-BR')}</Text>
                                <Divider my="sm"/>
                                <Text align="center" size="xl">M??dia final: {Number(((((m.notas[1] || 0) * 2) + ((m.notas[2] || 0) * 2) + ((m.notas[3] || 0) * 3) +  ((m.notas[4] || 0) * 3)) / (2 + 2 + 3 + 3)).toFixed(2)).toLocaleString("pt-BR")}</Text>
                                {Number((((m.notas[1] || 0) * 2) + ((m.notas[2] || 0) * 2) + ((m.notas[3] || 0) * 3) +  ((m.notas[4] || 0) * 3)) / (2 + 2 + 3 + 3)).toFixed(2) >= 6
                                  ? <Text align="center" variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                                  : <Text align="center" variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>}
                              </Modal>
                              <Box style={{ height: 75 }} className={classes.subject}>
                                <div style={{ flex: 1, display: "flex" }}>
                                  <Text className={classes.wraptext}>{m.nome}</Text>
                                  <div style={{ display: "flex", gap: 12, marginLeft: 4 }}>
                                    <ActionIcon onClick={() => deleteData(0, m.nome)} color="red" radius="xl" variant="light"><IconTrash size={18}/></ActionIcon>
                                    <Button onClick={() => setOpened({ nome: m.nome, type: 0 })} radius="lg" size="xs" variant="default" color="dark">Ver nota</Button>
                                  </div>
                                </div>
                              </Box>
                            </>
                          ))}
                  </Group>
                </>
              : <></>}
          </Tabs.Panel>
          <Tabs.Panel value="bimestral" pt="xs">
            {hasCookie("suapObj")
              ? <Group style={{ marginBottom: 30 }} position="center">
                  <TextInput
                    value={bim.nome}
                    onChange={(event) => setBim({...bim, nome: event.currentTarget.value})}
                    placeholder="Matem??tica"
                    label="Nome da mat??ria"
                    description="Insira o nome da mat??ria"
                    style={{
                      display: "inline-block",
                    }}
                  />

                  <NumberInput
                    onChange={(value) => setBim({...bim, bimestre: value})}
                    label="Bimestre"
                    description="Insira o bimestre da mat??ria"
                    max={4}
                    min={1}
                    placeholder="1"
                    step={1}
                    style={{
                      width: 150,
                      display: "inline-block",
                    }}
                  />
                </Group>
              : <></>}
            <Group position="center" spacing="lg">
              <NumberInput
                label="Nota da avalia????o"
                max={10}
                min={0}
                placeholder="0,0"
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setBim({...bim, nota: value})}
                className={classes.numinput}
              />

              <NumberInput
                label="Conceito"
                max={2}
                min={0}
                placeholder="0,0"
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setBim({...bim, conceito: value})}
                className={classes.numinput}
              />
            </Group>

            <Group position="center">
              {hasCookie("suapObj") 
                ? <Button radius="lg" style={{ marginTop: 30 }} size="xs" variant="default" color="dark" onClick={() => saveData(1)}>Salvar/Editar</Button>
                : <></>}
            </Group>

            <Group position="center">
              <Box className={classes.average}>
                <Text size="xl">M??dia do bimestre: {Number(bim.avg.toFixed(2)).toLocaleString("pt-BR")}</Text>
                <Divider my="sm"/>
                {bim.avg.toFixed(2) >= 6
                  ? <Text variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                  : <Text variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>}
              </Box>
              <br/>
              <Text size="xs" className={classes.warntext}>Se houver mais de 1 avalia????o, some as notas e divida o resultado pela quantia de avalia????es</Text>
            </Group>

            {hasCookie("suapObj")
              ? <>
                  <Divider my="sm"/>
                  <Group position="center">
                    {axiosFailed
                      ? <Text>N??o consegui obter os dados, recarregue a p??gina para tentar novamente, se persistir entre em contato: <Text href="mailto:luizhenrique.xinaider.ifmt@gmail.com" variant="link" component={Link}>luizhenrique.xinaider.ifmt@gmail.com</Text></Text>
                      : !data
                        ? <Skeleton className={classes.skeleton} radius="md"/>
                        : !data.data || (data.data && data.data.materias_bimestral && data.data.materias_bimestral.length <= 0)
                          ? <Text>Voc?? n??o tem notas salvas</Text>
                          : data.data.materias_bimestral.sort((a, b) => a.nome.localeCompare(b.nome)).map(m => (
                            <>
                              <Modal styles={(theme) => ({
                                modal: {
                                  width: "25%",
                                  '@media (max-width: 768px)': {
                                    width: "75%",
                                  },
                                } 
                              })} radius="md" title={m.nome} centered opened={opened.type === 1 && opened.nome === m.nome && opened.bimestre === m.bimestre} onClose={() => setOpened({ type: -1 })}>
                                <Text align="center"><Text weight={700} span color="dimmed">Nota do bimestre: </Text> {Number(m.notas.nota).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">Conceito: </Text> {Number(m.notas.conceito).toLocaleString('pt-BR')}</Text>
                                <Divider my="sm"/>
                                <Text align="center" size="xl">M??dia bimestral: {Number((((m.notas.nota || 0) * 0.8) + (m.notas.conceito || 0)).toFixed(2)).toLocaleString("pt-BR")}</Text>
                                {Number(((m.notas.nota || 0) * 0.8) + (m.notas.conceito || 0)).toFixed(2) >= 6
                                  ? <Text align="center" variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                                  : <Text align="center" variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>}
                              </Modal>
                              <Box className={classes.subject}>
                                <Text size="xs" color="dimmed">{m.bimestre}?? bimestre</Text>
                                <div style={{ flex: 1, display: "flex" }}>
                                  <Text className={classes.wraptext}>{m.nome}</Text>
                                  <div style={{ display: "flex", gap: 12, marginLeft: 4 }}>
                                    <ActionIcon onClick={() => deleteData(1, m.nome, m.bimestre)} color="red" radius="xl" variant="light"><IconTrash size={18}/></ActionIcon>
                                    <Button onClick={() => setOpened({ nome: m.nome, bimestre: m.bimestre, type: 1 })} radius="lg" size="xs" variant="default" color="dark">Ver nota</Button>
                                  </div>
                                </div>
                              </Box>
                            </>
                          ))}
                  </Group>
                </>
              : <></>}
          </Tabs.Panel>
        </Tabs>
      </AppShell>
    </>
  );
};

export default Page;
