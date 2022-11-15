import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconCookie } from '@tabler/icons';
import { useRouter } from 'next/router';
import { setCookie, hasCookie, getCookie, deleteCookie } from 'cookies-next';
import {
  UnstyledButton,
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
        token: JSON.parse(getCookie("suapObj")).token
      });
    deleteCookie("suapObj");
    setData(null);
    router.push("/");
  };

  const handleLogin = () => {
    router.push(`https://suap.ifmt.edu.br/o/authorize/?response_type=token&grant_type=implicit&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=identificacao%20email&redirect_uri=${process.env.NEXT_PUBLIC_URL}`);
  };

  return (
    <>
      <Modal radius="md" lockScroll opened={opened} onClose={() => setOpened(false)} centered withCloseButton title={[<IconCookie style={{ verticalAlign: "middle" }}/>, " Cookies"]}>
        Usamos cookies para salvar o seu login! Ao logar com sua conta no SUAP, você estará nos autorizando a utilizar estes cookies.
        <br/>
        <Group position="center">
          <Button radius="lg" style={{ marginTop: 30 }} size="xs" variant="default" color="dark" onClick={handleLogin}>Continuar</Button>
        </Group>
      </Modal>
      <Header
        height={60}
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[9]
        })}
        p="xs"
      >
        <Group sx={{ height: '100%' }} px={20} position="apart">
          {!hasCookie("suapObj")
            ? <div style={{ float: "right" }}><Button radius="lg" size="xs" variant="default" color="dark" onClick={() => setOpened(true)}>Login</Button></div>
            : <div style={{ float: "right" }}><Button radius="lg" size="xs" variant="default" color="dark" onClick={handleLogout}>Logout</Button></div>}
        </Group>
      </Header>
    </>
  );
};
