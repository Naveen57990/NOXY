import { useState } from "react";
import { NoxyHeader } from "../components/NoxyHeader";
import { DashboardCard } from "../components/DashboardCard";
import { RitualsList } from "../components/rituals/RitualsList";
import { JournalSection } from "../components/journal/JournalSection";
import { ChatSection } from "../components/chat/ChatSection";

type Section = "dashboard" | "rituals" | "journal" | "chat";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard");

  const renderSection = () => {
    switch (currentSection) {
      case "rituals":
        return <RitualsList onBack={() => setCurrentSection("dashboard")} />;
      case "journal":
        return <JournalSection onBack={() => setCurrentSection("dashboard")} />;
      case "chat":
        return <ChatSection onBack={() => setCurrentSection("dashboard")} />;
      default:
        return (
          <div className="max-w-md mx-auto">
            <NoxyHeader userName="friend" />
            
            <div className="space-y-4">
              <DashboardCard
                title="Rituals"
                emoji="✨"
                gradient="bg-gradient-rituals"
                onClick={() => setCurrentSection("rituals")}
              >
                Daily practices for peace and mindfulness
              </DashboardCard>

              <DashboardCard
                title="Journal"
                emoji="📔"
                gradient="bg-gradient-journal"
                onClick={() => setCurrentSection("journal")}
              >
                Write your thoughts and feelings
              </DashboardCard>

              <DashboardCard
                title="Chat with Noxy"
                emoji="💬"
                gradient="bg-gradient-chat"
                onClick={() => setCurrentSection("chat")}
              >
                Talk with your caring AI friend
              </DashboardCard>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      {renderSection()}
    </div>
  );
};

export default Index;
