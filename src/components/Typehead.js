import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import data from "../data";
import SubCategory from "./SubCategory";

const Typehead = ({ suggestions, handleSelect }) => {
  const [val, setVal] = useState(""); // state for value
  const [ph, setPh] = useState("Please enter some text..."); // state for place holder
  const [selected_ind, setSelected] = useState(0);

  // console.log(data.books);
  let filtered_list = data.books.filter((ele) => {
    let title = ele.title.toLowerCase();
    //console.log(title.includes(val.toLowerCase()));
    return title.includes(val.toLowerCase());
  });
  // re-categorize the books
  let sorted_books = [
    { categoryName: "Science Fiction & Fantasy", book_sub: [], count: 0 },
    { categoryName: "Mystery & Thriller", book_sub: [], count: 0 },
    { categoryName: "Literature & Fiction", book_sub: [], count: 0 },
    { categoryName: "Non Fiction", book_sub: [], count: 0 },
    { categoryName: "Comedy", book_sub: [], count: 0 },
  ];
  filtered_list.map((ele) => {
    sorted_books[data.categories[ele.categoryId].index].book_sub.push(ele);
    sorted_books[data.categories[ele.categoryId].index].count++;
  });

  return (
    <>
      <Div>
        <Div_inner>
          <Input
            type="text"
            value={val}
            placeholder={ph}
            onChange={(event) => setVal(event.target.value)} // set value with state
            onKeyDown={(event) => {
              switch (event.key) {
                case "Enter": {
                  handleSelect(event.target.value);
                  return;
                }
                case "ArrowUp": {
                  // TODO: Handle moving the selection up
                  if (selected_ind - 1 >= 0 && filtered_list.length > 0) {
                    setSelected(selected_ind - 1);
                  }
                  return;
                }
                case "ArrowDown": {
                  // TODO: Handle moving the selection down
                  if (
                    selected_ind + 1 < filtered_list.length &&
                    filtered_list.length > 0
                  ) {
                    setSelected(selected_ind + 1);
                  }
                  return;
                }
                case "Escape": {
                  setVal("");
                }
              }
            }}
          />
          <Button
            onClick={() => {
              setVal("");
              setPh("Please enter some text..."); // onclick, reset value
            }}
          >
            Clear
          </Button>
        </Div_inner>
        {filtered_list.length > 0 && val !== "" && (
          <Ul>
            {filtered_list.map((ele, ind) => {
              let isSelected = selected_ind === ind ? true : false;
              return (
                <Li
                  key={ele.id}
                  onMouseOver={() => {
                    // mouse over then set the value to book (looks nicer)
                    setPh(ele.title);
                  }}
                  onClick={() => {
                    setVal(ele.title); // set the input to title
                    handleSelect(ele.title); // evoke handler
                  }}
                  style={{
                    background: isSelected ? "lightgray" : "transparent",
                  }}
                >
                  {ele.title}
                </Li>
              );
            })}
          </Ul>
        )}
      </Div>
    </>
  );
};

const Div = styled.div`
  margin-top: 100px;
  margin-left: 200px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Div_inner = styled.div`
  margin-bottom: 40px;
  align-self: center;
`;
const Ul = styled.ul`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid lightsalmon;
  border-radius: 10px;
  box-shadow: 2px 5px 30px -8px rgba(0, 0, 0, 0.54);
  padding: 10px;
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
const Button = styled.button`
  margin-left: 10px;
`;
const Input = styled.input`
  &:focus {
    outline: none;
  }
`;

export default Typehead;
