import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import LoggedInHomePage from "./pages/LoggedInHomePage";
import PostDetailPage from "./pages/PostDetailPage";
import NominationDetailPage from "./pages/NominationDetailPage";
import CreatePage from "./pages/CreatePage";
import CreateRecognitionPage from "./pages/CreateRecognitionPage";
import CreateNominationPage from "./pages/CreateNominationPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" component={LoggedInHomePage} />
          <Route exact path="/posts" component={PostDetailPage} />
          <Route exact path="/nominations" component={NominationDetailPage} />
          <Route exact path="/create" component={CreatePage} />
          <Route
            exact
            path="/create/recognition"
            component={CreateRecognitionPage}
          />
          <Route
            exact
            path="/create/nomination"
            component={CreateNominationPage}
          />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/login" render={() => <h1>Log in</h1>} />
          <Route exact path="/register" render={() => <h1>Register</h1>} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
