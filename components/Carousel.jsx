import { useRef, useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { 
  createStyles, 
  Paper, 
  Text, 
  Title, 
  Button, 
  useMantineTheme 
} from '@mantine/core';

import Autoplay from 'embla-carousel-autoplay';
import axios from 'axios';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  card: {
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.dark[9],
  },

  image: {
    filter: 'brightness(0.5)',
    borderRadius: theme.radius.md,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.colors.dark[9],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 13,
    marginTop: theme.spacing.xs,
    whiteSpace: "pre-line",
    '@media (max-width: 768px)': {
      fontSize: 11,
    },
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: 12,
    '@media (max-width: 768px)': {
      fontSize: 10,
    },
  },
}));

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

function Card({ image, title, desc }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
    >
      {image 
        ? <Image 
            alt="ad"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 120))}`}
            src={image} 
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            className={classes.image}
          />
        : <></>}
      <div style={{ paddingLeft: 15, zIndex: 1 }}>
        <Text className={classes.category} size="xs">
          {title} 
        </Text>
        <Title order={3} className={classes.title}>
          {desc}
        </Title>
      </div>
    </Paper>
  );
}

export default function CarouselCard() {
  const [ads, setAds] = useState([{ title: "Obtendo informações...", desc: "" }]);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  useEffect(() => {
    axios
      .get('/api/ads')
      .then((res) => {
        res.data.data.length > 0
          ? setAds(res.data.data)
          : setAds([{ title: "Nenhuma informação disponível", desc: "" }]);
      });
  }, []);

  const slides = ads.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      sx={{
        width: '30%',
        '@media (max-width: 1240px)': {
          width: '100%'
        }
      }}
      slideGap="xl"
      align="start"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      controlSize={10}
      slidesToScroll={1}
      previousControlLabel="Anúncio anterior"
      nextControlLabel="Próximo anúncio"
    >
      {slides}
    </Carousel>
  );
}
