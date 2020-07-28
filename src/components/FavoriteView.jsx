import React, {Component} from 'react'

export default class FavoriteView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div className='column-container' key={index}>
              <div className="book-container" onClick={ () => { this.props.clickOnBook(book) } }>
                <p className="book-text">{book.title}</p>
                <p className="book-text">{ book.authors.toString() }</p>        
                <img className="thumbnail" src = {book.thumbnail} alt="books"></img>
              </div>
              </div>
              )
            
          }))
          
    }
}