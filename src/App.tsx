import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

/** We have created the index.ts so we can import the component directly. */
//import Message from './components/Message/Message'
import Message from './components/Message'
import Form from './components/Form';
import PureComponentFun from './components/PureComponentFun';

import NavBar from './components/NavBar';
import Card from './components/Card';

import ExpenseList from './ExpenseTracker/ExpenseList';
import ExpenseFilter  from './ExpenseTracker/ExpenseFilter';
import Expense from './ExpenseTracker/Expense/Expense';

import ConnectingBackend from './useeffect/connectingbackend';

function App() {
  const [count, setCount] = useState(0);
  const [cardItems, setCardItems] = useState(['Product1', 'product2']);
  
  const handleSelectedItem = (item: string) => {
    console.log(`Selected item: ${item}`);
  }

  const [expenses, setExpenses] = useState([
    {id: 1, description: "Apple", amount: 10, category:"Fruit"},
    {id: 2, description: "Beans", amount: 10, category:"Veg"},
    {id: 3, description: "Chicken", amount: 10, category:"Non-Veg"}
  ]);

  const [category, setCategory] = useState("");
  const [productCategory, setProductCategory] = useState("");

  

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <Form></Form>
        </div>
        <div>
                <ConnectingBackend category={productCategory}></ConnectingBackend>

          <Message items={["React", "Angular", "TypeScript"]} heading="Learning Frameworks" onSelectedItem= { handleSelectedItem } />
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        <NavBar cartItemCount={cardItems.length}></NavBar>
        <Card cardItems={cardItems} onClickClear={ () => setCardItems([]) }></Card>

        {/* When the StrictMode is enable in development react renders each component twice so it comes 2,4,6.
        Uncomment the component and check it once */}
        <PureComponentFun ></PureComponentFun>
        {/* <PureComponentFun ></PureComponentFun>
        <PureComponentFun ></PureComponentFun> */}       
      </section>
      <div>
        <Expense onSubmit= { expense => { setExpenses([...expenses, {...expense, id: expenses.length + 1}]) }}></Expense>
      </div>
      <div className='mb-3'><ExpenseFilter onSelectCategory={ (c) => setCategory(c)}></ExpenseFilter></div>
      
      <ExpenseList expenses={category ? expenses.filter(x=>x.category === category) : expenses} onDelete={ (id) => setExpenses(expenses.filter(x=>x.id !== id )) }></ExpenseList>
      
      <select className="form-select" onChange={(event) => setProductCategory(event.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="household">house hold</option>
      </select>
      

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
