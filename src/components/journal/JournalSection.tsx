import { useState, useEffect } from "react";
import { Save, BookOpen, Calendar } from "lucide-react";
import { BackButton } from "../BackButton";

interface JournalEntry {
  id: string;
  content: string;
  timestamp: string;
  date: string;
}

interface JournalSectionProps {
  onBack: () => void;
}

export const JournalSection = ({ onBack }: JournalSectionProps) => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showPastEntries, setShowPastEntries] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("noxy-journal-entries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry.trim(),
      timestamp: new Date().toLocaleString(),
      date: new Date().toLocaleDateString()
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("noxy-journal-entries", JSON.stringify(updatedEntries));
    setCurrentEntry("");
    
    // Show success feedback
    alert("Your thoughts have been saved! 💜");
  };

  if (showPastEntries) {
    return (
      <div className="max-w-md mx-auto">
        <BackButton onClick={() => setShowPastEntries(false)} label="Back to Journal" />
        
        <h2 className="text-2xl font-bold text-primary text-center mb-6">📖 Your Journal</h2>
        
        {entries.length === 0 ? (
          <div className="noxy-card text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No entries yet. Start writing to see them here!</p>
          </div>
        ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={entry.id} className="noxy-card shimmer animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4 animate-pulse" />
                <span>{entry.timestamp}</span>
              </div>
              <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>
            </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <BackButton onClick={onBack} />
      
      <h2 className="text-2xl font-bold text-primary text-center mb-6">📔 Journal</h2>
      
      <div className="space-y-6">
        <div className="noxy-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">What's on your mind?</h3>
          
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Share your thoughts, feelings, or what happened today..."
            className="w-full h-32 p-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          
          <button
            onClick={saveEntry}
            disabled={!currentEntry.trim()}
            className="noxy-button mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save Entry
          </button>
        </div>

        {entries.length > 0 && (
          <button
            onClick={() => setShowPastEntries(true)}
            className="noxy-card w-full text-left hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Past Entries</h3>
                <p className="text-muted-foreground text-sm">{entries.length} entries saved</p>
              </div>
              <BookOpen className="w-6 h-6 text-primary floating" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};