import { Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LatestBetPage from "./pages/LatestBetPage";
import AgentPage from "./pages/AgentPage";
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
        <Route path="/login" element=<LoginPage /> />
        <Route path="/latestbets" element=<LatestBetPage /> />
        <Route path="/agents" element=<AgentPage /> />
        <Route path="/winningnumbers" element=<WinningNumbberPage /> />
        <Route path="/winnerlists" element=<WinnerListPage /> />
        <Route path="/bannumbers" element=<BanNumberPage /> />
        <Route path="/limitnumbers" element=<LimitNumberPage /> />
        <Route path="/manageodds" element=<ManageOddPage /> />
        <Route path="/reports" element=<ReportPage /> />
        <Route path="/" exact element=<HomePage /> />
      </Routes>
    </Layout>
  );
};

export default App;
