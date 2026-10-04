import { CiHeart } from 'react-icons/ci';
import { useState } from  'react';
import { produce } from 'immer';
import './Like.module.css'
function Like(){

    const [liked, setLiked] = useState(false);
    const [tags, setTags] = useState(['happy', 'cheerful']);
    const [home, setHome] = useState([
        {id:1, title: 'Land', status: 'Done'},
        {id:2, title: 'Build home', status: 'Not yet'}
    ])

    const callSetLiked = () =>
    {
        console.log("before", liked);
        setLiked(!liked);
        console.log("After", liked);

    }

    const AddItem = () =>{
        setTags([...tags, 'exiciting']);
        console.log(...tags);
    }

    const removeItem = () => {
        setTags(tags.filter(tag => tag !== 'cheerful'));
        
    }

    const updateItem = () => {
        setTags(tags.map(t => t === 'happy' ? 'happiness': t));

        setHome(home.map(h => h.id === 2 ? {...h, status: 'yet to start'} : h));
        
        // Using Immer's produce to mutate the draft directly; no manual mapping or cloning required.        
        setHome(produce(draft => {
          const home =  draft.find(h => h.id === 2);
          if(home)
                home.status = 'Soon we will start'
        }));
        console.log(home);
    }

    return (<>
    <div> <CiHeart size={40} color={liked ? 'red' : 'green'} onClick={() => {console.log('clicked'); callSetLiked()}} /></div>
    <button onClick= {AddItem}>Add</button>
    <button onClick= {removeItem}>Remove</button>
    <button onClick= {updateItem}>Update</button>
    </>)
}

export default Like;