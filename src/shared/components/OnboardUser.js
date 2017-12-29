import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'


const USER_QUERY = gql`
  query {
    user {
      id
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation($idToken: String!, $username: String!) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      username: $username
    ) {
      id
    }
  }
`;










class OnboardUser extends React.Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  state = {
    username: ''
  };

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('id_token'),
      username: this.state.username
    };

    this.props
      .createUser({ variables })
      .then(res => {
        this.props.history.replace('/list');
      })
      .catch(error => {
        console.error(error);
        this.props.history.replace('/');
      });
  };

  container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px'
  };

  usernameInput = {
    padding: '10px',
    width: '20%'
  };

  createBtn = {
    border: 'none',
    padding: '20px',
    width: '10%',
    marginTop: '1%',
    color: 'white',
    background: '#63D1F4',
    cursor: 'pointer'
  };

  render() {

console.log("PROPS: ", this.props);

    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    if (
      this.props.data.user ||
      window.localStorage.getItem('id_token') === null
    ) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      );
    }

    return (
      <div style={this.container}>
        <input
          style={this.usernameInput}
          value={this.state.username}
          placeholder="Username"
          onChange={e => this.setState({ username: e.target.value })}
        />

        {this.state.username &&
          <button style={this.createBtn} onClick={this.createUser}>
            Create
          </button>}
      </div>
    );
  }
};


export default graphql(CREATE_USER_MUTATION, { name: 'createUser' })(
  graphql(USER_QUERY, { options: { fetchPolicy: 'network-only' } })(
    withRouter(OnboardUser)
  )
);