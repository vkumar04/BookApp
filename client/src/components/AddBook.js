import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getAuthorsQuery} from '../queries/queries'

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }
  displayAuthors() {
    let data = this.props.data
    if (data.loading) {
      return <option disabled>Loading Authors</option>
    } else {
      return data
        .authors
        .map(author => (
          <option value={author.name} key={author.id}>{author.name}</option>
        ))
    }
  }
  render() {
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book Name:</label>
            <input type="text" onChange={e => this.setState({name: e.target.value})}/>
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={e => this.setState({genre: e.target.value})}/>
          </div>
          <div className="field">
            <label>Author:</label>
            <select onChange={e => this.setState({authorId: e.target.value})}>
              <option>Choose Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook)