import React, { Component } from 'react';
import logo from './images/logo.svg';
import './App.css';
import '../../css/styles.css'
import MainContainer from '../maincontainer/maincontainer';
import axios from 'axios'

//class for the object that contains the app
class App extends Component {
  constructor(props) {
    //calling the super constructor
    super(props)

    //defining the state
    this.state = {
      toDoListArray : [], //array that will hold all the todo list items whether checked or unchecked
      filterCriteria : "", //the criteria for filtering like checked or unchecked or none
      markedArray : [], //array for storing the checked to do list items
      unmarkedArray : [], //array for storing the unchecked to do list items
      counter : 0, //variable that will be the id for individual to do list items
      markedToDo : 0, //number of checked to do list items
      unMarkedToDo : 0, //number of unchecked to do list items
      totalToDo : 0, //number of total to do list items
      listItem : { //list item mock object 
        task : "", //value of the mock list item
        checked : false, //whether that item is checked or not, initially false
        id : 0 //unique identifier for the list item
      },
    }
    
    //binding all the functions
    this.addToDoListItemHandler = this.addToDoListItemHandler.bind(this);
    this.updateListItemObjectHandler = this.updateListItemObjectHandler.bind(this);
    this.removeListItemHandler = this.removeListItemHandler.bind(this);
    this.setMarked = this.setMarked.bind(this);
    this.filterCriteriaSelector = this.filterCriteriaSelector.bind(this);
    this.deleteCheckedItems = this.deleteCheckedItems.bind(this);
  }
  
  render() {
    return (
      <div>
        {/* instantiating the main container class object */}
        <MainContainer 
          array={this.state.toDoListArray} 
          add={this.addToDoListItemHandler} //passing prop for add function
          update={this.updateListItemObjectHandler} //passing prop for update function
          remove={this.removeListItemHandler} //passing prop for the remove function
          filterCriteriaSelector={this.filterCriteriaSelector} //passing prop for filter criteria selector function
          filterResults={this.filterResults} //passing prop for filter results function
          setMarked={this.setMarked} //passing prop for set marked function
          counter={this.state.counter} //passing prop for counter
          filterCriteria={this.state.filterCriteria} //passing prop for filter criteria state variable
          markedArray={this.state.markedArray} //passing prop for marked array state variable
          unmarkedArray={this.state.unmarkedArray} //passing prop for unmarked array state variable
          markedToDo={this.state.markedToDo}//passing prop for marked to do list counter state variable
          unMarkedToDo={this.state.unMarkedToDo}//passing prop for unmarked to do list counter state variable
          totalToDo={this.state.totalToDo}//passing prop for total to do list counter state variable
          deleteCheckedItems={this.deleteCheckedItems}/>
      </div>
    )
  }


  deleteCheckedItems(){
    let filteredArray =  this.state.toDoListArray.filter((element)=>{
      return !element.checked
    })
    let checkedItemsArray = this.state.toDoListArray.filter((element)=>{
      return element.checked
    })

    axios.delete('http://localhost:8080/delete', { params: { filteredArray, checkedItemsArray } } )

    this.setState({
      toDoListArray : filteredArray,
      markedToDo : 0,
      unMarkedToDo : filteredArray.length,
      totalToDo : filteredArray.length
    })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/get')
      .then( (response) => {
         this.setState({
           toDoListArray : response.data
         })
      })
      .catch(error => {
        console.log('error',error)
      }); 

    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }
  //function that adds a task to the to do list
  addToDoListItemHandler(event) {
    //condition to check if list item mock object has not been initialized
    if(this.state.listItem.task !== ""){
      //variable to store to do list array temporarily
      let tempArray = this.state.toDoListArray;
      //pushing the list item to the array
      tempArray.push(this.state.listItem)
      //variable to temporarily store the counter 
      let tempCounter = this.state.counter;
      //variable to temporarily store the total number of to do list items
      let tempTotalToDo = this.state.totalToDo;
      //initializing the value of the variable to store the number of unchecked or unmarked to do list items
      let tempUnMarkedToDo = 0;
      
      //loop that goes through the to do list items array and increments the tempUnMarkedToDo variable if the to do list item is not marked 
      this.state.toDoListArray.forEach((element) => {
        //condition to check if the to do list item is not marked
        if (element.checked === false)
          tempUnMarkedToDo++;
      })
      
      axios.post('http://localhost:8080/create', this.state.listItem)
      
      //updating the values of the required state variables accordingly
      this.setState({
        toDoListArray: tempArray,
        counter: (Number(tempCounter) + 1),
        totalToDo: (Number(tempTotalToDo) + 1),
        unMarkedToDo: tempUnMarkedToDo
      })
    }
  }
  
