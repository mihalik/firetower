import React, { Component } from "react";
import { Broadcast } from "react-broadcast";

export const PROVIDER_NAME = "FiretowerAuth";

export default class AuthProvider extends Component {
  state = { user: null, error: null, message: null, hasResolved: false };

  constructor(props) {
    super(props);
    props.firebase.auth().onAuthStateChanged(user => {
      this.setState({ user, hasResolved: true });
      if (user) {
        this.loadUserDetails();
      }
    });
  }

  loadUserDetails = () => {
    const docRef = this.props.firebase
      .firestore()
      .collection("users")
      .doc(this.props.firebase.auth().currentUser.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        // Add details to existing user object
        let user = this.state.user;
        user.details = doc.data();
        this.setState({ user });
      }
    });
  };

  login = (email, password) => {
    // No need to handle the success results of signin because it will be handled by
    // the state change handler in the constructor.
    this.props.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });
  };

  create = (email, password, repeatPassword, profile) => {
    if (password !== repeatPassword) {
      const error = { message: "Passwords must match" };
      this.setState({ error });
      return;
    }
    try {
      this.props.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.props.firebase.auth().currentUser.sendEmailVerification();
          const userProfile = this.props.firebase
            .firestore()
            .collection("users")
            .doc(this.props.firebase.auth().currentUser.uid);
          userProfile.set(profile);
        })
        .catch(error => {
          this.setState({ error });
        });
    } catch (error) {
      this.setState({ error });
    }
  };

  logout = () => {
    const { onLogout } = this.props;
    this.props.firebase.auth().signOut();
    this.setState({ user: null, details: null, error: null });
    onLogout && onLogout();
  };

  forgot = email => {
    this.props.firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          message: "Check your email for a link to set a new password"
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const authProps = {
      actions: {
        login: this.login,
        create: this.create,
        logout: this.logout,
        forgot: this.forgot
      },
      user: this.state.user,
      error: this.state.error,
      message: this.state.message,
      hasResolved: this.state.hasResolved
    };
    return (
      <Broadcast channel={PROVIDER_NAME} value={authProps}>
        <div>{this.props.children}</div>
      </Broadcast>
    );
  }
}
