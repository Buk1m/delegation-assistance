# Delegation Assistant frontend mobile

## Requirements

- [Install NodeJs](https://nodejs.org/en/download/)
- [Install Yarn](https://yarnpkg.com/en/docs/install#windows-stable)
- [VSCode](https://code.visualstudio.com/) or [WebStorm](https://www.jetbrains.com/webstorm/)

## Configuration for VSCode

Recommended extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

In your workspace/directory/whole program settings set `editor.formatOnSave` to true. This will invoke Prettier formatter to format document every time when you save it.

Optional, but recommended. It will help you code it:

- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Error Gutters](https://marketplace.visualstudio.com/items?itemName=IgorSbitnev.error-gutters)

## Configuration for WebStorm

Recommended extensions:

- [ESLint](https://plugins.jetbrains.com/plugin/7494-eslint)
- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)
- [EditorConfig](https://plugins.jetbrains.com/plugin/7294-editorconfig)

## Quick start

### Prepare project

1. Clone this repository
2. Go to `mobile` directory in this repository
3. `yarn`

### Running the app

#### Run on Android

You have to install Android Studio. If you already have it, **run emulator or device** and after that, type `yarn android` in CLI.

#### Run on iOS

Please visit https://developer.apple.com/xcode/download/ to download Xcode and the iOS simulator. If you already have the latest version of Xcode installed, you may have to run the command `sudo xcode-select -s /Applications/Xcode.app`. If the emulator is working, enter `react-native run-ios` in CLI.

### Tests

- `yarn test` - to start tests once
- `yarn test-watch` - to start test in watch mode
- `yarn test-update` - to re-record every snapshot that fails during tests

## Bugs

- If you type `yarn` and it marks that you have `package-lock.json` file - delete this file and type `yarn` again.

## FAQ

### How to add new screen to app?

Assuming that you want to create a screen that would show list of user delegations. Add new directory to `src/features`, named `DelegationListScreen` (camel case required). In that directory create (according to methodology _dumb & smart components_ ) two files:

- `DelegationListScreen.component.js` - _dumb component_ - this file is only displaying the contents with props passed by _smart component_,
- `DelegationListScreen.container.js` - _smart component_ - this file is preparing data to show.

In addition, create one more file named: `index.js`. It is useful when you'll need to use component somewhere else. Thanks to this you do not have to distinguish _dumb & smart_, you only import the directory and `index.js` will return us the appropriate one (ie container). Example content of `index.js` file:

```javascript
import DelegationListScreen from "./DelegationListScreen.container";
export default DelegationListScreen;
```

If you have already created these files, add them to the navigation.

### Navigation

The navigation files are located in the folder: `src/navigation`, and their use is explained in the [documentation of the react-navigation](https://reactnavigation.org/docs/en/navigating.html).

### How to show something only on one platform?

If you want to show something only on one platform, you should use `Platform` from package `react-native`. For example if you want to show a `<Text>` on ios you will write:

```javascript
import { Platform } from "react-native";

/// ...
return (
    {Platform.OS === 'ios' && (
        <Text>Only on ios</Text>
    )}
);
```

### How to use `react-redux`?

In this topic there are a lot of people smarter than me which will describe `react-redux` better than me so visit eg. this page [typeofweb](https://typeofweb.com/2018/04/06/react-redux-kurs-wprowadzenie-i-podstawy/).
