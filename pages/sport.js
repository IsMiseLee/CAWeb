import Link from 'next/link';
import Select from 'react-select';
import React from 'react';
import Search from '../components/Search';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
const defaultNewsSource = 'bbc-sport';

const apiKey ='6a497e3ff3e64df7b4589c3712a0e549';

// Pass this content as 'props' to child components
export default class Sport extends React.Component {

  // Use constructor to get props and set state
  
  constructor(props) {
  
  super(props)
  
  // State variables
  
  this.state = {
    selectedOption: null,

  
  newsSource: "",
    
    url: "",
    
    articles: []
  
  }

  
  
  }

  handleChange = (selectedOption) => {
    this.setState({  newsSource :selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  setNewsSource =(input) =>{
    this.setState({
      newsSource:input,
      url :`https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
    })
  }
  searchNewsAPI=(event)=>{
    this.setState({
      newsSource:`${event.target.innertext}`,
      url :`https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url)
  }
  render() {

    // If state.articles is empty then copy value from props
    const { selectedOption } = this.state;

    if (this.state.articles.length == 0) {
    
    this.state.articles = this.props.articles;
    
    }
   

    return (

      <div>
   <h1>{this.state.newsSource.split("-").join(" ")}</h1>
    <Search setNewsSource={this.setNewsSource}/>
      <SearchForm setNewsSource={this.setNewsSource}/>
      <ul className="newsMenu">
      <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=business">Business News Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=technology">Technology News</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=weather">Weather in Ireland</a></li>
  
  </ul>
      { /* Display a title based on source */}
      
      
      
      <div>
      
      { /* Iterate through articles using Array map) */}
      
      { /* Display author, publishedAt, image, description, and content */}
      
      { /* for each story. Also a link for more.. */}
      
      {this.state.articles.map((article, index) => (
      
      <section key={index}>
      
      <h3>{article.title}</h3>
      
      <p className="author">{article.author} {getData(article.publishedAt)}</p>
      
      <img src={article.urlToImage} alt="article image" className="img-article"></img>
      
      <p>{article.description}</p>
      
      <p>{article.content}</p>
      
      <p><Link as={`/sportarticle/${index}`} href={`/sportarticle?id=${index}`}><a>Read More</a></Link></p>
     
      </section>
      
      ))}
      
      </div>

  <style jsx>{`

.newsMenu{
     
}
ul {
  float:left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  padding-left:3em;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}


li a:hover {
  background-color: #555;
  color: white;
}
    
    h1 {
    
       text-align: center;
    }
    h3{
      text-align: center;
    }
    p{
      text-align: center;
    }

    section{
      margin-top:2em;
      margin-bottom:2em;
      margin-left: auto;
      margin-right: auto;
     
      width:60%;
      border:1px solid black;
      background-color: #CD5C5C;
      
     
    }

    .author{
      margin-left: auto;
      margin-right: auto;
      font-style:italic;
      font-size:1.5 em;
    }

    .img-article {
      margin-left: auto;
      display: block;
      margin-right: auto;
      max-width:50%;
    }
  `}</style>
</div>
);
  }
  static async getInitialProps(response) {

    // Build the url which will be used to get the data
    
    // See https://newsapi.org/s/the-irish-times-api
    
    const initUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;
    
    // Get news data from the api url
    
    const data = await getNews(initUrl);
    
    // If the result contains and articles array then it is good so return articles
    
    if (Array.isArray(data.articles)) {
    
    return {
    
    articles: data.articles
    
    }
    
    }
    
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    
    else {
    
    console.error(data)
    
    if (response) {
    
    response.statusCode = 400
    
    response.end(data.message);
    
    }
    
    }
    
    } // End getInitialProps


    async componentDidUpdate(prevProps, prevState) {

      if (this.state.url !== prevState.url) {

        // Use api url (from state) to fetch data and call getNews()
        
        const data = await getNews(this.state.url);
        
        // If the result contains and articles array then it is good so update articles
        
        if (Array.isArray(data.articles)) {
        
        // Store articles in state
        
        this.state.articles = data.articles;
        
        // Force page update by changing state (make sure it happens!)
        
        this.setState(this.state);
        
        }
        
        // Otherwise it contains an error, log and redirect to error page (status code 400)
        
        else {
        
        console.error(data)
        
        if (response) {
        
        response.statusCode = 400
        
        response.end(data.message);
        
        }
        
        }
        
        }
    
    }
  }

    function getData(date){
  
      var time = new Date(date);
      var year = time.getFullYear();
      var month = time.getMonth();
       var day = time.getDate(); 
      var hour = time.getHours();
      var minute = time.getMinutes();
      var second = time.getSeconds();
      var temp ='';
    
      if(hour > 12) {
        hour = hour - 12 ;}
     
       else{
       
        hour = '12';
      }
      
      temp += (hour >= 12) ? ' P.M.' : ' A.M.';

      return day+"/ "+month+"/ "+year+"   "+hour+" :"+minute+" :"+second+" "+temp;
    
    }

    async function getNews(url) {

      // try fetch and catch any errors
      
      try {
      
      // Make async call
      
      const res = await fetch(url);
      
      // get json data when it arrives
      
      const data = await res.json();
      
      // return json data
      
      return (data);
      
      } catch (error) {
      
      // return error if it occurs
      
      return (error);
      
      }
      
    }