import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './parts/header/Header';
import Home from './pages/home/Home';
import { Container } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Playground from './pages/playground/Playground';

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Header />
      <Container fixed>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Playground" component={Playground} />
          </Switch>
        </BrowserRouter>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
