import React, { useMemo } from "react";

const Pagination = ({ getPage, currentPage, hasNext = true }) => {
    const prevPages = useMemo(() => {
        if (currentPage <= 1) return [];
        if (currentPage > 3) {
            return [1, "...", currentPage - 2, currentPage - 1];
        } else {
            return Array.from(Array(currentPage - 1).keys()).map(r => r + 1);
        }
    }, [currentPage]);
    return (
        <div>
            {prevPages.map(pageNum =>
                pageNum === "..." ? (
                    <button disabled key={pageNum} onClick={() => getPage(pageNum)}>
                        {pageNum}
                    </button>
                ) : (
                    <button key={pageNum} onClick={() => getPage(pageNum)}>
                        {pageNum}
                    </button>
                )
            )}
            <button disabled>{currentPage}</button>
            {hasNext && <button onClick={() => getPage(currentPage + 1)}>{currentPage + 1}</button>}
        </div>
    );
};
export default Pagination;
