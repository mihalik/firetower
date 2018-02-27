import React from "react";
import ReactDOM from "react-dom";
import {registerServiceWorker, Firetower} from "firetower";
import AssignmentIcon from "material-ui-icons/Assignment";
import HomeIcon from "material-ui-icons/Home";
import LockIcon from "material-ui-icons/Lock";
import HelpIcon from "material-ui-icons/Help";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Notes from "./Notes";
import NoteDetails from "./NoteDetails";
import Admin from "./Admin";
import UserProfile from "./UserProfile";

const renderAppTitle = () => {
  return <span>Firetower Example</span>;
};

export const routes = {
  home: {
    path: "/",
    display: "Home",
    exact: true,
    component: Home,
    icon: HomeIcon,
  },
  login: {
    path: "/login",
    component: Login,
    hidePageChrome: true,
    hideFromMenu: true,
  },
  signup: {
    path: "/signup",
    component: Signup,
    hidePageChrome: true,
    hideFromMenu: true,
  },
  notes: {
    path: "/notes",
    display: "Notes",
    icon: AssignmentIcon,
    component: Notes,
    requiresAuth: true,
  },
  noteDetail: {
    path: "/notes/:noteId",
    component: NoteDetails,
    hideFromMenu: true,
    requiresAuth: true,
  },
  admin: {
    path: "/admin",
    display: "Admin",
    icon: LockIcon,
    component: Admin,
    requiresAdmin: true,
  },
  userProfile: {
    path: "/profile",
    display: "Profile",
    isUserMenu: true,
    component: UserProfile,
  },
  docs: {
    display: "Documentation",
    icon: HelpIcon,
    externalLink: "https://github.com/mihalik/firetower",
  },
};

ReactDOM.render(
  <Firetower
    routes={routes}
    renderAppTitle={renderAppTitle}
    defaultPage="home"
  />,
  document.getElementById("root")
);
registerServiceWorker();
