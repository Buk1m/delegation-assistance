# Delegation Assistant frontend

## Requirements

- [Install NodeJs](https://nodejs.org/en/download/)
- [Install Yarn](https://yarnpkg.com/en/docs/install#windows-stable)

## Nice to have

VSCode with extensions:

- ESLint
- Prettier
- EditorConfig for VSCode

In your workspace/directory/whole program settings set `editor.formatOnSave` to true. This will invoke Prettier formatter to format document every time when you save it.

Optional but I recommend it and it will help you with coding

- ES7 React/Redux/GraphQL/React-Native snippets
- React Native Tools
- Error Gutters

## Quick start

### Prepare project

1. Clone this repository
2. `cd ./idemia/frontend`
3. `npm i`
4. Delete file `package-lock.json` if exists
5. `yarn`

### Using app

**Run on Android**

You need to have installed Android Studio with SDK version 28.0.0. If you have it, run emulator on AVD Packager and after that, type `yarn android` in CLI.

**Run on iOS**

Please visit https://developer.apple.com/xcode/download/ to download Xcode and the iOS simulator. If you already have the latest version of Xcode installed, you may have to run the command `sudo xcode-select -s /Applications/Xcode.app`. Type `yarn ios` in CLI.

**Run tests**

Run this command to test app

`yarn test`

## Bugs

- If you type `yarn` and it marks that you have `package-lock.json` file - delete this file and type `yarn` again.

## FAQ

### How to add new page to app?

Let's assume that we want to create a page which is showing a list of our delegations. We are adding to directory `src/features` new directory named `DelegationListPage`. In this directory we area creating (methodology _dumb & smart components_ ) two files:'

- `DelegationListPage.component.js` - _dumb component_ - this file is only displaying the contents with props passed by _smart component_,
- `DelegationListPage.container.js` - _smart component_ - this file is preparing data to show.

In addition, we create one more file: `index.js`. It is useful when we need this component somewhere else. Thanks to this we do not have to distinguish _dumb & smart_, we only import the directory and `index.js` will return us the appropriate one (ie container). Example content of `index.js` file:

```javascript
import DelegationListPage from "./DelegationListPage.container";
export default DelegationListPage;
```

**Our new page DelegationList should work at _ourapp.pl/delegationlist_**

### How to show something only on one platform?

If we want to show something only on one platform, we use `Platform` from package `react-native`. For example if we want to show a `<Text>` on ios we will write:

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
