import axios from 'axios';
import { useState } from 'react';
import { IconCookie } from '@tabler/icons';
import { useRouter } from 'next/router';
import { hasCookie, getCookie, deleteCookie } from 'cookies-next';
import {
  Header,
  Button,
  Modal,
  Group
} from '@mantine/core';

export default function HeaderPage() {
  const router = useRouter();

  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    axios
      .post("https://suap.ifmt.edu.br/o/revoke_token/", {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        token: JSON.parse(getCookie("suapObj").toString()).token
      });
    
    deleteCookie("suapObj");
    router.push("/");
  };

  const handleLogin = () => {
    router.push(`https://suap.ifmt.edu.br/o/authorize/?response_type=token&grant_type=implicit&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=identificacao%20email&redirect_uri=https://${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "ifcalc.vercel.app" : "ifcalc-git-preview-moeefa.vercel.app"}/`);
  };

  return (
    <>
      <Modal 
        styles={(theme) => ({
          modal: {
            backgroundColor: theme.colors.dark[6],
          }
        })}
        radius="sm" 
        lockScroll 
        opened={opened} 
        onClose={() => setOpened(false)} 
        centered 
        withCloseButton 
        title={[<IconCookie style={{ verticalAlign: "middle" }}/>, " Cookies"]}
      >
        Usamos cookies para salvar o seu login! Ao logar com sua conta no SUAP, você estará nos autorizando a utilizar estes cookies.
        <br/>
        <Group position="center">
          <Button radius="lg" style={{ marginTop: 30 }} size="xs" variant="default" color="dark" onClick={handleLogin}>Continuar</Button>
        </Group>
      </Modal>
      <Header
        height={60}
        withBorder={false}
        sx={(theme) => ({
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
        })}
        p="xs"
      >
        <Group sx={{ height: '100%' }} px={20} position="right">
          {!hasCookie("suapObj")
            ? <Button radius="lg" size="xs" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={() => setOpened(true)}>Entrar com SUAP</Button>
            : <Button radius="lg" size="xs" variant="gradient" gradient={{ from: 'red', to: 'crimson' }} onClick={handleLogout}>Sair</Button>}
        </Group>
      </Header>
    </>
  );
};
