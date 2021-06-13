import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './parts/header/Header';
import Home from './pages/home/Home';
import SnippetPage from './pages/snippet/Snippet';
import { Container } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { initFirebase } from './service/firebase/firebaseManager';

initFirebase();

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Header />
      <Container fixed>
        <BrowserRouter>
          <Home />
          <Switch>
            <Route
              exact
              path="/snippet/edit/:id(\d+)"
              component={SnippetPage}
            />
            <Route exact path="/snippet/add" component={SnippetPage} />
            <Route exact path="/snippet/:id(\d+)" component={SnippetPage} />
          </Switch>
        </BrowserRouter>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
