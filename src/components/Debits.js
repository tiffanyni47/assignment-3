/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
    // Create the list of Debit items
    let debitsView = () => {
      const { debits } = props;
      return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
        let date = debit.date.slice(0,10);
        return <li key={debit.id}> ${debit.amount} From {debit.description} on {date}</li>
      });
    }
    // Handle the form submission for adding a new debit
    const handleSubmit = (event) => {
      event.preventDefault();
      const description = event.target.description.value;
      const amount = event.target.amount.value;
      props.handleAddDebit(description, amount);
      event.target.reset();
    };
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <p>Account Balance: ${props.accountBalance.toFixed(2)}</p>
      {debitsView()}
      <form onSubmit={props.addDebit}>
      </form>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <input type="number" name="amount" step="0.01" />
        <button type="submit">Add Dedit</button>
      </form>
      <br/>
      <Link to="/">
        <button>Return to Home</button>
      </Link>
    </div>
  );
}

export default Debits;