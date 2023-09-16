import React, { Fragment, useEffect, useState } from "react";
import TypeProductComponent from "../../components/TypeProductComp/TypeProductComponent";
import SliderComponent from "../../components/SliderComp/SliderComponent";
import CardComponent from "../../components/CardComp/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { BsCartX } from "react-icons/bs";
import * as ProductService from "../../services/ProductService";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";
import slider4 from "../../assets/images/slider/slider4.jpg";
import slider5 from "../../assets/images/slider/slider5.jpg";
import "./HomePage.scss";
import { useSelector } from "react-redux";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import FacebookMesComponent from "../../components/FacebookMesComp/FacebookMesComponent";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounceHook(searchProduct, 500);
  const [limitPage, setLimitPage] = useState(15);
  const [typeProduct, setTypeProduct] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];

    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchProductAllType = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
    return res;
  };

  const {
    data: products,
    isLoading: isLoadingProducts,
    isPreviousData,
  } = useQuery(["products", limitPage, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true, // Nó sẽ giữ lại những data đã load rồi, khi click 'xem thêm' thì nó chỉ load data chưa đc load
  });

  // Gọi luôn type product
  useEffect(() => {
    fetchProductAllType();
  }, []);

  return (
    <div className="wrapper-containerHomePage">
      <div className="wrapper-typeProductComp">
        {typeProduct.map((item) => {
          return <TypeProductComponent key={item} name={item} />;
        })}
      </div>
      <div className="wrapper-sliderPage">
        <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5]} />
      </div>
      <LoadingComponent isLoading={isLoadingProducts}>
        <div className="wrapper-homePage">
          <div className="wrapper-cardPage">
            {products?.data?.length ? (
              products?.data?.map((prod) => {
                return (
                  <CardComponent
                    key={prod.name}
                    countInStock={prod.countInStock}
                    description={prod.description}
                    image={prod.image}
                    name={prod.name}
                    price={prod.price}
                    rating={prod.rating}
                    type={prod.type}
                    discount={prod.discount}
                    selled={prod.selled}
                    id={prod._id}
                  />
                );
              })
            ) : (
              <div className="card-empty">
                <span>Chưa có sản phẩm nào ở đây</span>
                <BsCartX />
              </div>
            )}
          </div>

          {products?.total === products?.data?.length ? (
            Fragment
          ) : (
            <div className="btn-more" onClick={() => setLimitPage((prev) => prev + 5)}>
              <button>{isPreviousData ? "Đang xử lý..." : "Xem thêm"}</button>
            </div>
          )}
        </div>
      </LoadingComponent>

      <FacebookMesComponent />
    </div>
  );
};

export default HomePage;
