import { Component } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import gitHubIcon from "../../resources/img/github-logo.svg";


class App extends Component {

  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
          <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={this.onCharSelected}/>
          </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundary>
          </div>
          <a 
            className="gitHub-logo" 
            href="https://github.com/Alina1859/Marvel-React" 
            target="_blank" 
            rel="noreferrer"><img src={gitHubIcon} 
            width="130" height="50" 
            alt="Link on project on Github"/>
          </a>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
