import React, { Component } from 'react';
import Select from 'react-select';

// Define SearchForm Class
const options = [
    { value: 'the-irish-times', label: 'the-irish-times' },
    { value: 'polygon', label: 'polygon'},
    { value: 'bbc-sport', label: 'bbc-sport'},
    { value: 'business-insider-uk', label: 'business-insider-uk'}
  ];
export default class search extends Component {

// constructor accepts props and initialises state

constructor(props) {

super(props);

this.state = {
    selectedOption: "",

}
}
// an event handler for form submit


handleChange = (selectedOption) => {

    // Validate input value

    

    // setNewsSource is a function passed from parent (news page) via props

    // It is used as a way to pass the input value back up to the parent

    // This is called state lifting

    // see: https://reactjs.org/docs/lifting-state-up.html

    this.props.setNewsSource(selectedOption.value);

    

    // prevent page reload (prevent submit)

    event.preventDefault();

}
// Render the form

render() {
   
 const { selectedOption } = this.state;
    return (
    
    <div>
    <form onSubmit={this.formSubmitted}>
    <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    </form>
    <style jsx>{`
    /* css for this page */
   
   
    
    div{
       width:50%;
       margin-left: auto;
      margin-right: auto;
      background-color:black;
    }
    Select{
        background-color:black;
    }
    sour
  `}</style>
    </div>
    
  
    
    );
    
    }
    
    }