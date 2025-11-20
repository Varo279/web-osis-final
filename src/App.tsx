import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProgramDetail from "./pages/ProgramDetail";
import EventDetail from "./pages/EventDetail";
import AllPrograms from "./pages/AllPrograms";
import AllEvents from "./pages/AllEvents";
import AllMembers from "./pages/AllMembers";
import MemberDetail from "./pages/MemberDetail";
import Polling from "./pages/Polling";
import PollAdmin from "./pages/PollAdmin";
import LoadingSpinner from "./components/LoadingSpinner";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/programs" element={<PageTransition><AllPrograms /></PageTransition>} />
          <Route path="/program/:id" element={<PageTransition><ProgramDetail /></PageTransition>} />
          <Route path="/events" element={<PageTransition><AllEvents /></PageTransition>} />
          <Route path="/event/:id" element={<PageTransition><EventDetail /></PageTransition>} />
          <Route path="/members" element={<PageTransition><AllMembers /></PageTransition>} />
          <Route path="/member/:id" element={<PageTransition><MemberDetail /></PageTransition>} />
          <Route path="/polling" element={<PageTransition><Polling /></PageTransition>} />
          <Route path="/poll-admin" element={<PageTransition><PollAdmin /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
