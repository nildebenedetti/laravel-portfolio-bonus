import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Contacts from "./pages/Contacts.jsx";
import ScrollToTop from "./components/scrollToTop.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/contacts" element={<Contacts/>} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
