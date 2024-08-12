import { usePagination, DOTS } from "../../hooks/usePagination";
import "./pagination.css";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav className="pagination">
      <ul className="pagination_container section__padding">
        {/* prev button */}
        <li className="pagination__container-item" onClick={onPrevious}>
          <button className="main__btn" disabled={currentPage === 1}>
            <IoArrowBack />
          </button>
        </li>

        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === DOTS) {
            return (
              <li key={idx} className="pagination__container-item_dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={idx}
              className={`pagination__container-item-digits ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

        {/* next button */}
        <li className="pagination__container-item" onClick={onNext}>
          <button className="main__btn" disabled={lastPage === currentPage}>
            <IoArrowForward />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
