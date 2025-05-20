
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export const TabView: React.FC<TabViewProps> = ({ tabs, defaultTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultTab || (tabs.length > 0 ? tabs[0].id : "")
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without full navigation
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", value);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  // Initialize from URL param if present
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search, tabs]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="px-4 py-2">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
