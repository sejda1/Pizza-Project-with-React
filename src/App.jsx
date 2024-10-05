import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import orderPizza from "./components/orderPizza";
import mainPage from "./components/mainPage";
import success from "./components/success";
import { useState } from "react";

function App () {
  const [orderData, setOrderData] = useState(null);
  
  const handleOrderData = ((data) => {
    setOrderData(data);
  });

  return (
    /* router ve switch ile sarmak yonlendirme islevselligini yonetmenin en iyi yoludur.*/
    <Router>
      <Switch>
        <Route exact path="/"><mainPage/></Route>
        <Route path="/siparis-olustur"><orderPizza onSubmit={handleOrderData}/></Route>
        <Route path="/siparis-alindi"><success orderData={orderData}/></Route>
      </Switch>
    </Router>
  );
}

export default App