import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
import TopBar from "./TopBar";
import HistoricRatesBetweenCurrenciesPage from "./HistoricRatesBetweenCurrenciesPage";
import HistoricRatesPage from "./HistoricRatesPage";
const history = createHistory();

function App() {
  window.Chart.defaults.global.defaultFontFamily = `
  -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif`;

  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/historicrates" exact component={HistoricRatesPage} />
        <Route
          path="/historicrates2currencies"
          exact
          component={HistoricRatesBetweenCurrenciesPage}
        />
      </Router>
    </div>
  );
}

export default App;
