import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";

// Pages
import HomeFeedPage from "./pages/home/HomeFeedPage";
import CreateRecognitionPage from "./pages/recognitions/CreateRecognitionPage";
import RecognitionDetailPage from "./pages/recognitions/RecognitionDetailPage";
import UpdateRecognitionPage from "./pages/recognitions/UpdateRecognitionPage";
import CreateNominationPage from "./pages/nominations/CreateNominationPage";
import NominationDetailPage from "./pages/nominations/NominationDetailPage";
import UpdateNominationPage from "./pages/nominations/UpdateNominationPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  const { currentUserLoaded } = useCurrentUser();

  if (!currentUserLoaded) return null; // prevents broken rendering

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" component={HomeFeedPage} />

          {/* Create, Update and Detail for Recognitions */}
          <Route
            exact
            path="/recognitions/create"
            component={CreateRecognitionPage}
          />
          <Route
            exact
            path="/recognitions/:id"
            component={RecognitionDetailPage}
          />
          <Route
            exact
            path="/recognitions/:id/edit"
            component={UpdateRecognitionPage}
          />

          {/* Create, Update and Detail for Nominations */}
          <Route
            exact
            path="/nominations/create"
            component={CreateNominationPage}
          />
          <Route
            exact
            path="/nominations/:id"
            component={NominationDetailPage}
          />
          <Route
            exact
            path="/nominations/:id/edit"
            component={UpdateNominationPage}
          />

          {/* User Profile */}
          <Route exact path="/profiles/:id" component={ProfilePage} />

          {/* Auth */}
          <Route exact path="/login" component={SignInForm} />
          <Route exact path="/register" component={SignUpForm} />

          {/* 404 fallback */}
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
