
import React, { Component } from 'react'
import './App.css';
 

import NewForm from './components/NewForm';
import BookView from './components/BookView';
import CollectionView from './components/CollectionView';
import FavoriteView from './components/FavoriteView';
import HomeView from './components/HomeView';
import Search from './components/Search'
import SearchView from './components/SearchView'

export default class App extends Component {  
  constructor() {
    super();
    this.state = {
      books: [],
      clickedBook: null,
      currentView : 'home', // home, collection, favorite
      baseUrl: 'https://blooming-stream-08940.herokuapp.com/'
    };
    this.recieveBooks = this.recieveBooks.bind(this)
  }
  
  componentDidMount() {
    this.getBook();
  }

  getBook() {
    fetch(this.state.baseUrl + 'bookworm').then(response => {
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
    fetch(this.state.baseUrl +  'bookworm/' + updateBook._id, {
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
    fetch(this.state.baseUrl + 'bookworm/', {
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
    fetch(this.state.baseUrl + 'bookworm/' + deleteBook._id, {
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

  ViewRender = () => {
    if (this.state.currentView === 'home') {
      return <div className='collection-container'><HomeView books={this.state.books} updateBook={this.updateBook} clickOnBook={this.clickOnBook} deleteBook={this.deleteBook}/></div>
    } else if (this.state.currentView === 'my_collection') {
      let my_collection = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].myCollection === true) {
            my_collection.push(this.state.books[i])
          }
      }
      return <CollectionView books={my_collection} clickOnBook={this.clickOnBook} />
    } else if (this.state.currentView === 'favorites') {
      let favorites = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].isFavorite === true) {
            favorites.push(this.state.books[i])
          }
      }
      return <FavoriteView books={favorites} clickOnBook={this.clickOnBook} />
    } else if (this.state.currentView === 'add') {
      return <NewForm baseUrl={ baseUrl } addBook={ this.addBook}/>
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
          <div className="nav-item">
          <span onClick={ () => { this.setState({ currentView : 'home' }) } }>Home </span> 
          </div>
          <span className="nav-item" onClick={ () => { this.setState({ currentView : 'my_collection' }) } }> My Collections</span> 
          <span className="nav-item" onClick={ () => { this.setState({ currentView : 'favorites' }) } }> Favorites</span> 
          <span className="nav-item" onClick={ () => { this.setState({ currentView : 'add' }) } }> Add Book</span> 
        </nav>
          <Search returnedBooks={this.state.returnedBooks} sendBooks = {this.recieveBooks} />
       
      </div>  
      <h1 className='search-results-title'> Search Results</h1>
      <div className='view-container' id = "details">
        {
          this.state.clickedBook ? <BookView book={ this.state.clickedBook } /> : ''
        } 
      {this.state.returnedBooks ? (
      
        <SearchView books={this.state.returnedBooks.items} addBookFromApi = {this.addBookFromApi} />

      ): (
        ''
      )}
      </div>
      <h1 className='search-results-title'>My Collection</h1>
      <this.ViewRender /><span id="bottom" ></span>
      </div>
    );
   }
}

 

