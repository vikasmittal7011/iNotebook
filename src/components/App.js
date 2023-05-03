import NavBar from "./NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import NoteState from "../contexts/notes/NoteState";
// import Alert from "./Alert";

function App() {
  return (
    <>
      <BrowserRouter>
          <NavBar />
          {/* <Alert /> */}
          <div className="container">
            <NoteState>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </NoteState>
          </div>
      </BrowserRouter>
    </>
  );
}

export default App;
