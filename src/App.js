import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [pageParam, setPageParam] = useState(10);

  // update selected genres state with new value
  const updateSelectedGenres = (activeGenres) => {
    setSelectedGenres(activeGenres);
  };

  return (
    <div>
      <Header
        onSearch={(searchValue) => {
          setValue(searchValue);
        }}
        onSelectedGenresChange={updateSelectedGenres}
        pageFormat={(pageValue) => {
          setPageParam(pageValue);
        }}
      />
      <Main
        search={value}
        selectedGenres={selectedGenres}
        pageFMT={pageParam}
      />
    </div>
  );
}
