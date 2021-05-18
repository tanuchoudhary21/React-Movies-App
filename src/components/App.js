import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { data } from '../data';
import { addMovies } from '../actions';

class App extends React.Component {

  componentDidMount(){
    const { store } = this.props;
    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate(); // Must not use this this method doing it only as it is handy
    })
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
  }

  render(){
    const movies = this.props.store.getState();
    return (
      <div className="App">
        <Navbar/>
        <div className = "main">
          <div className = "tabs">
            <div className = "tab">Movies</div>
            <div className = "tab">Favourites</div>
          </div>
          <div className = "list">
            {movies.map((movie, index) => (
              <MovieCard movie = {movie} key = {`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
