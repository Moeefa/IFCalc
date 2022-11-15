import Link from 'next/link';
import {
  Tooltip,
  Footer,
  Group,
  Title,
  Text
} from '@mantine/core';

export default function FooterPage() {
  return (
    <Footer 
      height={65}
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[9]
      })}
      p="xs"
    >
      <Group position="center">
        <Tooltip color="gray.1" withArrow events={{ hover: true, focus: true, touch: true }} label="🤓">
          <Title variant="gradient" gradient={{ from: 'gray.4', to: 'white', deg: 180 }} order={4}>Feito por: Luiz Henrique da Silva Xinaider</Title>
        </Tooltip>
      </Group>
      <Group position="center">
        <Text href="/privacypolicy" size="sm" color="dimmed" variant="link" component={Link}>Política de privacidade</Text>
        <Text href="/dmca" size="sm" color="dimmed" variant="link" component={Link}>DMCA</Text>
        <Text href={process.env.NEXT_PUBLIC_URL === "https://ifcalc.vercel.app/" ? "https://github.com/Moeefa/IFCalc/tree/main" : "https://github.com/Moeefa/IFCalc/tree/preview"} size="sm" color="dimmed" variant="link" component={Link}>Repositório</Text>
      </Group>
    </Footer>
  );
};
