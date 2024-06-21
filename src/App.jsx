import { Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LatestBetPage from "./pages/LatestBetPage";
import AgentPage from "./pages/AgentPage";
import AgentTransactionPage from "./pages/AgentTransactionPage";
import WinningNumbberPage from "./pages/WinningNumberPage";
import WinnerListPage from "./pages/WinnerListPage";
import BanNumberPage from "./pages/BanNumber";
import ReportPage from "./pages/ReportPage";
import LimitNumberPage from "./pages/LimitNumberPage";
import ManageOddPage from "./pages/ManageOddPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/admin/login" element=<LoginPage /> />
        <Route path="/admin/latestbets" element=<LatestBetPage /> />
        <Route path="/admin/agents" element=<AgentPage /> />
        <Route
          path="/admin/agenttransactions"
          element=<AgentTransactionPage />
        />
        <Route path="/admin/winningnumbers" element=<WinningNumbberPage /> />
        <Route path="/admin/winnerlists" element=<WinnerListPage /> />
        <Route path="/admin/bannumbers" element=<BanNumberPage /> />
        <Route path="/admin/limitnumbers" element=<LimitNumberPage /> />
        <Route path="/admin/manageodds" element=<ManageOddPage /> />
        <Route path="/admin/reports" element=<ReportPage /> />
        <Route path="/admin/" exact element=<HomePage /> />
      </Routes>
    </Layout>
  );
};

export default App;
