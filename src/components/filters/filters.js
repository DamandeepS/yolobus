import { useCallback, useEffect, useRef, useState } from "react";
import BasicNumberFilter from "../basicNumberFilter/basicNumberFilter";
import NameAutocomplete from '../name-autosuggest/name-autosuggest';
import './filters.css';

const Filter = ({setFilteredContent, content, pnrID, nameID, contactID}) => {

    // const [filterContent, setFilteredContent] = useEffect([])
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const minDateRef = useRef(null);
    const maxDateRef = useRef(null);
    const autocompleteRef = useRef(null);
    const numFilterRef = useRef(null);

    const handleDateChange = (e, type) => {
        resetAllFilters('date');
        if (type === 'min') {
            setMinDate(e.target.valueAsNumber)
        } else {
            setMaxDate(e.target.valueAsNumber + 86400000 - 1)
        }
    }

    const resetDateFilter = () => {
        setMinDate(null);
        setMaxDate(null);
        minDateRef.current.value = '';
        maxDateRef.current.value = '';
        
    }

    const resetAllFilters = useCallback((key) => {
        if (key!=='date') resetDateFilter();
        if (key!=='name') autocompleteRef.current.resetSearchView();
        numFilterRef.current.resetNumSearch()
    }, []);

    useEffect(() => {
        setFilteredContent([...content].filter(item => {
            return (minDate === null ? true : minDate < item.date) && (maxDate === null ? true : maxDate > item.date)
        }));
    }, [minDate, maxDate, setFilteredContent, content])

    return (
        <div className='filters'>
            <div className="filter__min-date">
                <label className="filters__label" htmlFor="min-date" >Search Name</label>
                <input className="filters__input" id="min-date" type="date" onChange={e => handleDateChange(e, 'min')} ref={minDateRef}></input>
            </div>
            <div className="filter__max-date">
                <label className="filters__label" htmlFor="max-date" >Search Name</label>
                <input className="filters__input" id="max-date" type="date" onChange={e => handleDateChange(e, 'max')} ref={maxDateRef}></input>
            </div>
            
            <BasicNumberFilter ref={numFilterRef} {...{content, setFilteredContent, pnrID, contactID, resetAllFilters}} />
            
            <NameAutocomplete ref={autocompleteRef} {...{content, setFilteredContent, nameID, resetAllFilters}} />
            
        </div>
    )
}

export default Filter;