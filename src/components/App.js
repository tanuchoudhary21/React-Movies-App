import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { data as moviesList } from '../data';
import { StoreContext } from '../index';

class App extends React.Component {
  componentDidMount() {
    this.props.store.subscribe(() => this.forceUpdate());
    this.props.store.dispatch(addMovies(moviesList));
  }

  isMovieInFavourites = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }

    return false;
  };

  changeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props.store.getState(); // will return { movies: {}, search: []}
    console.log('movies', movies);
    const { list, showFavourites = [], favourites = [] } = movies;
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieInFavourites(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <App store={store} />}
      </StoreContext.Consumer>
    );
  }
}

export default AppWrapper;



// import React  from 'react';
// import Navbar from './Navbar';
// import MovieCard from './MovieCard';
// import { data } from '../data';
// import { addMovies,  setShowFavourites } from '../actions';
// import { StoreContext } from '../index';

// class App extends React.Component {

//   componentDidMount(){
//     const { store } = this.props;
//     store.subscribe(() => {
//       console.log('UPDATED');
//       this.forceUpdate(); // Must not use this this method doing it only as it is handy
//     })
//     //make api call
//     //dispatch action
//     store.dispatch(addMovies(data));
//   }

//   isMovieFavourite = (movie) => {
//       const { movies } = this.props.store.getState();
//       const index = movies.favourites.indexOf(movie);

//       if(index !== -1){
//         return true; // found the moviee
//       }
//       return false;
//   }

//   onChangeTab = (val) => {
//     this.props.store.dispatch(setShowFavourites(val))
//   }

//   render(){
//     const { movies , search } = this.props.store.getState(); // { movies:{} , search:{} }
//     const { list , favourites, showFavourites } = movies; 
//     const displayMovies = showFavourites ? favourites : list;

//     return (
//           <div className="App">
//             <Navbar  search = {search} />
//             <div className = "main">
//               <div className = "tabs">
//                 <div className = {`tab ${showFavourites ? '' : 'active-tabs' }`}
//                    onClick = {()=> this.onChangeTab(false)} 
//                 >
//                   Movies
//                 </div>

//                 <div className = {`tab ${showFavourites ? 'active-tabs' : '' }`} 
//                     onClick = {()=> this.onChangeTab(true)}
//                 >
//                     Favourites
//                 </div>

//               </div>
//               <div className = "list">
//                 {displayMovies.map((movie, index) => (
//                   <MovieCard 
//                     movie = {movie} 
//                     key = {`movies-${index}`} 
//                     dispatch = {this.props.store.dispatch}
//                     isFavourite = {this.isMovieFavourite(movie)} 
//                   />
//                 ))}
//               </div>
//               { displayMovies.length === 0 ? <div className = "no-movies" >No movies to display!! </div> : null }
//             </div>
//           </div>
//     );
//   }
// }

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store) => {
//             <App store = {store} />
//         }}
//       </StoreContext.Consumer>
//     )
//   }
// }
    

// export default App;
