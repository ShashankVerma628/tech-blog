import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, ErrorPage, Dashboard, ContactUs, BlogPage } from "./pages";
import { Navigation, Footer, ProtectedRoute } from "./components";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navigation />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
