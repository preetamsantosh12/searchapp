import {
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
} from "./searchBar.js";
import {
  buildSearchResults,
  deleteSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  //set the focus, DONE
  setSearchFocus();

  // listeners clear text, DONE
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

//Procedural workflow fucntion

const submitTheSearch = (event) => {
  event.preventDefault();
  // delete search results, DONE
  deleteSearchResults();

  //process the search, DONE
  processTheSearch();

  //set the focus, DONE
  setSearchFocus();
};

const processTheSearch = async () => {
  //clear the stats line, DONE
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(SearchTerm);
  if (resultArray.length) buildSearchResults(resultArray); //build search results, DONE
  //set stats line, DONE
  setStatsLine(resultArray.length);
};
