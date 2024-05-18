import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
    };
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1,})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false,
    });
  };


  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsRoom - Headline
        </h1>
        {this.state.loading && <Loading/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.title}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publisheAt}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;


import './App.css';
import React, { Component } from 'react'
import Navebar from './components/Navebar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class 
App extends Component {
  pagesize = 9
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress :0
  }

  setProgress =(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navebar/>
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="genera" pagesize={this.pagesize} country="in" category="general"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pagesize={this.pagesize} country="in" category="entertainment"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pagesize={this.pagesize} country="in" category="sports"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pagesize={this.pagesize} country="in" category="business"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pagesize={this.pagesize} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pagesize={this.pagesize} country="in" category="science"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pagesize={this.pagesize} country="in" category="technology"/></Route>
        </Switch>  
        </Router>
      </div>
    )
  }
}
