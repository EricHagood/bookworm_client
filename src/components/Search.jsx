import React, { Component } from 'react'
import '../App.css'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://www.googleapis.com/books/v1/volumes?q=',
            maxResultsURL: '&startIndex=0&maxResults=9',
            bookName: '',
            searchURL: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this) 
    }
    
    handleChange(event){
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        this.setState({
            searchURL: this.state.baseURL + this.state.bookName + this.state.maxResultsURL,
            bookName: ''
        }, () =>{
            fetch(this.state.searchURL).then(response => {
                return response.json()
            }).then(json => this.props.sendBooks(json))
        })
    }

    render() {
        return (
            <div className="search-container">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <label htmlFor='bookName'></label>
                    <input className='search-box' id='bookName' type='text' placeholder='search by title' value={this.state.bookName} onChange={this.handleChange} />
                    <input className='button' type='submit' value='Search Books' />
                </form>
            </div>
        )
    }
}
