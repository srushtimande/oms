import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'
import './songs.css';
                        //9         //4
function Pagination({itemsCount, pageSize, onPageChange}) {

    const pagesCount=Math.ceil(itemsCount/pageSize);
    const pages = _.range(1,pagesCount+1)

    if(pagesCount === 1) return null;

    return (
        <div className="Page" aria-label="Page navigation example">
            <ul className="pagination">

                {pages.map(page=>(
                    <li key={page} onClick={()=>onPageChange(page)}
                        className="page-item">
                        <button className="page-link" href="/">{page}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired
}

export default Pagination;