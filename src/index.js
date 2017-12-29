import React from 'react';
import ReactDOM from 'react-dom';
import ListPage from './student/components/ListPage';
import CreatePage from './student/components/CreatePage';
import DetailPage from './student/components/DetailPage';
import DashboardPage from './student/components/DashboardPage';
import HomePage from './student/components/HomePage';
import OnboardUser from './shared/components/OnboardUser';
import CoursePage from './student/components/CoursePage';
import Callback from './callback/callback';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Auth } from './shared/auth/auth0';
import history from './history';

import 'tachyons';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const httpLink = new HttpLink(
  { uri: 'https://api.graph.cool/simple/v1/cjb88dwuv1s4b0191np9fmbn3' }
);

const auth = new Auth();


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});


const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


const HomePageWithProps = (props) => {
  return (
    <HomePage 
      auth={auth}
      {...props}
    />
  );
}


ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' render={HomePageWithProps} />
        <Route exact path='/list' component={ListPage} />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route path='/onboard' component={OnboardUser} />
        <Route path='/create' component={CreatePage} />
        <Route path='/post/:id' component={DetailPage} />
        <Route path='/course/:id' component={CoursePage} />
        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
        }}/>  
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
