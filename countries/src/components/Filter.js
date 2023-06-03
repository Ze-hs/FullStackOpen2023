const Filter = ({filter, handleChange}) => {
    return (
        <div>
            find countries <input value={filter} onChange={handleChange}></input>
        </div>
    )
}

export default Filter