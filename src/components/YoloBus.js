import {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import BusSchedule from './busSchedule/busSchedule';
import API from './services';
import Filter from './filters/filters';
import Pagination from './pagination/pagination';
import FormPopup from './formPopup/formPopup';


const YoloBus = () => {

    const [filteredContent, setFilteredContent] = useState([]);
    const [itemsPerPage] = useState(10)
    const formPopupRef = useRef(null);
    
    const tableHeadersMap = [{
        id: 'pnr',
        name: 'PNR No.'
    },{
        id: 'locationStart',
        name: 'From Location'
    },{
        id: 'locationEnd',
        name: 'To Location'
    },{
        id: 'date',
        name: 'Date of Journey',
        sortable: true
    },{
        id: 'passangerDetails.name',
        name: 'Name of passenger',
        sortable: 'true'
    },{
        id: 'passangerDetails.number',
        name: 'Contact number'
    },{
        id: 'amount',
        name: 'Total Amount'
    }];
    
    const data = [];

    const [content, setContent] = useState(data);
    const [tableHeaders] = useState(tableHeadersMap)

    const [paginatedData, setPaginatedData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPaginatedData([...filteredContent].splice(0, itemsPerPage));
        console.log(filteredContent);
    }, [filteredContent, itemsPerPage])

    const contentLoaded = content => {
        setLoading(false)
        setContent(content)
    };

    const selectItem = useCallback((item) => {
        formPopupRef.current.showItem(item);
    }, [])


    useEffect(()=> {
        API.getContent().then(contentLoaded);
    }, [])

    return (
        <Fragment>
            {loading ? <div className='loading'>Loading...</div> : <Fragment>
                <Filter {...{content, filteredContent, setFilteredContent}} pnrID={`pnr`} nameID={`passangerDetails.name`}/>
                <BusSchedule  data={paginatedData} {...{selectItem, tableHeaders}}/>
                <Pagination {...{filteredContent, itemsPerPage, setPaginatedData}}></Pagination>
                <FormPopup ref={formPopupRef} pnrID={`pnr`} fromLocationID="locationStart" toLocationID='locationEnd' dateID="date" contactID='passangerDetails.number' amountID="amount" nameID={`passangerDetails.name`}></FormPopup>
            </Fragment>}
            
        </Fragment>
    );
}

export default YoloBus;