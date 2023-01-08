import { createContext, useCallback, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import { StatusProvider } from "./contexts/statusContext";
// import { StatusProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Menu from "./components/Menu";
import LoadingPage from "./views/loading/LoadingPage";
import HomePage from "./views/home/HomePage";
import UtopiaPage from "./views/utopia/UtopiaPage";
import StakingPage from "./views/staking/StakingPage";
import StakingDashboardPage from "./views/staking/StakingDashboardPage";
import RafflePage from "./views/raffle/RafflePage";
import StoryPage from "./views/story/StoryPage";
import RaffleDashboardPage from "./views/raffle/RaffleDashboardPage";
// import Spinner from "./components/Spinner";
import themes from "./helpers/themes";
const themeContext = createContext("light");

function App() {
  console.log("App load");
  const [theme, setTheme] = useState("light");
  const changeTheme = useCallback((themeTo) => {
    console.log("changetheme");
    console.log(themeTo);
    setTheme(themeTo);
    const element = document.getElementById("mode");
    element.className = themeTo;
  }, []);

  // const changeTheme = useCallback((themeTo) => {
  //   console.log("changetheme");
  //   setTheme({ current: themeTo, changeTheme });
  //   const element = document.getElementById("mode");
  //   element.className = themeTo;
  // }, []);
  // const [theme, setTheme] = useState({ current: themes.LIGHT, changeTheme });
  let location = useLocation();

  const contextValue = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme, changeTheme]
  );

  return (
    <themeContext.Provider value={contextValue}>
      {/* <StatusProvider> */}
      {location.pathname !== "/" ? <Menu /> : ""}
      {location.pathname !== "/" ? <Header /> : ""}
      <Routes>
        <Route exact path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/utopia" element={<UtopiaPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/staking/dashboard" element={<StakingDashboardPage />} />
        <Route path="/raffle" element={<RafflePage />} />
        <Route path="/raffle/dashboard" element={<RaffleDashboardPage />} />
      </Routes>
      {/* </StatusProvider> */}
    </themeContext.Provider>
  );
}
export { themeContext };
export default App;
