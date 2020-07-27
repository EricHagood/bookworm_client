import React, {Component} from 'react'
import '../App.css'

export default class CollectionView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div key={index}  >
        
              <div  onClick={ () => { this.props.clickOnBook(book) } }>
                <p className='title '>Title: {book.title}</p>
                <p>Authors: { book.authors.toString() }</p>        
                <img src = {book.thumbnail} alt="books"></img>
              </div>
              </div>
              )
            
          }))
    }
}