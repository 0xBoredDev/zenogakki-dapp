import { createContext, useCallback, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { StatusProvider } from "./contexts/statusContext";
import Header from "./components/Header";
import Menu from "./components/Menu";
import LoadingPage from "./views/loading/LoadingPage";
import HomePage from "./views/home/HomePage";
import UtopiaPage from "./views/utopia/UtopiaPage";
import ProphecyPage from "./views/prophecy/ProphecyPage";
import StakingPage from "./views/staking/StakingPage";
import RafflePage from "./views/raffle/RafflePage";
import StoryPage from "./views/story/StoryPage";
import RaffleDashboardPage from "./views/raffle/RaffleDashboardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import themes from "./helpers/themes";
const themeContext = createContext("light");

function App() {
  const changeTheme = useCallback(
    (themeTo) => setTheme({ current: themeTo, changeTheme }),
    []
  );
  const [theme, setTheme] = useState({ current: themes.LIGHT, changeTheme });
  return (
    <themeContext.Provider value={theme}>
      <StatusProvider>
        <Routes>
          <Route exact path="/" element={<LoadingPage />} />
        </Routes>
        <Header />
        <Menu />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/utopia" element={<UtopiaPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/prophecy" element={<ProphecyPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/raffle" element={<RafflePage />} />
          <Route path="/raffle/dashboard" element={<RaffleDashboardPage />} />
          <Route
            element={<ToastContainer autoClose={3000} hideProgressBar />}
          />
        </Routes>
      </StatusProvider>
    </themeContext.Provider>
  );
}
export { themeContext };
export default App;

// import { ThemeContext } from "./contexts/theme-context";
// const [theme, setTheme] = useState("light");

// function App() {
//   return (
//     <themeContext.Provider value={{theme, setTheme}}>
//       <Routes>
//         <Route exact path="/" element={<LoadingPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/utopia" element={<UtopiaPage />} />
//         <Route path="/prophecy" element={<ProphecyPage />} />
//         <Route path="/raffle" element={<RafflePage />} />
//         <Route path="/raffle/dashboard" element={<RaffleDashboardPage />} />
//         <Route element={<ToastContainer autoClose={3000} hideProgressBar />} />
//       </Routes>
//     </themeContext.Provider>
//   );
// }
// export { themeContext };
// export default App;
