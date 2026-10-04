import { useState } from 'react';
import Alert from '../Alert';
import Button from '../Button';
import Like from "../Like/Like";
import styles from './Message.module.css';

interface LanguageProps {
  // Define any props for the App component here if needed
  items: string[]; // Example prop for items
  heading: string; // Example prop for topics
  onSelectedItem: (item: string) => void; // Example prop for a callback function
}

function Message({ items, heading, onSelectedItem }: LanguageProps) {
  const name = "React lib";
 // let items = ["React", "Angular", "TypeScript"];
  //items = [];
  const [selectedIndex, setCount] = useState(-1);
  const [showAlert, setShowAlert] = useState(false);

//   if (items.length === 0) {
//     return (<>
//         <h1>Bismillah! Learning {name}.</h1>
//         <p>No items to display.</p>
//     </>);
//   }

const getMessage = (items: string[]) => {
    if (items && items.length === 0) { return <p>No items to display.</p>; }
}

  return (
    <>
      <h1>Bismillah! Learning {name}.</h1>
      <h2>{heading}</h2>
      {/* {items.length === 0 ?  <p>No items to display.</p>  : null} */}
      { getMessage(items)
        // items.length === 0 && <p>No items to display.</p>
      }
      {/* className={styles['list-group'] + ' ' + styles['list-text']} */}
      <ul className={[styles['list-group'], styles['list-text']].join(' ')}>
        {items.map((item, index) => (
          <li key={item}
              className= { selectedIndex === index ? styles['item-selected'] : '' }
              onClick={
                () => { 
                  setCount(index);
                  onSelectedItem(item); 
                }              
              }
          >I am learning {item}.</li>
        ))}
      </ul>

    { showAlert && (<Alert onClose = { () => setShowAlert(false) }>
        I am learning React <b>Mohammed shazin will be learning it too and he will be game changer</b>
      </Alert>)
    }

        <Button buttonType="success" onClick= { () => setShowAlert(!showAlert) }>Upgrading our life</Button>

        <Like></Like>
    </>
  );
}

export default Message;
