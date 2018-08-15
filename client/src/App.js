import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu, Tab} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import PreviewComponent from './components/PreviewComponent';
import ArticleListComponent from './components/ArticleListComponent';
import CategoryListComponent from './components/CategoryListComponent';

const panes = [
  { menuItem: 'Articles', render: () => 
                      <div>     
                          <Container fluid className="Component-container">
                            <Segment raised>
                              <PreviewComponent />
                            </Segment>
                          </Container>
                          <Container fluid  className="Component-container">
                                <ArticleListComponent/>
                          </Container>
                      </div>
  },
  { menuItem: 'Categories', render: () => 
      <Container fluid  className="Component-container">
        <CategoryListComponent />
      </Container>
  }
]

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
        <Tab panes={panes} />
      </div>
    );
  }
}

export default App;
