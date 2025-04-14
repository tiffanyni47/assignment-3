/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <img src="https://picsum.photos/200/200" alt="bank"/>

        <h1>Bank of React</h1>

        <Link to="/userProfile" className="home-link">
          <button>User Profile</button>
        </Link>
        <br/>
        <Link to="/login" className="home-link">
          <button>Login</button>
        </Link>
        <br/>
        <Link to="/credits" className="home-link">
          <button>Credits</button>
        </Link>
        <br/>
        <Link to="/debits" className="home-link">
          <button>Debits</button>
        </Link>
        <br/><br/>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;