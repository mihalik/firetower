# Firetower

Very highly opinionated Firebase + React (create-react-app) + Material UI framework for rapid development of Firebase applications.

### Overview

Provides a base for quickly creating complex Firebase applications with routes, auth, admin permissions, and a menu system based on material-ui-next. If your app can fit within the limitations, you can quickly build an application without all the boilerplate code.

Limitations:

* Only supports Firebase hosting
* Only supports material-ui-next
* Does not support highly complex react-router configs
* Only supports Firestore and a specific schema for storing users and user data

### Getting started

1. Create application (???)
2. Install Firetower
3. Create page components and configure menu

Simple example appplication (one page + external link, no auth):

```
import {Page, Firetower} from 'firetower';
import HomeIcon from "material-ui-icons/Home";
import HelpIcon from "material-ui-icons/Help";

const Home = () => <Page>This is the home page</Page>;

const routes = {
  home: {
    path: "/",
    display: "Home",
    exact: true,
    component: Home,
    icon: HomeIcon,
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
    renderAppTitle={() => <span>Test application</span>}
  />,
  document.getElementById("root")
);
```

### The Future

Overall goal is to build a highly productive framwork for apps that fit into the overall product structure. This includes both React components and Firebase function support.

Overall goal for 'batteries included' framework:

* Auth (support all Firebase-supported methods)
* Permissions (at least admin/not admin/paid plans)
* Handle loading data (loading spinner, error display, pagination)
* Some material-ui helper components (react-router Link wrapper, Firebase storage display, etc)
* Firebase function support for emailing users (Mailgun?)
* Firebase function support for paid plans (Stripe)
* Replace react-scripts with built-in scripts
  * Custom 'init' script
  * Deploy always performs a build first
