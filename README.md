# Firetower

Very highly opinionated Firebase + React (create-react-app) + Material UI framework for rapid development of web applications.

## NOTE: This project is under very active development. All interfaces will likely change.

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
* Only supports Firestore and an opinionated schema for storing users and user data

### Getting started

1.  Create application (TODO)
2.  Install Firetower (TODO)
3.  Create page components and configure menu

Simple example appplication (one page + external link, no auth):

```
import {Page, Firetower} from 'firetower';
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";

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

#### Auth

* TODO: Internal component? Should it be exposed? Documented?

#### Collection

Wrapper around the `react-firestore` `FirestoreCollection` that handles displaying loading spinners and error messages if there is an issue loading the collection.

#### DateFormat

Displays dates from Firebase in a friendly format.

```
<DateFormat date={note.created} />
```

#### Document

Wrapper around the `react-firestore` `FirestoreDocument` that handles displaying loading spinners and error messages if there is an issue loading the document.

#### Firestore

Render component to get the raw Firestore object for writing to Firestore.

#### Firetower

TODO: More documentation
Routes - order matters

```
ReactDOM.render(
  <Firetower
    routes={routes}
    renderPageTitle={renderPageTitle}
    pageNotFound={NotFound}
    defaultPage="home"
  />,
  document.getElementById("root")
);
```

#### IsAdmin

```
<IsAdmin>
  Only an admin will see this.
</IsAdmin>
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

#### Page

Component to define individual pages.

```
<Page>
  Page contents here.
</Page>
```

TODO: What is the shape of routes?

```
<Page>
  {routes => (
    <div>{routes.}
  )}
</Page>
```

#### Signup

Props:

* `signupRedirect` - Path to redirect a user after they have signed up

Example:

```
<Signup signupRedirect={NAV.home} />
```

#### User

Render component that provides the Firebase user object with added `details` property from the `Users` collection.

```
<User>{user => <span>{user.email}</span>}</User>
```

### TODO

Things I'd like to complete before general consumption.

* MOAR documentation
* Support all the Firebase Auth options
  * Possibly based on firebaseui-web?
* Better support around data loading/pagination
* Improvements around overriding things like login/signup
* Firebase function support for transactional emails (Mailgun?)
* Firebase function support for paid plans (Stripe)
  * Also permissions system for paid plans
* Replace react-scripts with custom scripts to handle Firebase-y things better
  * Something like preact-cli
* Look at all the APIs and standardize
  * Sometimes paths take a name from the routes array and sometimes they take paths
