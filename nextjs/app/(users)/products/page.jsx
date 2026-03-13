import ProductList from "./productList";

const Products = async (props) => {
  const searchParams = await props.searchParams;
  console.log("outer", searchParams)
  
  const category = searchParams?.category || "all";
  const sort = searchParams?.sort || "default";
  const page = Number(searchParams?.page) || 1;

  return (
    <div>
        <ProductList/>
      showing products of category : {category} <br />
      sorting by : {sort} <br />
      page : {page}
    </div>
  );
};

export default Products;
