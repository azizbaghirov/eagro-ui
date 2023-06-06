import { Alert } from "components/Alert";
import { Loader } from "components/Loader";
import RouterComponent from "RouterComponent";
import "react-datepicker/dist/react-datepicker.css";
import { translateDatePicker } from "utils/datepicker-translate";

function App() {
  translateDatePicker();

  return (
    <div className="App">
      <Loader />
      <Alert />
      <RouterComponent />
    </div>
  );
}

export default App;
