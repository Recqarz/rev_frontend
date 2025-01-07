import { useSelector } from "react-redux";
import AllRoutes from "./components/AllRoutes";

function App() {
  const userReducer = useSelector((store) => store.userReducer);
  const caseReducer = useSelector((store) => store.caseReducer);
  console.log(caseReducer, userReducer);
  return (
    <div>
      <AllRoutes />
    </div>
  );
}

export default App;
