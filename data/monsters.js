const monsters = {
  Glacifire: {
    position: {
      x: 280,
      y: 310
    },
    image: {
      src: './img/glacifire.png'
    },
    frames: {
      max: 5,
      hold: 30
    },
    animate: true,
    name: 'Glacifire',
    attacks: [attacks.Frostbite, attacks.Aurburst]
  },
  Flamehop: {
    position: {
      x: 780,
      y: 100
    },
    image: {
      src: './img/flamehopSprite.png'
    },
    frames: {
      max: 5,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Flamehop',
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Golddigger: {
    position: {
      x: 780,
      y: 100
    },
    image: {
      src: './img/golddigger.png'
    },
    frames: {
      max: 6,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Golddigger',
    attacks: [attacks.Tackle, attacks.RockyRoad]
  },
}
