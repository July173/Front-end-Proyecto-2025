import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Index from "./pages/Index";
import Login from "./pages/login";
import Register from "./pages/Register";
import RestorePassword from "./pages/RestorePassword";
import ValidationCodeSecurity from "./pages/ValidationCodeSecurity";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        
            <BrowserRouter>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/restore-password" element={<RestorePassword />} />
                  <Route path="/validation-code" element={<ValidationCodeSecurity />} />
                  <Route path="/update-password" element={<UpdatePassword />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
  </QueryClientProvider>
);

export default App;
