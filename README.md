# Spatial audio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

default mode
processor.setNsParams({
  attackFactor: 0.9,
  releaseFactor: 0.85,
  upperBound: 0.9,
  upperMask: 1.0,
  lowerBound: 0.08,
  lowerMask: 0.05,
  triangle1: 0.0,
  triangle2: 0.0,
  triangle3: 1.0,
  thresholdAI: 1.0,
  thresholdStastical: 0.0,
  enhFactorAI: 1.0,
  enhFactorStastical: 2.0,
  noiseOverEstimate: 1.101,
  statisticalBound: 0.0,
  gainBoostFrq1: 120.0,
  gainBoostGain1: 1.0,
  gainBoostFrq2: 1600.0,
  gainBoostGain2: 1.0,
  gainBoostFrq3: 5000.0,
  gainBoostGain3: 1.121,
  finalLowerMask: 0.03,
  noisePowFloor: 0.0001,
  statisticalComplexity:0,
  cngBaseMagnitude:0.0,
  strategy: 0
});

aggresive mode
processor.setNsParams({
  "attackFactor":0.92,
  "releaseFactor":0.9,
  "upperBound":0.9,
  "upperMask":1,
  "lowerBound":0.015,
  "lowerMask":0.006,
  "triangle1":0,
  "triangle2":0,
  "triangle3":1,
  "thresholdAI":1,
  "thresholdStastical":0,
  "enhFactorAI":1,
  "enhFactorStastical":2,
  "noiseOverEstimate":1.101,
  "statisticalBound":0,
  "gainBoostFrq1": 120.0,
  "gainBoostGain1": 1.0,
  "gainBoostFrq2": 1600.0,
  "gainBoostGain2": 1.0,
  "gainBoostFrq3": 5000.0,
  "gainBoostGain3": 1.121,
  "finalLowerMask": 0.008,
  "noisePowFloor": 0.000001,
  "statisticalComplexity": 0,
  "cngBaseMagnitude": 0.0,
  "strategy":0
});