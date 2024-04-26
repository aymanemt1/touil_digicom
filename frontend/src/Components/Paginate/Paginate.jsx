import React from 'react'
import './Paginate.css'

export default function Paginate({ currentPage, totalPages, handlePageChange }) {

    return (
        <div className="pagination">
            <button 
                onClick={() => handlePageChange(null, currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>
            <button 
                onClick={() => handlePageChange(null, currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
}
