import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className='pagination'>
        {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
