import React, { useEffect, useRef, useState } from 'react';

//import axios, { AxiosError, CanceledError } from 'axios';
//we can directly use as like above. to reuse the code we have created the seperate ts file and where ever we ref the axios we need to use apiClient and base-url also we are using from the ts file
import apiClient, { CanceledError, AxiosError } from '../services/api-client';
//As we all done then no longer apiclient required to import
import userService, { type User } from "../services/user-service";

const ConnectingBackend = ({category}: {category: string}) => {
    //No dependency Array
    /*
    const refIn = useRef<HTMLInputElement>(null);
    useEffect(() => 
    {
        if(refIn.current) refIn.current.focus();
    });

    useEffect(() => {
        console.log("useEffect");
        document.title = 'Focus';
    })
   

    return (<>
        <div><input type="text" ref={refIn} className="form-control" /></div>
    </>)
     */

    //Empty dependency array
    const [productList, setProductList] = useState<string[]>([]);
    /**
     * Empty dependency array (useEffect(() => { ... }, [])): Runs only once when the component first appears on the screen (called "mounting"). 
     * This is ideal for initial setup tasks, like loading user data when a page opens
     * if we not add [] then it will happen infinite loop. as we are updating the productList
     */
    /*
    useEffect(()=> {
        console.log("Fetching product");
        setProductList(['Clothing', 'Household']);            
    }, []);//it execute only once

    return(<>
        <div>Product list</div>
    </>);
    */

    //Array with variable
   
   /* useEffect(() => {
        console.log('Fetching product', category);
         setProductList(['Clothing', 'Household']); 
    }, [category]);

    return(<>
    <div>Product list</div>
    </>)*/

    //API
    // interface User {
    //     id: number;
    //     name: string;
    //     email: string;
    // }
    //we can write from here or we can take it from user-service.ts
    const [productUser, setProductUser]= useState<User[]>([])
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        /*
        const controller = new AbortController();        
        apiClient.get('users', {signal: controller.signal}).then((res)=>{ console.log(res);
            setProductUser(res.data);
           // setIsLoading(false);//you can comment the finallfy block
        }).catch(err =>{ 
            if(err instanceof CanceledError) return;
            console.log(err);
        })
        .finally(() => {
             if (!controller.signal.aborted) {
                setIsLoading(false);
            }
        })
        return () => controller.abort();
        */

        //Either we can make use like above or we can make use seperate service and call here
        const { request, cancelC } = userService.getAllUsers();
        request.then((res)=>{ console.log(res);
            setProductUser(res.data);
        }).catch(err =>{ 
            if(err instanceof CanceledError) return;
            console.log(err);
        })
        .finally(() => {
             if (!cancelC().signal.aborted) {
                setIsLoading(false);
            }
        })
        return () => cancelC().abort();

    },[]);

    const deleteUser =(p:User) =>{
        const orginalProductUser = [...productUser];
        setProductUser(productUser.filter(u => u.id !== p.id));
        // apiClient.delete('users/'+ p.id).catch((err) =>{
        //     setError(err.message);
        //     setProductUser(orginalProductUser);
        // });

        userService.deleteUser(p.id).catch((err) =>{
            setError(err.message);
            setProductUser(orginalProductUser);
        });
    } 

    const addUser = ()=>{
        const orginalProductUser = [...productUser];
        const newUser = { id: 0, name: 'Mohammed Shazain', email: 'msz@gmail.com' }
        setProductUser([newUser, ...productUser]);

        userService.cerateUser(newUser)
        .then(res => setProductUser([res.data, ...productUser]))
        .catch(err => {
            setError(err.message);
            setProductUser(orginalProductUser);
        })
    }

    const updateUser = (user: User) => {
        const orginalProductUser = [...productUser];
        const updateUsers = {...user, name: user.name + "!"};
        setProductUser(productUser.map(p=> p.id === user.id ? updateUsers: p));

        userService.updateUser(user.id, updateUsers)
        .catch(err=> {
            setError(err.message);
            setProductUser(orginalProductUser);
        })
    }

    //using async and await
    // useEffect(()=>{
    // const fetchUsers = async() =>{
    //     try{
    //         const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users').then((res)=>{ console.log('async',res);
    //             //setProductUser(res.data)
    //         })
    //     }
    //     catch(err){
    //         setError((err as AxiosError).message);
    //     }
    // }
    // fetchUsers();
    // },[]);
     return(<>
     {isLoading && <div className='spinner-border'></div>}
    <div>Product list</div>
    <button onClick={addUser} className="btn btn-primary">Add</button>
    <ul className='list-group'>
        { !isLoading && productUser.map(p=> <li className='list-group-item d-flex justify-content-between' key={p.id}>{p.name} - {p.email}
            
            <div>
                <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(p)}>Update</button>
                <button className="btn btn-outline-danger" onClick={() => deleteUser(p)}>Delete</button>                
            </div>
        </li>)}
    </ul>
    </>)

};

export default ConnectingBackend;