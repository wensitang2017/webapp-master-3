import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class DashboardPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allCoursesQuery.refetch()
    }
  }

  render() {
    if (this.props.allCoursesQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            Loading
            (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})
          </div>
        </div>
      )
    }

    let blurClass = ''
    if (this.props.location.pathname !== '/dashboard') {
      blurClass = ' blur'
    }

    return (
      <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Knovva Academy</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className={'w-100 flex justify-center pa6' + blurClass}>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          <Link
            to='/create'
            className='ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'
          >
            <img
              src={require('../../assets/plus.svg')}
              alt=''
              className='plus mb3'
            />
            <div>New Post</div>
          </Link>
          {this.props.allCoursesQuery.allCourses && this.props.allCoursesQuery.allCourses.map(course => (
              course.name
          ))}
        </div>
        {this.props.children}
      </div>
      </div>
    )
  }
}

const ALL_POSTS_QUERY = gql`
  query DashboardQuery {
    allCourses(orderBy: createdAt_DESC) {
      id
      name
    }
  }
`

const DashboardPageWithQuery = graphql(ALL_POSTS_QUERY, {
  name: 'allCoursesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(DashboardPage)

export default DashboardPageWithQuery
