import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    // ComponentDidMount() is a lifecycle method that is called after the component is rendered.
    async componentDidMount() {       
        const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
        const response = await fetch(baseUrl)
        const datax = await response.json()    
        const result = datax.results
        console.log(result)
        this.setState({movies: result})
    }

    deleteMovie = async(movie) => {

        const baseUrl = `http://localhost:3002/movies/${movie.id}`
        await fetch(baseUrl, {
            method: "DELETE"
        })
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState ({
            movies: newMovieList
        })
    }


    searchMovie = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render() {
    
        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar 
                        searchMovieProp={this.searchMovie}/>
                    </div>
                </div>

                <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie} />
            </div>
        )

    }


}

export default App;