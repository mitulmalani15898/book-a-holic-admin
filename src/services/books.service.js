import http from "../http-common";
const getAll = () => {
  return http.get("/books");
}
const create = (data) => {
  return http.post("/books",data);
}
const edit = (data) => {
  return http.put("/books",data);
}

const remove = (data) => {
  return http.delete("/books/"+data);
}
export{getAll,create,edit,remove};