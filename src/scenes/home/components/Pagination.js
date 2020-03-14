import React, { Component, Fragment, useMemo } from "react";

import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const Pagination = ({ getPage, currPage }) => {
    const prevPages = useMemo(() => {
        if (currPage <= 1) return [];
        if (currPage > 3) {
            return [1, "...", currPage - 2, currPage - 1];
        } else {
            return Array.from(Array(currPage - 1).keys()).map(r => r + 1);
        }
    }, [currPage]);
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
            <button disabled>{currPage}</button>
            <button onClick={() => getPage(currPage + 1)}>{currPage + 1}</button>
        </div>
    );
};
export default Pagination;
