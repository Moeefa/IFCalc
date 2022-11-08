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

export default () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [ads, setAds] = useState(null);

  /* if data var fetch fail */
  const [fetchFailed, setFetchFailed] = useState(false);
  
  const [nomeAnual, setNomeAnual] = useState("");
  const [average, setAverage] = useState({ '1': 0, '2': 0, '3': 0, '4': 0, final: 0 });
  
  const [nomeBim, setNomeBim] = useState("");
  const [numBim, setNumBim] = useState(1);
  const [bim, setBim] = useState(0);
  const [conc, setConc] = useState(0);
  const [averageBim, setAverageBim] = useState(0);

  const [opened, setOpened] = useState({ type: -1 });

  const router = useRouter();

  useEffect(() => {
    if (!window && !window.location.hash) return;
    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    if (!hasCookie("suapObj") && urlParams.get('access_token')) setCookie("suapObj", JSON.stringify({ message: "Não mostre o seu token a ninguém! Ele dá acesso tanto a sua conta do SUAP quanto do IFCalc.", token: urlParams.get('access_token') }, { maxAge: urlParams.get('expires_in') }));
    history.pushState("", document.title, window.location.pathname + window.location.search);

    if (!hasCookie("suapObj")) return;
    axios
      .get('https://suap.ifmt.edu.br/api/eu/', { headers: { Authorization: "Bearer " + JSON.parse(getCookie("suapObj")).token } })
      .then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    if (!hasCookie("suapObj")) return;
    axios
      .get('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token } })
      .then((res) => setData(res.data))
      .catch((error) => setFetchFailed(true));
  }, []);

  useEffect(() => {
    setAverageBim(((bim || 0) * 0.8) + (conc || 0));
  }, [bim, conc]);

  useEffect(() => {
    setAverage({...average, final: ((((average['1'] || 0) * 2) + ((average['2'] || 0) * 2) + ((average['3'] || 0) * 3) +  ((average['4'] || 0) * 3)) / (2 + 2 + 3 + 3)) });
  }, [average]);

  const saveData = (type) => {
    setData(null);
    switch (type) {
      case 0:
        axios
          .put('/api/user', { notas: average }, { params: { token: JSON.parse(getCookie("suapObj")).token, nome: nomeAnual, type: 0 } })
          .then((res) => setData(res.data));
        break;
      case 1:
        axios
          .put('/api/user', { notas: { nota: bim, conceito: conc } }, { params: { token: JSON.parse(getCookie("suapObj")).token, nome: nomeBim, bimestre: numBim, type: 1 } })
          .then((res) => setData(res.data));
        break;
    }
  }; 

  const deleteData = (type, name, bimestre) => {
    setData(null);
    switch (type) {
      case 0:
        axios
          .delete('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token, nome: name, type: 0 } })
          .then((res) => setData(res.data));
        break;
      case 1:
        axios
          .delete('/api/user', { params: { token: JSON.parse(getCookie("suapObj")).token, nome: name, bimestre: bimestre, type: 1 } })
          .then((res) => setData(res.data));
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

        <Tabs style={{ padding: 25 }} variant="outline" defaultValue="anual">
          <Tabs.List>
            <Tabs.Tab value="anual">Média anual</Tabs.Tab>
            <Tabs.Tab value="bimestral">Média bimestral</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="anual" pt="xs">
            {hasCookie("suapObj")
              ? <Group position="center">
                  <TextInput
                    value={nomeAnual}
                    onChange={(event) => setNomeAnual(event.currentTarget.value)}
                    placeholder="Matemática"
                    label="Nome da matéria"
                    description="Insira o nome da matéria para salvar a sua nota na sua conta"
                    className={classes.nameinput}
                  />
                </Group>
              : <></>}
            <Group position="center" spacing="lg">
              <NumberInput
                label="Média do 1º bimestre"
                max={10}
                min={0}
                defaultValue={0.0}
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setAverage({...average, '1': value })}
                className={classes.numinput}
              />

              <NumberInput
                label="Média do 2º bimestre"
                max={10}
                min={0}
                defaultValue={0.0}
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setAverage({...average, '2': value })}
                className={classes.numinput}
              />

              <NumberInput
                label="Média do 3º bimestre"
                max={10}
                min={0}
                precision={1}
                step={0.50}
                defaultValue={0.0}
                decimalSeparator=","
                onChange={(value) => setAverage({...average, '3': value })}
                className={classes.numinput}
              />

              <NumberInput
                label="Média do 4º bimestre"
                max={10}
                min={0}
                defaultValue={0.0}
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setAverage({...average, '4': value })}
                className={classes.numinput}
              />
            </Group>

            <Group position="center">
              {hasCookie("suapObj") 
                ? <Button radius="lg" style={{ marginTop: 30 }} size="xs" variant="default" color="dark" onClick={() => saveData(0)}>Salvar/Editar</Button>
                : <></>}
            </Group>
            
            <Group position="center">
              <Box className={classes.average}>
                <Text size="xl">Média final: {Number(average.final.toFixed(1)).toLocaleString("pt-BR")}</Text>
                <Divider my="sm"/>
                {average.final.toFixed(1) >= 6
                  ? <Text variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                  : <>
                      <Text variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>
                      <Text size="sm">
                        {(average['1'] === 0 || average['2'] === 0)
                          ? <>Nota necessária no 1° ou 2° bimestre: {Number((((6 - average.final) / 2) * 10).toFixed(1)).toLocaleString("pt-BR")}</>
                          : <>Nota necessária no 3° ou 4° bimestre: {Number((((6 - average.final) / 3) * 10).toFixed(1)).toLocaleString("pt-BR")}</>}
                      </Text>
                    </>}
              </Box>
            </Group>

            {hasCookie("suapObj")
              ? <>
                  <Divider my="sm"/>
                  <Group position="center">
                    {fetchFailed
                      ? <Text>Não consegui obter os dados, recarregue a página para tentar novamente</Text>
                      : !data
                        ? <Skeleton style={{ height: 75 }} className={classes.skeleton} radius="md"/>
                        : !data.data || data.data.materias_bimestral.length <= 0
                          ? <Text>Você não tem notas salvas</Text>
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
                                <Text align="center"><Text weight={700} span color="dimmed">1° bimestre: </Text> {Number(m.notas[1]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">2° bimestre: </Text> {Number(m.notas[2]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">3° bimestre: </Text> {Number(m.notas[3]).toLocaleString('pt-BR')}</Text>
                                <Text align="center"><Text weight={700} span color="dimmed">4° bimestre: </Text> {Number(m.notas[4]).toLocaleString('pt-BR')}</Text>
                                <Divider my="sm"/>
                                <Text align="center" size="xl">Média final: {Number(((((m.notas[1] || 0) * 2) + ((m.notas[2] || 0) * 2) + ((m.notas[3] || 0) * 3) +  ((m.notas[4] || 0) * 3)) / (2 + 2 + 3 + 3)).toFixed(2)).toLocaleString("pt-BR")}</Text>
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
                    value={nomeBim}
                    onChange={(event) => setNomeBim(event.currentTarget.value)}
                    placeholder="Matemática"
                    label="Nome da matéria"
                    description="Insira o nome da matéria"
                    style={{
                      display: "inline-block",
                    }}
                  />

                  <NumberInput
                    onChange={(value) => setNumBim(value)}
                    label="Bimestre"
                    description="Insira o bimestre da matéria"
                    max={4}
                    min={1}
                    defaultValue={1}
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
                label="Nota da avaliação"
                max={10}
                min={0}
                defaultValue={0.0}
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setBim(value)}
                className={classes.numinput}
              />

              <NumberInput
                label="Conceito"
                max={2}
                min={0}
                defaultValue={0.0}
                precision={1}
                step={0.5}
                decimalSeparator=","
                onChange={(value) => setConc(value)}
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
                <Text size="xl">Média do bimestre: {Number(averageBim.toFixed(1)).toLocaleString("pt-BR")}</Text>
                <Divider my="sm"/>
                {averageBim.toFixed(1) >= 6
                  ? <Text variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                  : <Text variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>}
              </Box>
              <br/>
              <Text size="xs" className={classes.warntext}>Se houver mais de 1 avaliação, some as notas e divida o resultado pela quantia de avaliações</Text>
            </Group>

            {hasCookie("suapObj")
              ? <>
                  <Divider my="sm"/>
                  <Group position="center">
                    {fetchFailed
                      ? <Text>Não consegui obter os dados, recarregue a página para tentar novamente</Text>
                      : !data
                        ? <Skeleton className={classes.skeleton} radius="md"/>
                        : !data.data || data.data.materias_bimestral.length <= 0
                          ? <Text>Você não tem notas salvas</Text>
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
                                <Text align="center" size="xl">Média bimestral: {Number((((m.notas.nota || 0) * 0.8) + (m.notas.conceito || 0)).toFixed(2)).toLocaleString("pt-BR")}</Text>
                                {Number(((m.notas.nota || 0) * 0.8) + (m.notas.conceito || 0)).toFixed(2) >= 6
                                  ? <Text align="center" variant="gradient" size="xl" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>Aprovado</Text> 
                                  : <Text align="center" variant="gradient" size="xl" gradient={{ from: 'red', to: 'pink', deg: 45 }}>Reprovado</Text>}
                              </Modal>
                              <Box className={classes.subject}>
                                <Text size="xs" color="dimmed">{m.bimestre}° bimestre</Text>
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
