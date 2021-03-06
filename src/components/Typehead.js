import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import data from "../data";
//import SubCategory from "./SubCategory";

const Typehead = ({ suggestions, handleSelect }) => {
  const [val, setVal] = useState(""); // state for value
  const [ph, setPh] = useState("Please enter some text..."); // state for place holder
  const [selected_ind, setSelected] = useState(-1);

  const handlePh = (selected, title) => {
    if (selected) {
      setPh(title);
      return;
    } else {
      return;
    }
  };
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
  filtered_list.map((ele, ind) => {
    let k = ele.title.toLowerCase();
    ele["halfIndex"] = k.indexOf(val.toLowerCase());
    ele["originInd"] = ind;
    sorted_books[data.categories[ele.categoryId].index].book_sub.push(ele);
    sorted_books[data.categories[ele.categoryId].index].count++;
  });
  let selectedSuggestion = {
    id: "",
    categoryId: "",
    title: "",
    author: "",
  };

  //console.log(sorted_books);
  return (
    <>
      <Div>
        <Div_inner>
          <Input
            type="text"
            value={val}
            placeholder={ph}
            autofocus
            onChange={(event) => setVal(event.target.value)} // set value with state
            aria-describedby="initInstr"
            aria-owns="search-results"
            aria-haspopup="true"
            aria-expanded="false"
            aria-autocomplete="list"
            aria-activedescendant="search-results"
            onKeyDown={(event) => {
              switch (event.key) {
                case "Enter": {
                  setVal(selectedSuggestion.title);
                  handleSelect(selectedSuggestion.title);
                  return;
                }
                case "ArrowUp": {
                  // TODO: Handle moving the selection up
                  if (selected_ind - 1 >= 0 && filtered_list.length > 0) {
                    setSelected(selected_ind - 1);
                    setPh(selectedSuggestion.title);
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
                    setPh(selectedSuggestion.title);
                  }
                  return;
                }
                case "Escape": {
                  setVal("");
                  setPh("Please enter some text");
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
          <Ul id="search-results" role="listbox">
            {sorted_books.map((ele, ele_ind) => {
              return (
                ele.count > 0 && ( // eliminate the ones with no counts
                  <div key={`subCategory-${ele_ind}`}>
                    <Li_title>{ele.categoryName}</Li_title>
                    {ele.book_sub.map((elem, ind) => {
                      // get the cum of books before current location
                      let i = 0;
                      let count = 0;
                      while (i < ele_ind) {
                        // this way is not really elegant but rightnow it's the way I thought of and it works
                        // loop until current catgory name, and increment the count
                        count += sorted_books[i].count;
                        i++; // add i
                      }
                      let isSelected =
                        selected_ind - count === ind ? true : false;
                      if (isSelected) {
                        selectedSuggestion = elem;
                      }
                      return (
                        <Li
                          key={elem.id}
                          onMouseOver={() => {
                            // mouse over then set the value to book (looks nicer)
                            setPh(elem.title);
                          }}
                          onClick={() => {
                            setVal(elem.title); // set the input to title
                            handleSelect(elem.title); // evoke handler
                          }}
                          style={{
                            background: isSelected
                              ? "lightgray"
                              : "transparent",
                          }}
                          id={elem.title}
                          role="option"
                          aria-selected={`${isSelected}`}
                        >
                          {elem.title.substr(0, elem.halfIndex)}
                          <Prediction>
                            {elem.title.substr(elem.halfIndex)}
                          </Prediction>
                          <span className="category">
                            {" "}
                            in{" "}
                            <span className="category-inner">
                              {ele.categoryName}
                            </span>
                          </span>
                        </Li>
                      );
                    })}
                  </div>
                )
              );
            })}
          </Ul>
        )}
      </Div>
    </>
  );
};

const Div = styled.div`
  margin-top: 50px;
  margin-left: 200px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Div_inner = styled.div`
  margin-bottom: 10px;
  align-self: center;
`;
const Prediction = styled.span`
  font-weight: bold;
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
  border-radius: 5px;

  &:hover {
    background: lightblue !important;
  }
  .category {
    color: lightgray;
    font-size: 1.1em;
    font-style: italic;
  }
  .category-inner {
    color: purple;
    font-size: 0.8em;
  }
`;
const Li_title = styled.li`
  line-height: 25px;
  color: gray;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1em;
`;
const Button = styled.button`
  height: 40px;
  width: 70px;
  margin-left: 10px;
  background-color: lightblue;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

export default Typehead;
