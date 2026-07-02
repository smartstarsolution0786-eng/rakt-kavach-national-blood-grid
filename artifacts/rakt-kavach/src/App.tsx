import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "@/lib/language-context";
import GatewayPage from "@/pages/GatewayPage";
import DonorDashboard from "@/pages/DonorDashboard";
import HospitalDashboard from "@/pages/HospitalDashboard";
import LabDashboard from "@/pages/LabDashboard";
import AuthorityDashboard from "@/pages/AuthorityDashboard";
import FounderDashboard from "@/pages/FounderDashboard";
import SOSPage from "@/pages/SOSPage";
import AdvancedModulesPage from "@/pages/AdvancedModulesPage";
import AllModulesPage from "@/pages/AllModulesPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={GatewayPage} />
      <Route path="/donor" component={DonorDashboard} />
      <Route path="/hospital" component={HospitalDashboard} />
      <Route path="/lab" component={LabDashboard} />
      <Route path="/authority" component={AuthorityDashboard} />
      <Route path="/founder" component={FounderDashboard} />
      <Route path="/sos" component={SOSPage} />
      <Route path="/modules" component={AdvancedModulesPage} />
      <Route path="/all-modules" component={AllModulesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
