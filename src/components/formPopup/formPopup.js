import { valueReducer, getDateFromTimeStamp } from "../utils";
import './formPopup.css';

const { forwardRef, useState, useImperativeHandle } = require("react")

let FormPopup = ({nameID, pnrID, fromLocationID, toLocationID, dateID, contactID, amountID}, ref) => {

    const [isEnabled, setEnabled] = useState(false);
    const [item, setItem] = useState(null);

    useImperativeHandle(ref, () => ({
        showItem: (item) => {
            setItem(item);
            setEnabled(true);
        }
    }));

    const handleClose = () => {
        setEnabled(false);
        setItem(null)
    }
    return (
        item && isEnabled && <div className={`form-popup${isEnabled ? ' form-popup--enabled' : ''}`}>
            <button className="form-popup__close" onClick={handleClose}>Close</button>
            <form action="">
                <fieldset>
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__pnr">PNR</label>
                        <input id="form-popup__pnr" className='form-popup__input' type="text" disabled={true} value={valueReducer(pnrID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__from-location">From Location</label>
                        <input id="form-popup__from-location" className='form-popup__input' type="text" disabled={true} value={valueReducer(fromLocationID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__to-ocation">To Location</label>
                        <input id="form-popup__to-location" className='form-popup__input' type="text" disabled={true} value={valueReducer(toLocationID, item)}></input>
                    </div>
                    
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__date">Date of Journey</label>
                        <input id="form-popup__date" className='form-popup__input' type="text" disabled={true} value={getDateFromTimeStamp(valueReducer(dateID, item))}></input>
                    </div>
                    
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__name">Name of Passanger</label>
                        <input id="form-popup__name" className='form-popup__input' type="text" disabled={true} value={valueReducer(nameID, item)}></input>
                    </div>
                    <div>
                        <label className="form-popup__label" htmlFor="form-popup__contact">Contact Number</label>
                        <input id="form-popup__contact" className='form-popup__input' type="text" disabled={true} value={valueReducer(contactID, item)}></input>
                    </div>
                    <div>
                        <div className='form-popup__input form-popup__total'>Total: {valueReducer(amountID, item)}</div>
                    </div>
                    <div>
                        <input  className="form-popup__input form-popup__submit" type="submit" value="Submit"></input>
                    </div>
                    
                </fieldset>
            </form>
        </div>
        );
}

FormPopup = forwardRef(FormPopup);

export default FormPopup;