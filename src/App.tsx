import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import { HomePage } from "./pages";
import { CharacterProvider } from "./context/CharacterContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CharacterProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route path="" element={<HomePage />} />
            </Route>
          </Routes>
        </CharacterProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
