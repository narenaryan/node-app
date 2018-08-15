import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu, Tab, Message} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import PreviewComponent from './components/PreviewComponent';
import ArticleListComponent from './components/ArticleListComponent';
import CategoryListComponent from './components/CategoryListComponent';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.getIntialState();
    this.panes = [
      { menuItem: 'Articles', render: () => 
                          <div>     
                              <Container fluid className="Component-container">
                                <Segment raised>
                                  <PreviewComponent launchBanner={this.launchBanner}/>
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
    this.launchBanner = this.launchBanner.bind(this)
  }

  getIntialState() {
    return {
      showBanner: false,
      bannerHeader: '',
      bannerContent: ''
    }
  }

  launchBanner(message) {
    this.setState({bannerHeader: message, showBanner: true})
    let self = this
    setTimeout(() => {
      self.setState({showBanner: false, bannerHeader: ''})
    }, 3000)
  }

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
        {this.state.showBanner?<Message
          icon='inbox'
          header={this.state.bannerHeader}
          content={this.state.bannerContent}
        />:null}
        <Tab panes={this.panes} />
      </div>
    );
  }
}

export default App;
