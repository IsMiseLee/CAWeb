import React, { Component } from 'react';

// import page components
import Meta from '../components/Meta';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

// Build the page template from components
class Page extends Component {
    render() {
        return (
            <div>
                {/* Content to output*/}
                <Meta />
                <Header />
                <Nav />
                {/* Render props passed to this Component */}
                {this.props.children}
                <Footer />

                <style jsx>{`


div{
    background-color:#FFFFE0;
   width :100%
   height:100%;
   padding-bottom:3em;
   border:1px solid black;
}

`}</style>
            </div>
        );
    }
}

export default Page;

