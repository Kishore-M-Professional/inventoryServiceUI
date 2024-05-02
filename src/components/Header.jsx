import React from "react";
import * as constants from '../common/constants';

function Header({value}) {
    
    switch (value){
        case 'title': return <h1>{constants.HEADER_TITLE}</h1>;
        case 'addItem': return <h1>{constants.ADD_ITEM}</h1>;
        case 'updateItem': return <h1>{constants.UPDATE_ITEM}</h1>;
        default: return <h1>{constants.DEFAULT_KEY}</h1>
    }
        
}

export default Header;