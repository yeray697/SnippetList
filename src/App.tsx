import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './parts/header/Header';
import Home from './pages/Home/Home';
import { Container } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Playground from './pages/Playground/Playground';

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Header />
      <main>
        <Container>
          <BrowserRouter>
            <Switch>
              <Route exact path="/Playground" component={Playground} />
              <Route path={['/:id', '/']} component={Home} />
            </Switch>
          </BrowserRouter>
        </Container>
      </main>
    </SnackbarProvider>
  );
}

export default App;
