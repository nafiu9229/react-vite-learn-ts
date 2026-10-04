import  { useRef, type SubmitEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

function Form(){
    //useRef
    /*
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const person = { Name: '' , Age: '' };

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(nameRef.current != null)
            person.Name = nameRef.current.value;
        if(ageRef.current != null)
            person.Age = ageRef.current.value;

        console.log("Person", person);
    }
    return (
        <>
        <form onSubmit={ (event) => onSubmit(event) }>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input ref={nameRef} id="name" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label"></label>
                <input ref={ageRef} id='age' type="number" className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </>
    )
    */

    //controlled component
    /*
    const [person, setPerson] = useState({ Name: '' , Age: '' });

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Person", person);
    }
    return (
        <>
        <form onSubmit={ (event) => onSubmit(event) }>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input onChange={(event) => setPerson({...person, Name: event.target.value})} value={person.Name} id="name" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label"></label>
                <input onChange={(event) => setPerson({...person, Age: event.target.value})} value={person.Age} id='age' type="number" className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </>
    )*/

    //no validation
    /*
    const {register, handleSubmit} = useForm();
     return (
        <>
        <form onSubmit={ handleSubmit(data => console.log(data)) }>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input { ...register('name') } id="name" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label"></label>
                <input { ...register('age')} id='age' type="number" className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </>
    )
    */

    //Built in validation provided directly by React Hook Form
    /*
    interface FormData{
        name: string;
        age: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); //useForm() also we can pass for the type safety we can pass as interface
    
     return (
        <>
        <form onSubmit={ handleSubmit(data => console.log(data, errors)) }>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input { ...register('name', {required: true, minLength: 3}) } id="name" type="text" className="form-control" />
                { errors.name?.type === 'required' && <p className='text-danger'> Name is required </p> }
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label"></label>
                <input { ...register('age', {min:20})} id='age' type="number" className="form-control" />
                { errors.age?.type === 'min' && <p className='text-danger'>Age must be 20 or above</p>  }
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </>
    )
        */

    //Zod based lib validation (npm install zod) / (npm install @hookform/resolvers)-->resolver we can use for zod, joi and yup
    const schema = z.object({
        name: z.string().min(3, {message: 'Name must be at least 3 character'}),
        age: z.number({ message: 'Age is required' }).min(18, {message: 'Age must be greater then 18'})
    });

    type FormData = z.infer<typeof schema>;

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({resolver: zodResolver(schema)})
     return (
        <>
        <form onSubmit={ handleSubmit(data => console.log(data, errors)) }>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input { ...register('name') } id="name" type="text" className="form-control" />
                { errors.name && <p className='text-danger'> {errors.name.message} </p> }
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label"></label>
                <input { ...register('age', { valueAsNumber: true })} id='age' type="number" className="form-control" />
                { errors.age && <p className='text-danger'> {errors.age.message} </p>  }
            </div>
            <button disabled={!isValid} className="btn btn-primary">Submit</button>
        </form>
        </>
    )

}

export default Form;