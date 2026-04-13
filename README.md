# FinSim

A demo finance app built with [**React Native**](https://reactnative.dev) to showcase real-world mobile testing patterns — including Detox E2E tests, network condition simulation, and stable testID-based selectors.

## Design Decisions

**Why Detox over Appium?**
Detox uses a Gray Box approach — it communicates directly with the React Native bridge rather than through the UI layer. This means tests are faster, more reliable, and can synchronize with async JS operations natively. At Masterworks, I chose Detox specifically because of the React Native stack.

**Why real-world condition simulation?**
Happy-path tests don't find production bugs. At Masterworks, I introduced network latency injection and offline mode simulation after we discovered payment failures on slow connections that our CI suite had never caught. These tests now run in every PR pipeline.

**Why testIDs instead of accessibility labels?**
testIDs are decoupled from display text and localization. Accessibility labels change with copy; testIDs are stable test contracts between the engineer and the test author.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Install dependencies

```sh
npm install
bundle install          # first time only
bundle exec pod install # after first clone or updating native deps
```

### Run the app

```sh
npm start       # start Metro
npm run ios     # run on iOS Simulator
npm run android # run on Android Emulator
```

### Detox E2E Tests

Build and run tests against the iOS Simulator (iPhone 17 Pro) or Android Emulator (Pixel 7 API 34):

```sh
npm run build-ios    # build iOS debug binary for Detox
npm run test-ios     # run Detox tests on iOS Simulator

npm run build-droid  # build Android debug APK for Detox
npm run test-droid   # run Detox tests on Android Emulator
```
