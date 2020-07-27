
import React, { Component } from 'react'
import './App.css';
 

import NewForm from './components/NewForm';
import BookView from './components/BookView';
import CollectionView from './components/CollectionView';
import FavoriteView from './components/FavoriteView';
import HomeView from './components/HomeView';
import Search from './components/Search'
import SearchView from './components/SearchView'

let baseUrl = 'https://blooming-stream-08940.herokuapp.com/'
export default class App extends Component {  
  constructor() {
    super();
    this.state = {
      books: [],
      clickedBook: null,
      currentView : 'home', // home, collection, favorite

    };
    this.recieveBooks = this.recieveBooks.bind(this)
  }
  
  componentDidMount() {
    this.getBook();
  }

  getBook() {
    fetch(baseUrl + 'bookworm').then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        books: data
      });
    }).catch(err => {
      console.log('error', err);
    });
  };
  addBook = (newBook) => {
    const copyBooks = [...this.state.books];
    copyBooks.push(newBook);
    this.setState({
      books: copyBooks,
      currentView: 'home'
    });
  }

  updateBook = (updateBook, index) => {
    fetch(baseUrl + 'bookworm/' + updateBook._id, {
      method: 'PUT',
      body: JSON.stringify({
        title: updateBook.title,
        authors: updateBook.author,
        subtitle: updateBook.subtitle,
        description: updateBook.description,
        thumbnail: updateBook.thumbnail,
        smallimg: updateBook.smallimg, 
        isFavorite: updateBook.isFavorite,
        myCollection:  updateBook.myCollection
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {       //true =false and false =true
      const copyBooks = [...this.state.books]
      copyBooks.splice(index, 1, data)
      this.setState({
          books:copyBooks
      });
    });
  }

  addBookFromApi = (book) => {
    console.log(book)
    fetch(baseUrl + 'bookworm/', {
        method: 'POST',
        body: JSON.stringify({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          subtitle: "",
          description: book.volumeInfo.description,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
       
      }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        return res.json();
  }).then(data => {
    this.addBook(data);
    let bottom = document.getElementById("bottom")
    bottom.scrollIntoView()
   });
}


  deleteBook = (deleteBook, index) => {
    fetch(baseUrl + 'bookworm/' + deleteBook._id, {
      method: 'DELETE',
     
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {       
      const copyBooks = [...this.state.books]
      copyBooks.splice(index, 1)
      this.setState({
          books:copyBooks
      });
    });
  }

  clickOnBook = (book) => {
    this.setState({
      clickedBook : book
    })
    setTimeout(() => {  let description = document.getElementById("details")
    description.scrollIntoView() }, 500);
    
  }

  clearBook = () => {
    this.setState({
      clickedBook: null
    })
  }

  ViewRender = () => {
    if (this.state.currentView === 'home') {
      return <div><h1 className='search-results-title'>Books</h1><div className='collection-container'>
        <HomeView books={this.state.books} updateBook={this.updateBook} clickOnBook={this.clickOnBook} deleteBook={this.deleteBook}/>
        </div></div>
    } else if (this.state.currentView === 'my_collection') {
      let my_collection = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].myCollection === true) {
            my_collection.push(this.state.books[i])
          }
      }
      return <div><h1 className='search-results-title'>My Collection</h1><CollectionView books={my_collection} clickOnBook={this.clickOnBook} /></div>
    } else if (this.state.currentView === 'favorites') {
      let favorites = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].isFavorite === true) {
            favorites.push(this.state.books[i])
          }
      }
      return <div><h1 className='search-results-title'>Favorites</h1><FavoriteView books={favorites} clickOnBook={this.clickOnBook} /></div>
    } else if (this.state.currentView === 'add') {
      return <div><h1 className='search-results-title'>Add Book</h1><NewForm baseUrl={ baseUrl } addBook={ this.addBook}/></div>
    }
  }

  recieveBooks(data){
    this.setState({
      returnedBooks: data
    })
  }
      
  render() {
    return (
      <div>
        <div className="header-container">
          <header>
            <h1 className="main-title">BOOKworm</h1>
          </header>
        </div>
      <div div className="nav-container">
        <nav>
          <span className={ this.state.currentView === 'home' ? 'nav-item selected' : 'nav-item' } onClick={ () => { this.setState({ currentView : 'home', clickedBook: null, returnedBooks: [] })} }>Home </span> 
          {/* <span className="nav-item" onClick={ () => { this.setState({ currentView : 'my_collection' }) } }> My Collections</span>  */}
          <span className={ this.state.currentView === 'favorites' ? 'nav-item selected' : 'nav-item' } onClick={ () => { this.setState({ currentView : 'favorites', clickedBook: null, returnedBooks: [] }) } }> Favorites</span> 
          <span className={ this.state.currentView === 'add' ? 'nav-item selected' : 'nav-item' } onClick={ () => { this.setState({ currentView : 'add', clickedBook: null, returnedBooks: [] }) } }>Add Book</span> 
        </nav>
          <Search returnedBooks={this.state.returnedBooks} sendBooks = {this.recieveBooks} />
       
      </div>  
      {
          this.state.clickedBook ? <div className='view-container' id = "details"><BookView book={ this.state.clickedBook } clearBook={this.clearBook} /></div> : ''
      } 
      <h1 className='search-results-title'> Search Results</h1>
      <div className='view-container' id = "details">
      {this.state.returnedBooks ? (
      
        <SearchView books={this.state.returnedBooks.items} addBookFromApi = {this.addBookFromApi} />

      ): (
        ''
      )}
      </div>
      
      <this.ViewRender /><span id="bottom" ></span>
      </div>
    );
   }
}

 

