import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import  categories  from "../Categories";

interface Props {
    onSubmit: (data: ExpenseFormData) => void;
}

    const schema = z.object({
        description: z.string().min(3, {message: 'Description must be atleast 3'}).max(50),
        amount: z.number({message:'Amount is required'}).min(0.01, {message: 'Amount must be atleast 0.01'}).max(100_000),
        category: z.enum(categories, {
           error: 'Category need to select'
        })
    });

   export type ExpenseFormData = z.infer<typeof schema>;

const Expense = ( {onSubmit}: Props ) =>{



    const { register, handleSubmit, formState: {errors}, reset } = useForm<ExpenseFormData>({ resolver: zodResolver(schema)})
    console.log(errors)

    return(
        <>
        <form onSubmit={handleSubmit(data => {
                onSubmit(data); 
                reset();
            }
        )}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} id="description" type="text" className="form-control" />
                { errors.description && <p className="text-danger">{errors.description.message}</p> }
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', { valueAsNumber: true })} id="amount" type="text" className="form-control" />
                { errors.amount && <p className="text-danger">{errors.amount.message}</p> }
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select {...register('category')} id="category" className="form-control">
                    <option value=""></option>
                    {categories.map(c=> <option key={c} value={c} >{c}</option>)}
                </select>
                { errors.category && <p className="text-danger">{errors.category.message}</p> }
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        </>
    )

}

export default Expense;