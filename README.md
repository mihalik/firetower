# Firetower

Very highly opinionated Firebase + React (create-react-app) + Material UI framework for rapid development of Firebase applications.

### Overview

Provides a base for quickly creating complex Firebase applications with routes, auth, admin permissions, and a menu system based on material-ui-next. If your app can fit within the limitations, you can quickly build an application without all the boilerplate code.

Provides:

* Basic material-design layout with routing and navigation menu
* Email auth, base components for create/login/logout/password pages
* Admin/non-admin users
* Stripe integration with basic subscription plan support (coming soon)

Limitations:

* Only supports Firebase hosting
* Only supports material-ui-next
* Does not support highly complex react-router configs
* Only supports Firestore and a specific schema for storing users and user data

### Getting started

1.  Create application (TODO)
2.  Install Firetower (TODO)
3.  Create page components and configure menu

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
    renderPageTitle={() => <span>Test application</span>}
  />,
  document.getElementById("root")
);
```

### Component Documenation

#### IsAdmin

```
<IsAdmin>
  Only an admin will see this.
</IsAdmin>
```

#### Document

Wrapper around the `react-firestore` `FirestoreDocument` that handles displaying loading spinners and error messages if there is an issue loading the document.

#### Loading

Material-ui loading spinner that delays loading to prevent spinner flash.

Example:

```
<FirestoreDocument
  path={`some/path/to/something`}
  render={({ isLoading, data }) => (isLoading ? <Loading /> : <span>{data}</span>)}
  }}
/>
```

#### Link

Wrapper component to set appropriate styles on react-router or html links.

Props:

* `as` - Component or html entity to render

Examples:

```
<Link to={NAV.feature} as={Link}>React-router link</Link>
<Link href="http://example.com" as="a">HTML link</Link>
```

#### Login

Props:

* `loggedInRedirect` - Path to redirect a user that visits the page while logged in

Example:

```
<Login loggedInRedirect={NAV.home} />
```

#### Signup

Props:

* `signupRedirect` - Path to redirect a user after they have signed up

Example:

```
<Signup signupRedirect={NAV.home} />
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

```

```
