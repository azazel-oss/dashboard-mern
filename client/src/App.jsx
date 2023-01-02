import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme.js";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Product from "./scenes/products";
import Layout from "./scenes/layout";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import DailySales from "./scenes/daily/index.jsx";
import MonthlySales from "./scenes/monthly/index.jsx";
import BreakdownSales from "./scenes/breakdown/index.jsx";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path={"/"}
                element={<Navigate to={"/dashboard"} replace />}
              />
              <Route path={"/dashboard"} element={<Dashboard />} />
              <Route path={"/products"} element={<Product />} />
              <Route path={"/customers"} element={<Customers />} />
              <Route path={"/transactions"} element={<Transactions />} />
              <Route path={"/geography"} element={<Geography />} />
              <Route path={"/overview"} element={<Overview />} />
              <Route path={"/daily"} element={<DailySales />} />
              <Route path={"/monthly"} element={<MonthlySales />} />
              <Route path={"/breakdown"} element={<BreakdownSales />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
