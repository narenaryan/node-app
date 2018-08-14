import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import PreviewComponent from './components/PreviewComponent';
import ArticleListComponent from './components/ArticleListComponent';

class App extends Component {
  render() {
    return (
      <div className='App-body'>
        <Menu>
          <Menu.Item style={{
            fontSize: "18px"
          }}>
            TradeByte TB.PIM
          </Menu.Item>
          <img
            src={logo}
            alt="Logo"
            style={{
            height: "50px",
            width: "auto"
          }}/>
        </Menu>
        <Container fluid>
        <Segment raised>
        <PreviewComponent />
        </Segment>
        </Container>
        <Container fluid  className="PreviewComponent-container">
        <ArticleListComponent/>
        </Container>
      </div>
    );
  }
}

export default App;
