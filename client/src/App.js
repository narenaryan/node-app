import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu, Tab, Message} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Segment, Form, Button } from 'semantic-ui-react';
import PreviewComponent from './components/PreviewComponent';
import ArticleListComponent from './components/ArticleListComponent';
import CategoryListComponent from './components/CategoryListComponent';
import axios from 'axios';
import ApiEndpoints from './Api';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.getIntialState();
    this.panes = [
      { menuItem: 'Articles', render: () => 
                          <div>     
                              <Container fluid className="Component-container">
                                <Segment raised>
                                  <PreviewComponent postArticleToServer={this.postArticleToServer} launchBanner={this.launchBanner}/>
                                </Segment>
                              </Container>
                              <Container fluid  className="Component-container">
                                    <ArticleListComponent listenArticleUpdates={this.listenArticleUpdates}/>
                              </Container>
                          </div>
      },
      { menuItem: 'Categories', render: () => 
          <div>
            <Container fluid className="Component-container">
            <Form>
              <Form.Group unstackable widths={3}>
                <Form.Input label='Category' value={this.state.category} onChange= {this.handleName.bind(this)} placeholder='name' />
              </Form.Group>
              <Button primary onClick={this.postCategoryToServer}>Add</Button>
            </Form>
            </Container>
          <Container fluid  className="Component-container">
            <CategoryListComponent />
          </Container>
          </div>
      }
    ]
    this.launchBanner = this.launchBanner.bind(this)
    this.postArticleToServer = this.postArticleToServer.bind(this)
    this.postCategoryToServer = this.postCategoryToServer.bind(this)
  }

  getIntialState() {
    return {
      showBanner: false,
      bannerHeader: '',
      bannerContent: '',
      category: ''
    }
  }

  handleName(e, data) {
    this.setState({category: data.value})
  }

  postArticleToServer(body) {
    let self = this
    let config = {
      'headers': {'x-access-token': ApiEndpoints.jwtToken
    },
    };
    console.log(body);
    axios.post(ApiEndpoints.post.article(), body, config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
  }
  
  postCategoryToServer() {
    let body = {
      name: this.state.category
    }
    let self = this
    let config = {
      'headers': {'x-access-token': ApiEndpoints.jwtToken
    },
    };
    console.log(body);
    axios.post(ApiEndpoints.post.category(), body, config)
    .then(function (response) {
      console.log(response);
      this.launchBanner("Successfully create the category!")
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
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
