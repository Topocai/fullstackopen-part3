const FilterInput = ({ onFilterHandler }) => {
    return (
      <div>
        <label>Filter shown with: 
          <input onChange={onFilterHandler} type='text' />
        </label>
      </div>
    )
}

export default FilterInput;