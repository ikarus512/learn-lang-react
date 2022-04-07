import React, { FunctionComponent } from 'react';
import logo from './static/img/logo.svg';
import './styles/App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteProps
} from 'react-router-dom';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


const Sandwiches: FunctionComponent<any> = (route: RouteProps<any, any>): JSX.Element => <h2>Sandwiches</h2>;
const Bus: FunctionComponent<any> = (route: RouteProps<any, any>): JSX.Element => <h3>Bus</h3>;
const Cart: FunctionComponent<any> = (route: RouteProps<any, any>): JSX.Element => <h3>Cart</h3>;

// function Tacos({ routes: MyRoutesType }) {
const Tacos: FunctionComponent<any> = (): JSX.Element =>
  <div>
    <h2>Tacos</h2>
    <ul>
      <li>
        <Link to="/tacos/bus">Bus</Link>
      </li>
      <li>
        <Link to="/tacos/cart">Cart</Link>
      </li>
    </ul>

    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </div>;


// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
type MyRouteType = {
  path: string;
  component: FunctionComponent<any>;
  children?: Array<MyRouteType>;
}
type MyRoutesType = Array<MyRouteType>;
const routes: MyRoutesType = Array(
  {
    path: '/sandwiches',
    component: Sandwiches as FunctionComponent<any>,
  },
  {
    path: '/tacos',
    component: Tacos as FunctionComponent<any>,
    children: [
      {
        path: '/tacos/bus',
        component: Bus as FunctionComponent<any>,
      },
      {
        path: '/tacos/cart',
        component: Cart as FunctionComponent<any>,
      }
    ]
  }
);

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
          <li>
            <Link to="/sandwiches">Sandwiches</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
const RouteWithSubRoutes: FunctionComponent<any> = (route: RouteProps<any, any>): JSX.Element =>
    <Route
        path={route.path || ''}
        render={(props: RouteProps<any, any>) => {
            console.log('### ', route.path, route.component);
            debugger

            // TODO: here is infinite loop
            let Comp : FunctionComponent<any> = route.component as FunctionComponent<any>;
            // return <Comp {...props} routes={route.children} />;
            return <Comp {...props} path={route.path} routes={route.children} />;

            // // TODO: trying to fix infinite loop
            // if (route.children) {
            //     // Here if children
            //     let ch : Array<MyRouteType> = route.children as Array<MyRouteType>;
            //     return (<>
            //         {ch.map((SubElem : MyRouteType, i : number) => {
            //             let SubComp : FunctionComponent<any> = SubElem.component as FunctionComponent<any>;
            //             return (
            //                 <SubComp key={i} path={route.path} {...props} />
            //             );
            //         })}
            //     </>);
            // }
            // // Here if no children
            // let Comp : FunctionComponent<any> = route.component as FunctionComponent<any>;
            // return <Comp {...props} />;
        }}
    />;
