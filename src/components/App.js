import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Typeahead from "./Typehead";
import data from "../data";

const App = (props) => {
  const [l_search, useLSearch] = useState([]);

  return (
    <>
      <GlobalStyles />
      <Typeahead
        suggestions={data.books}
        handleSelect={(suggestion) => {
          // filter for suggestion
          //alert(suggestion);
          console.log(suggestion);
        }}
      />
    </>
  );
};

export default App;
