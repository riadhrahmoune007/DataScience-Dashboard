import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  Database,
  BrainCircuit,
  Settings,
  Upload,
  Users,
  FileText,
  HelpCircle,
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function DashboardSidebar({ className, isCollapsed = false }) {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-white",
        isCollapsed ? "w-14" : "w-60",
        className
      )}
    >
      <div className="flex h-14 items-center justify-center border-b">
        <User className="h-6 w-6 text-dashboard-blue" />
        {!isCollapsed && <span className="font-bold ml-2 text-dashboard-blue">DataViz Hub</span>}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Button
            variant={isActive('/') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/data-explorer') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/data-explorer') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/data-explorer">
              <Database className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Data Explorer</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/visualizations') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/visualizations') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/visualizations">
              <BarChart2 className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Visualizations</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/ml-models') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/ml-models') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/ml-models">
              <BrainCircuit className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>ML Models</span>}
            </Link>
          </Button>

          <Separator className="my-2" />
          
          <Button
            variant={isActive('/upload-data') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/upload-data') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/upload-data">
              <Upload className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Upload Data</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/reports') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/reports') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/reports">
              <FileText className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Reports</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/team') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/team') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/team">
              <Users className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Team</span>}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="mt-auto p-2">
        <Separator className="my-2" />
        <nav className="grid gap-1">
          <Button
            variant={isActive('/settings') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/settings') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </Button>
          
          <Button
            variant={isActive('/help') ? "default" : "ghost"}
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0",
              isActive('/help') && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            asChild
          >
            <Link to="/help">
              <HelpCircle className="h-4 w-4 mr-2" />
              {!isCollapsed && <span>Help</span>}
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}

export default DashboardSidebar;