  //function that updates the list item object
  updateListItemObjectHandler(event) {
    let tempCounter = this.state.counter;
    this.setState({
      listItem : {task : event.target.value, checked : false, id: tempCounter}
    })
  }
  
  //function that removes the list item based on the provided id of that particular list item
  removeListItemHandler(id) {
    //axios.delete(URL, { params: { foo: 'bar' } })
    axios.delete('http://localhost:8080/deleteindividualitems', { params: { id} })
    let array = this.state.toDoListArray;
    //creates a new array of items that does not contain the item that should be removed
    var newArray = array.filter(function (element) {
      if(element.id !== id)
        return element;
    });
     //declaring and inititalizing values for variables that will store the marked and unmarked array
     let mArray = [];
     let uArray = [];
     //assigns the marked array based on the to do list items that are checked
     mArray = newArray.filter((element) => {
       return element.checked === true
     })
     //assigns the unmarked array based on the to do list items that are not checked
     uArray = newArray.filter((element) => {
       return element.checked === false
     })

    //initializing variables that will be temporarily storing the count of the items in each category
    let tempTotalToDo = this.state.totalToDo;
    let tempMarkedToDo = this.state.markedToDo;
    let tempUnMarkedToDo = this.state.unMarkedToDo;
    
    //loops through the to do list array and decrements the number of marked and unmakred items variables depending on whether
    //item is checked or not
    this.state.toDoListArray.forEach((element) => {
      if (element.checked === true && element.id === id)
        tempMarkedToDo--;
      else if (element.checked === false && element.id === id)
        tempUnMarkedToDo--;
    })
    
    //updating the values of the required state variables accordingly
    this.setState({
      toDoListArray: newArray,
      markedArray: mArray,
      unmarkedArray: uArray,
      markedToDo: tempMarkedToDo,
      unMarkedToDo : tempUnMarkedToDo,
      totalToDo: (Number(tempTotalToDo) - 1) 
    });
  }
  //function that marks a particular to do list item whose ID is given as checked 
  setMarked(event, id) {
    //loops through the to do list array and maps its value to array based on whether item is already checked or not
    
    let array = this.state.toDoListArray.map((element) => {
      if(element.id === id) {
        if(element.checked === true){
          axios.put('http://localhost:8080/setmarked', { id, checkedCondition: false })
          return { task : element.task, checked : false, id : element.id};
        }
        else if(element.checked === false){
          axios.put('http://localhost:8080/setmarked', { id, checkedCondition: true })
          return {task: element.task, checked: true, id: element.id};
        }
       }
       else {
         return { task: element.task, checked: element.checked, id: element.id };
       }  
     });
    
    //initializing variables that will be temporarily storing the count of the items in the marked and unmarked category
    let tempMarkedToDo = 0;
    let tempUnMarkedToDo = 0;

    //loop that goes through every item in the to do list and increments the counter for the number of marked and umarked to do list items
    //based on certain condition
    array.forEach((element) => {
      if(element.checked === true)
        tempMarkedToDo++;
      else if(element.checked === false)
        tempUnMarkedToDo++;
    })

    //initializing the variables that will be storing the array of marked and unmarked to do list items
    let mArray = [];
    let uArray = [];
    //assigns the mArray a value by filtering items from array if the item is checked
    mArray = array.filter((element) => {
      return element.checked === true
    })
    //assigns the mArray a value by filtering items from array if the item is not checked
    uArray = array.filter((element) => {
      return element.checked === false
    })
    //
    
    //updates the required state variables 
    this.setState({
      toDoListArray: array,
      markedToDo: tempMarkedToDo,
      unMarkedToDo: tempUnMarkedToDo,
      markedArray: mArray,
      unmarkedArray: uArray
    })  
  }
  //function that selects the filter criteria
  filterCriteriaSelector(event){
    this.setState({
      filterCriteria : event.target.value, //setting the filter criteria value to the event value
    });
  }
}

export default App;