import axios from "axios";

export default async function page({params}) {
 const bookId= params.dynamicPage;
 let book = null;


 await axios.get('localhost:3000/api/bookFetch/'+ bookId).then((result) => {
  console.log(result)
  book = result.body.result;
 }).catch((err) => {
  console.log(err.message)
 });


  return (
    <>
    <div>Single dynamic page {bookId}</div>
    </>
  )
}
