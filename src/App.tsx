import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import { Admin, NotFound, Home, MassRegistration, Perfil } from "./pages/RoutesIndex";
import React from "react";
import MainLayout from "./layout/MainLayout";

const queryClient = new QueryClient();

// Componente wrapper para las rutas protegidas
const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<Index />} />

            {/* Rutas protegidas con layout */}
            <Route element={<ProtectedLayout />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mass-registration" element={<MassRegistration />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;