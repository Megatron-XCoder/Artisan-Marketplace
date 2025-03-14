import { useEffect, useState } from "react";
import {Link, useSearchParams} from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import {useSelector} from "react-redux";
import Loader from "../Components/Layout/Loader.jsx";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    if (allProducts) {
      let processedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);

      if (categoryData) {
        processedData = processedData.filter((i) => i.category === categoryData);
      }

      setData(processedData);
    }
    window.scrollTo(0, 0);
  }, [allProducts, categoryData]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = data.slice(0, indexOfLastProduct);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
      <>
        <div>
          <Header activeHeading={3} />
          <br />
          {isLoading ? (
              <Loader />
          ) : (
              <div className={`${styles.section} mb-4`}>
                <nav className="flex mb-4" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                      <Link to={"/"}
                            className="inline-flex items-center text-xl font-semibold text-gray-400 hover:text-pink-700">
                        <svg className="me-2.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                          <path
                              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m9 5 7 7-7 7"/>
                        </svg>
                        <Link to={"/best-selling"}
                              className="ms-1 text-xl font-semibold text-gray-600 hover:text-pink-700 md:ms-2">
                          All Products
                        </Link>
                      </div>
                    </li>
                  </ol>
                </nav>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
                  {currentProducts.map((i, index) => (
                      <ProductCard data={i} key={index} />
                  ))}
                </div>
                {data.length === 0 && (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      No Products Found!
                    </h1>
                )}

                {currentProducts.length < data.length && (
                    <div className="flex justify-center my-3">
                      <button
                          onClick={loadMore}
                          className={`${styles.button} hover:bg-gradient-to-br text-white px-8 py-3 text-md`}
                      >
                        Show More
                      </button>
                    </div>
                )}
              </div>
          )}
          <Footer />
        </div>
      </>
  );
};

export default ProductsPage;