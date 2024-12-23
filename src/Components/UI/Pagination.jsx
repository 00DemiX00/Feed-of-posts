import React from "react";
import { getPagesArray } from "../../utils/pages";
import MyButton from "./Button/MyButton";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className='page__wrapper'>
         {pagesArray.map(p => 
            <MyButton
            onClick = {() => changePage(p)} 
            key={p}>
            {p}
            </MyButton>
      )}
        </div>
    );
};

export default Pagination;