/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import './Credits.css'

const Credits = (props) => {
    // Create the list of Credit items
    let CreditsView = () => {
      const { credits } = props;
      return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
        let date = credit.date.slice(0,10);
        return <li key={credit.id}> ${credit.amount} From {credit.description} on {date}</li>
      });
    }
// Handle the form submission for adding a new credit
  const handleSubmit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = event.target.amount.value;
    props.handleAddCredit(description, amount);
    event.target.reset();
  };
  // Render the list of Debit items and a form to input new Credit item
  return (
    <div className="credits-container">
      <h1>Credits</h1>
      <p>Account Balance: ${props.accountBalance.toFixed(2)}</p>
      {CreditsView()}
      <form onSubmit={props.addCredit}>
      </form>
      <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="number" name="amount" step="0.01"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">
        <button>Return to Home</button>
      </Link>
    </div>
  );
}

export default Credits;