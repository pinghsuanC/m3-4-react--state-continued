import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const SubCategory = ({ cat, books, handler, setPh, setVal, selected_ind }) => {
  return (
    books.length > 0 && (
      <>
        <Li_title>In {cat}: </Li_title>
        {books.map((ele, ind) => {
            let isSelected = selected_ind - books.length;
          //let isSelected = selected_ind === ind ? true : false;
          return (
            <Li
              // mouse over then set the value to book (looks nicer)
              onMouseOver={() => {
                setPh(ele.title);
              }}
              // onclick, use handler
              onClick={() => {
                setVal(ele.title); // set the input to title
                handler(ele.title);
              }}
              /*style={{
                background: isSelected ? "lightgray" : "transparent",
              }}*/
              key={`book-${ele.title}`}
            >
              {ele.title}
            </Li>
          );
        })}
      </>
    )
  );
};

const Li_title = styled.li`
  line-height: 25px;
  color: gray;
  padding-left: 20px;
  font-size: 0.8em;
`;
const Li = styled.li`
  height: auto;
  line-height: 20px;
  padding: 5px;
  font-size: 0.9em;

  &:hover {
    background: lightgray;
  }
`;

export default SubCategory;
