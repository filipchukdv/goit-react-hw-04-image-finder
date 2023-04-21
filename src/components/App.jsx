import { Component } from 'react';
import css from 'App.module.css';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  onSubmit = () => console.log('submit');

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}
