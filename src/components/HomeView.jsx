import React, {Component} from 'react'

export default class HomeView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return(<div className='column-container' key={index}>
              <div className='book-container' onClick={ () => { this.props.clickOnBook(book) } }>
                <p className='book-text'>Title: {book.title}</p>
                <p className='book-text'>Authors: { book.authors.toString() }</p>        
                <img src = {book.thumbnail} className="thumbnail" alt="books"></img>
              
             <div className='button-container'>
              {
                book.isFavorite ?
                  <button className='collection-button' onClick={()=> {  book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Unfavorite</button> : <button className='collection-button' onClick={()=> {book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Favorite</button>
              }
              <button className='collection-button' onClick={()=> { this.props.deleteBook( book, index ) }}>Delete</button>
              </div>
              </div>
              </div>
              )
              
          }))
    }
}