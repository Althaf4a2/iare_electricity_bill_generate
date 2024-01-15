import "./App.css";
import Users from "./User";
import Lists from "./List";
import Home from "./Home";
import Layout from "./Layout";

import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "./component/auth";
import Print from "./component/print";
import BillGenerate from "./Bill";
import BillList from "./BillList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bill" element={<BillGenerate/>}/>
            <Route path="billList" element={<BillList/>}/>
            <Route path="list" element={<Lists />} />
            <Route path="user" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          <Route path="/print" element={<Print />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
