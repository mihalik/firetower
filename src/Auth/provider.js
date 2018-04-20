import React, {Component} from "react";
import {Broadcast} from "react-broadcast";

const auth = window.firebase.auth();
const db = window.firebase.firestore();
export const PROVIDER_NAME = "FiretowerAuth";

export default class AuthProvider extends Component {
  state = {user: null, error: null, message: null, hasResolved: false};

  constructor(props) {
    super(props);
    auth.onAuthStateChanged(user => {
      this.setState({user, hasResolved: true});
      if (user) {
        this.loadUserDetails();
      }
    });
  }

  loadUserDetails = () => {
    const docRef = db.collection("users").doc(auth.currentUser.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        // Add details to existing user object
        let user = this.state.user;
        user.details = doc.data();
        this.setState({user});
      }
    });
  };

  login = (email, password) => {
    // No need to handle the success results of signin because it will be handled by
    // the state change handler in the constructor.
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      this.setState({error});
    });
  };

  create = (email, password, repeatPassword, profile) => {
    if (password !== repeatPassword) {
      const error = {message: "Passwords must match"};
      this.setState({error});
      return;
    }
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          auth.currentUser.sendEmailVerification();
          const userProfile = db.collection("users").doc(auth.currentUser.uid);
          userProfile.set(profile);
        })
        .catch(error => {
          this.setState({error});
        });
    } catch (error) {
      this.setState({error});
    }
  };

  logout = () => {
    const {onLogout} = this.props;
    auth.signOut();
    this.setState({user: null, details: null, error: null});
    onLogout && onLogout();
  };

  forgot = email => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          message: "Check your email for a link to set a new password",
        });
      })
      .catch(error => {
        this.setState({error});
      });
  };

  render() {
    const authProps = {
      actions: {
        login: this.login,
        create: this.create,
        logout: this.logout,
        forgot: this.forgot,
      },
      user: this.state.user,
      error: this.state.error,
      message: this.state.message,
      hasResolved: this.state.hasResolved,
    };
    return (
      <Broadcast channel={PROVIDER_NAME} value={authProps}>
        <div>{this.props.children}</div>
      </Broadcast>
    );
  }
}
