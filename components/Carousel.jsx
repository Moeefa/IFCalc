import { useRef, useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  card: {
    height: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    filter: 'brightness(0.5)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgb(16, 17, 19, 0.5)',
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

function Card({ image, title, desc }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div style={{ paddingLeft: 15 }}>
        <Text className={classes.category} size="xs">
          {title}
        </Text>
        <Title order={3} className={classes.title}>
          {desc}
        </Title>
      </div>
      {/*<Button variant="white" color="dark">
        Read article
      </Button>*/}
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
    >
      {slides}
    </Carousel>
  );
}
