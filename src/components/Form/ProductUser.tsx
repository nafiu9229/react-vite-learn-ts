import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
//import apiClient from '../../services/api-client';
import userService from '../../services/user-service';

function ProductUser(){

    interface ProductUser {
        id: number;
        name: string;
        email: string;
    }

    const [productUser, setProductUser] = useState<ProductUser[]>([])
    const {register, handleSubmit, reset} = useForm<ProductUser>();

    const onSubmitProductUser= (data: ProductUser) => {
        console.log("Data", data);
        userService.create(data).then((res) => {
            setProductUser([res.data, ...productUser]);
            reset();
        })
    }

    const onDeleteProduct = (id: number) => {
        userService.delete(id).then(() => {
            setProductUser(productUser.filter(p=> p.id !== id));
        })
    }

    return(<>
    <form onSubmit={handleSubmit((data)=> onSubmitProductUser(data))}>
        <div className='mb-3'>
            <label htmlFor="name" className="form-label">Name</label>
            <input {...register('name')} id='name' type="text" className="form-control" />
        </div>
        <div className='mb-3'>
            <label htmlFor="email" className="form-label">Email</label>
            <input {...register('email')} id='email' type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>     
    <ul>
       { productUser.map((p) => <li key={p.id}> Name: {p.name} email {p.email}
        <button className="btn btn-outline-danger" onClick={ () => onDeleteProduct(p.id)}>Delete</button>
         </li>) } 
    </ul>   
    </>)

}

export default ProductUser;