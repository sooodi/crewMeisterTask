import React from "react";
interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: any) => void;
  currentPage: number;
}
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="py-2 px-5 flex justify-end items-center">
      <div>
        <p className="pr-5 text-sm text-gray-700">
          Showing
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage - 10}{" "}
          </span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            {pageNumbers.map((number, index) => (
              <a
                onClick={() => {
                  paginate(number);
                }}
                href="#"
                key={index}
                className={
                  currentPage === number
                    ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {number}
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
