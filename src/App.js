/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  //lifecycle method componentDidMount() which should include the API requests 
  componentDidMount = async () => {
    try {
      let creditsResponse = await axios.get('https://johnnylaicode.github.io/api/credits.json');
      let debitsResponse = await axios.get('https://johnnylaicode.github.io/api/debits.json');

      this.setState({
        creditList: creditsResponse.data,
        debitList: debitsResponse.data
      }, this.updateAccountBalance);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  }

  //Update AccountBalance based on the API requests
  updateAccountBalance = () => {
    const totalCredits = this.state.creditList.reduce((sum, c) => sum + c.amount, 0);
    const totalDebits = this.state.debitList.reduce((sum, d) => sum + d.amount, 0);
    const balance = totalCredits - totalDebits;
    this.setState({accountBalance: Number(balance.toFixed(2))});
  }

  //Update the state based on user input of new credits
  addCredit = (description, amount) => {
    const newCredit = {description, amount: Number(amount), date: new Date().toISOString()};
    const updatedCredits = [...this.state.creditList, newCredit];
    this.setState({creditList: updatedCredits}, this.updateAccountBalance);
  }

  //Update the state based on user input of new debits
  addDebit = (description, amount) => {
    const newDebit = {description, amount: Number(amount), date: new Date().toISOString()};
    const updatedDebits = [...this.state.debitList, newDebit];
    this.setState({debitList: updatedDebits}, this.updateAccountBalance);
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
      <Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} handleAddCredit={this.addCredit} />
    )
    const DebitsComponent = () => (
      <Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} handleAddDebit={this.addDebit} />
    )

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;