import categories from './Categories'

interface Props {
    onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({onSelectCategory}: Props) => {
    return(
        <select className="form-select" onChange={(event) => onSelectCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
            {/* <option value="Fruit">Fruit</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option> */}
        </select>
    )
}

export default ExpenseFilter;