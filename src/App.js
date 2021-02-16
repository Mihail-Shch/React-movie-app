import Home from './components/Home';
import MoviePage from './components/MoviePage';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="container-lg">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MoviePage} />
      </Switch>
    </div>
  );
}

export default App;
