import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { valueReducer } from "../utils";

let BasicNumberFilter = ({content, resetAllFilters, setFilteredContent, contactID, pnrID}, ref) => {

    const [filterNumber, setFilterNumber] = useState(null);

    useImperativeHandle(ref, () => ({
        resetNumSearch: () => {
            setFilterNumber(null);
            console.log('DMAN')
        }
    }));

    useEffect(() => {
        console.log(filterNumber)
        if (!filterNumber) {
            setFilteredContent([...content])
            return;
        }
        setFilteredContent(content.filter(item => {
            return `${valueReducer(pnrID, item)}`.includes(filterNumber) || `${valueReducer(contactID, item)}`.includes(filterNumber);
        }));
    }, [filterNumber, content, pnrID, contactID, resetAllFilters, setFilteredContent])

    const handleNumberChange = e => {
        resetAllFilters();
        setFilterNumber(e.target.value || null)
    }

    return (
        <div className="filters__basic-number-filter">
            <label className="filters__label" htmlFor="numberFilter">Number Search</label>
            <input className='filters__input' id="numberFilter" type="number" onChange={handleNumberChange} value={filterNumber ? filterNumber : ''} placeholder="Enter number to search"></input>
        </div>
       
    );
}

BasicNumberFilter = forwardRef(BasicNumberFilter);

export default BasicNumberFilter;