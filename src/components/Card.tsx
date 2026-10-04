import React from 'react';

interface props{
    cardItems: string[];
    onClickClear: () => void;
}

const Card = ( { cardItems, onClickClear }: props) =>{
    return (
        <>
            <div>Card items</div>
            <ul>
               {cardItems.map(item => <li key={item}> {item} </li>)}  
            </ul>
            <button onClick={onClickClear}>Clear</button>
        </>
    )
}

export default Card;