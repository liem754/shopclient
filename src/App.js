import { Routes, Route } from "react-router-dom";
import { path } from "./ultils/path";
import {
  Blog,
  BlogReview,
  Contact,
  DefaultLayOut,
  Home,
  Introduce,
  LayoutBlog,
  Login,
  ProductCT,
  ProductDetail,
} from "./pages/public";
import LayoutProduct from "pages/public/layoutproduct";
import { Information, LayoutUser } from "pages/user";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={path.USER} element={<LayoutUser />}>
          <Route path={path.INFORMATION} element={<Information />} />
        </Route>

        <Route path={path.PUBLIC} element={<DefaultLayOut />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.INTRODUTE} element={<Introduce />} />
          <Route path={path.CONTACT} element={<Contact />} />

          <Route path={path.REVIEWPRODUCT} element={<ProductDetail />} />

          <Route path={path.BLOG} element={<LayoutBlog />}>
            <Route path={""} element={<Blog />} />
            <Route path={path?.REVIEWBLOG} element={<BlogReview />} />
          </Route>
          <Route path={path.LAYOUTPD} element={<LayoutProduct />}>
            <Route path={path.CATEGORYPD} element={<ProductCT />} />
            {/* <Route path={path?.REVIEWBLOG} element={<BlogReview />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
