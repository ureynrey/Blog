import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StyleContextProvider } from './context/StyleContext'
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from './context/UserContext';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#CCCCCC"
    }
  }
})


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <StyleContextProvider>
          <App />
        </StyleContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
