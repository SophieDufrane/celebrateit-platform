import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import LoggedInHomePage from "./pages/home/LoggedInHomePage";
import CreatePostPage from "./pages/posts/CreatePostPage";
import PostDetailPage from "./pages/posts/PostDetailPage";
import UpdatePostPage from "./pages/posts/UpdatePostPage";
import CreateNominationPage from "./pages/nominations/CreateNominationPage";
import NominationDetailPage from "./pages/nominations/NominationDetailPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" component={LoggedInHomePage} />
          {/* Create, Update and Detail for Posts */}
          <Route exact path="/posts/create" component={CreatePostPage} />
          <Route exact path="/posts/:id" component={PostDetailPage} />
          <Route exact path="/posts/:id/edit" component={UpdatePostPage} />
          {/* Create and Detail for Nominations */}
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
          {/* User Profile */}
          <Route exact path="/profile" component={ProfilePage} />
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
