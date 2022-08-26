export const additionalSettings = {
  CelestialSphere: {
    name: "CelestialSphere",
    size: 40,
    startPos: 0,
    speed: -0.0002479160869310127,
    rotationSpeed: 0,
    tilt: -23.439062,
    tiltb: 0.26,
    orbitRadius: 37.8453,
    orbitCentera: 0,
    orbitCenterb: 0,
    orbitCenterc: 0,
    orbitTilta: 0,
    orbitTiltb: 0,
    visible: true
  },

  Barycenter: {
    color: "grey",
    type: "deferent",
    visible: true,
    axesHelper: false
  },
  Earth: {
    earth: true,
    color: "blue",
    // type: "planet",
    visible: true,
    axesHelper: false,
    arrows: true,
    reverseArrows: true,
    texture: "/textures/8k_earth_daymap.jpg"
  },
  MoonDefA: {
    color: "gray",
    type: "deferent",
    visible: false,
    axesHelper: false
  },

  MoonDefB: {
    color: "gray",
    type: "deferent",
    visible: false,
    axesHelper: false
  },
  Moon: {
    color: "gray",
    type: "planet",
    visible: true,
    axesHelper: false,
    planet: true,
    texture: "/textures/planets/2k_moon.jpg"
  },

  SunDefA: {
    color: "yellow",
    type: "deferent",
    visible: false
  },
  Sun: {
    color: "yellow",
    type: "planet",
    visible: true,
    axesHelper: false,
    arrows: true,
    planet: true,
    texture: "/textures/planets/2k_sun.jpg",
    light: true,
    glow: true
  },
  MercuryDefA: {
    color: "gray",
    type: "deferent",
    visible: false
  },
  MercuryDefB: {
    color: "gray",
    type: "deferent",
    visible: false
  },
  Mercury: {
    color: "gray",
    type: "planet",
    visible: true,
    axesHelper: false,
    arrows: true,
    planet: true,
    texture: "/textures/planets/2k_mercury.jpg"
  },
  VenusDefA: {
    color: "orange",
    type: "deferent",
    visible: false
  },
  VenusDefB: {
    color: "orange",
    type: "deferent",
    visible: false
  },
  Venus: {
    color: "orange",
    type: "planet",
    visible: true,
    axesHelper: false,
    arrows: true,
    planet: true,
    texture: "/textures/planets/2k_venus.jpg"
  },
  MarsDefE: {
    color: "red",
    type: "deferent",
    visible: false
  },
  MarsDefS: {
    color: "red",
    type: "deferent",
    visible: false
  },
  Mars: {
    color: "red",
    type: "planet",
    visible: true,
    axesHelper: false,
    arrows: true,
    rotationArrows: -6.67,
    planet: true,
    texture: "/textures/planets/2k_mars.jpg"
  },
  Phobos: {
    type: "planet"
  },
  Deimos: {
    type: "planet"
  },
  JupiterDef: {
    type: "deferent",
    visible: false
  },
  Jupiter: {
    color: 0xcdc2b2,
    type: "planet",
    visible: true,
    planet: true,
    texture: "/textures/planets/2k_jupiter.jpg"
  },
  SaturnDef: {
    type: "deferent",
    visible: false
  },
  Saturn: {
    color: 0xa79662,
    type: "planet",
    visible: true,
    planet: true,
    texture: "/textures/planets/2k_saturn.jpg"
  }
};
