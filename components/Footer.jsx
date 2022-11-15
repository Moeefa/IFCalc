import Link from 'next/link';
import {
  Tooltip,
  Footer,
  Group,
  Title,
  Text
} from '@mantine/core';

export default () => {
  return (
    <Footer 
      height={75}
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
        <Link href="/privacypolicy" passHref>
          <Text size="sm" color="dimmed" variant="link" component="a">Política de privacidade</Text>
        </Link>
        <Link href="/dmca" passHref>
          <Text size="sm" color="dimmed" variant="link" component="a">DMCA</Text>
        </Link>
      </Group>
    </Footer>
  );
};
