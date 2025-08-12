import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useState } from "react"; 
import LoginForm from "./components/LoginForm";
import { EmailRegistroPendiente, EmailRecuperacionContrasena } from "./components/Emails";
import EmailsView from "./components/EmailsView";

const queryClient = new QueryClient();

const App = () => {
  const [view, setView] = useState("login");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* ...otras vistas */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
