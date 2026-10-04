import { useState } from 'react';
import styled from 'styled-components';

interface ListItemProps {
    $active: boolean;
}

interface ButtonProps {
  // Define any props for the Button component here if needed
children: string; // Example prop for button text
buttonType: string;
onClick: () => void; //Example prop for a click event handler
}

//npm install styled-components
const List = styled.ul`
 list-style-type:none;
 padding: 0;
 `

 const ListLI = styled.li<ListItemProps>`
 padding: 5px; 0px;
 background-color: ${ props => props.$active ? 'blue' : 'transparent' }
 `

 const listItemClicked = (item: string) => {
    console.log(`List item clicked: ${item}`);
 }



const listItems: string[] = [
    "I will be having a great time learning React!",
    "I will build a good habit of coding!",
    "I will have a healthy and wealthy life!"
  ];

const Button = ({ children, onClick, buttonType= "primary" }: ButtonProps) => {
     const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <>
        <button style={{width:500, background: '#08fa75'}} className={'btn btn-' + buttonType } onClick={ onClick }>{children}</button>

        <p>Styled components</p>
        <List>
            {listItems.map((item, index)=>{
                return <ListLI 
                key={index} 
                $active = {index === selectedIndex}
                onClick = { () => {listItemClicked(item); setSelectedIndex(index); }}
                >{item}</ListLI>
            })}     
        </List>
        </>
    );
}

export default Button;