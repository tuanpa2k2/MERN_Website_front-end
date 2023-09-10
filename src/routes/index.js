import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/AuthenPage/SignInPage";
import SignUpPage from "../pages/AuthenPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailOrderPage from "../pages/DetailOrderPage/DetailOrderPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/detail-order/:id",
    page: DetailOrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSuccessPage,
    isShowHeader: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/productDetails/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/profile-page",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/system-admin",
    page: AdminPage,
    isShowHeader: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
