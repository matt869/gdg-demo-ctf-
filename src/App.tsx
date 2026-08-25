import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Rooms from "@/pages/Rooms";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    // Hash routing keeps deep links working on static hosts (GitHub Pages)
    // without server-side rewrite rules.
    <WouterRouter hook={useHashLocation}>
      <TooltipProvider>
        <Toaster />
        <Routes />
      </TooltipProvider>
    </WouterRouter>
  );
}
