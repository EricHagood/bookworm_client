import React, {Component} from 'react'

export default class BookView extends Component {
 
    render() {       
        return (<div>
            <p className="clear-book" onClick={ this.props.clearBook }>X</p>
            <p>title: {this.props.book.title}</p>
            <p>author: { this.props.book.authors }</p>
            <p>subtitle: { this.props.book.subtitle }</p> 
            <p>description: { this.props.book.description }</p>            
            <img src = { this.props.book.thumbnail } alt="books"></img>
            </div>
          )
    }
}