import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComp/CardComponent";
import * as ProductService from "../../services/ProductService";

import "./TypeProductPage.scss";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import TypeProductComponent from "../../components/TypeProductComp/TypeProductComponent";

const TypeProductPage = () => {
  const { state } = useLocation(); // lấy state từ Location
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounceHook(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typeProduct, setTypeProduct] = useState([]);

  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res?.data);
    } else {
      setIsLoading(false);
    }
  };

  const fetchProductAllType = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
    return res;
  };

  useEffect(() => {
    fetchProductAllType();
    if (state) {
      fetchProductType(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="wrapper-containerTypeProPage">
        <div className="row-type">
          {typeProduct.map((item) => {
            return <TypeProductComponent key={item} name={item} />;
          })}
        </div>

        <div className="row-content">
          <div className="card-Comp">
            {products.length > 0 ? (
              products
                // eslint-disable-next-line array-callback-return
                ?.filter((pro) => {
                  if (searchDebounce === "") {
                    return pro;
                  } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                    return pro;
                  }
                })
                ?.map((prod) => {
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
              <div className="loading-product">Đang tải dữ liệu...</div>
            )}
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default TypeProductPage;
