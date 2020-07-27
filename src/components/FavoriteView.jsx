import React, {Component} from 'react'

export default class FavoriteView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div key={index}>
              <div onClick={ () => { this.props.clickOnBook(book) } }>
                <p>Title: {book.title}</p>
                <p>Authors: { book.authors.toString() }</p>        
                <img src = {book.thumbnail} alt="books"></img>
              </div>
              </div>
              )
            
          }))
    }
}