# Delegation Assistant frontend web

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
2. Go to `frontend` directory in this repository
3. `yarn install`
4. `yarn`

### Running the app

- `yarn dev` - for live building and starting the app on localhost
- `yarn dev:all-logs` - for live building and starting the app on localhost with all logs
- `yarn dev:req-logs` - for live building and starting the app on localhost with important logs
- `yarn dev-production` - for live building and starting the app on production
- `yarn dev-production:all-logs` - for live building and starting the app on production with all logs
- `yarn dev-production:req-logs` - for live building and starting the app on production with important logs
- `yarn build` - for building the app
- `yarn start` - for starting the app

### Tests

- `yarn test` - to start tests once
- `yarn test-watch` - to start test in watch mode
- `yarn test-update` - to re-record every snapshot that fails during tests

## Bugs

- If you type `yarn` and it marks that you have `package-lock.json` file - delete this file and type `yarn` again.

## FAQ

### How to add new page to app?

Assuming that you want to create a page that would show list of user delegations. Add new directory to `src/features`, named `DelegationListPage` (camel case required). In that directory create (according to methodology _dumb & smart components_ ) two files:

- `DelegationListPage.component.js` - _dumb component_ - this file is only displaying the contents with props passed by _smart component_,
- `DelegationListPage.container.js` - _smart component_ - this file is preparing data to show.

In addition, create one more file named: `index.js`. It is useful when you'll need to use component somewhere else. Thanks to this you do not have to distinguish _dumb & smart_, you only import the directory and `index.js` will return us the appropriate one (ie container). Example content of `index.js` file:

```javascript
import DelegationListPage from "./DelegationListPage.container";
export default DelegationListPage;
```

### How to use `react-redux`?

In this topic there are a lot of people smarter than me which will describe `react-redux` better than me so visit eg. this page [typeofweb](https://typeofweb.com/2018/04/06/react-redux-kurs-wprowadzenie-i-podstawy/).
