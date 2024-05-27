const Filter = (props) => {
    return <>filter shown with<input value={props.filterString} onChange={props.handleChange} /></>
}

export default Filter