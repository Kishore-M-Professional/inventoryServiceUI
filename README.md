# Inventory Service UI

## Basic Commands

* "{}" - dynamic names, "[]" - optional.

* Create react app <i>"npx create-react-app {Your-App-Name}"</i>
* To update/install dependencies of node modules <i>"npm install [--legacy-peer-deps]"</i>
* To start server <i>"npm start"</i>
* To install redux and saga in single command <i>"npm install @reduxjs/toolkit react-redux redux-saga"</i>

## Links

* <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/"> BootStrap V5 </a>
* <a href="https://redux.js.org/introduction/getting-started">Redux ToolKit (RTK) </a>
* <a href="https://redux-saga.js.org/docs/introduction/GettingStarted">Redux-Saga </a>
* <a href="https://react-icons.github.io/react-icons"> React Icons </a>


## Description

This is a frontend service for Inventory Service developed using React JS with BootStrap Support.

## Prerequistics

How I updated the default Port to 3006?

* In package.json file under scripts of <i>start</i> need to add <i>"set PORT=3006 &&"</i> with existing statement to run the react application in PORT 3006.

Where I added BootStrap V5 changes?

* In index.html file we need to add the CSS link tag of BootStrap inside <i>head tag</i>. It need to be added before other CSS or script tags because it should load first before other things get loaded.
* BootStrap components requires some of javascript functions, they require their own JavaScript plugins and Popper. We need to add the <i>script bundle</i> of BootStrap near the end of our page in index.html file, right before the closing </body> tag, to enable them.

What is Redux Toolkit?

* Redux Toolkit (also known as "RTK" for short) is the official recommended approach for writing Redux logic. Advancded version of Traditional Redux or Redux core.
* The <i>@reduxjs/toolkit</i> package wraps around the core redux package, and contains API methods and common dependencies that we think are essential for building a Redux app. 
* Redux Toolkit builds the app in best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications. <br/>
<b>NOTE: </b> @react-redux must be installed with @reduxjs/toolkit.

How to use React Icons?

* Run the command to install react-icons <i>npm i react-icons</i>
* Use the react-icons by directly importing it to the files.
* Refer the React-Icons link for various icon features.

























<p>---------------------------------------------------------------------------------------------</p>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
