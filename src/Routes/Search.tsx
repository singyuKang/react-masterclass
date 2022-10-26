import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");

  console.log(location);
  return null;
  //api 요청 fetch 해서 결과 알려주도록
}
export default Search;
