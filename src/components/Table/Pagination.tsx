import { FC } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  handlePageChange: (pageNo: number) => void;
  pageCount: number;
  currentPageNo: number;
};

const Pagination: FC<PaginationProps> = ({
  handlePageChange,
  pageCount,
  currentPageNo,
}) => {
  return (
    <div className="mt-9 mb-9 mr-auto">
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="&lt;"
          nextLabel="&gt;"
          breakLabel="..."
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          forcePage={currentPageNo}
          onPageChange={(e) => {
            handlePageChange(e.selected);
          }}
          containerClassName="flex justify-end"
          breakClassName="h-8 w-8 leading-[30px] mr-2 text-center"
          breakLinkClassName="h-full w-full"
          pageClassName="h-8 w-8 leading-[30px] mr-2 text-center bg-white border border-solid rounded-sm flex justify-center items-center"
          pageLinkClassName="h-full w-full"
          previousClassName="h-8 w-8 leading-[30px] mr-2 text-center bg-white border border-solid rounded-sm flex justify-center items-center"
          previousLinkClassName="h-full w-full"
          nextClassName="h-8 w-8 leading-[30px] mr-2 text-center bg-white border border-solid rounded-sm flex justify-center items-center"
          nextLinkClassName="h-full w-full"
          activeClassName="text-green-350 border-green-350"
          disabledClassName="bg-stone-100 border border-grey-100 text-grey-300"
        />
      )}
    </div>
  );
};

export default Pagination;
