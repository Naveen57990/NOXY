import { useState, useEffect } from "react";
import { Check, Clock } from "lucide-react";
import { BackButton } from "../BackButton";

interface Ritual {
  id: string;
  title: string;
  description: string;
  steps: string[];
  estimatedTime: string;
}

const rituals: Ritual[] = [
  {
    id: "morning-gratitude",
    title: "Morning Gratitude",
    description: "Start your day with appreciation",
    estimatedTime: "5 min",
    steps: [
      "Find a comfortable, quiet space",
      "Take three deep breaths",
      "Think of three things you're grateful for today",
      "Write them down or say them out loud",
      "Feel the warmth of gratitude in your heart"
    ]
  },
  {
    id: "breathing-exercise",
    title: "Breathing Exercise",
    description: "Calm your mind with focused breathing",
    estimatedTime: "10 min",
    steps: [
      "Sit comfortably with your back straight",
      "Close your eyes gently",
      "Breathe in for 4 counts",
      "Hold for 4 counts",
      "Breathe out for 6 counts",
      "Repeat for 10 cycles"
    ]
  },
  {
    id: "affirmations",
    title: "Daily Affirmations",
    description: "Boost your confidence with positive words",
    estimatedTime: "5 min",
    steps: [
      "Look at yourself in the mirror",
      "Say: 'I am worthy of love and respect'",
      "Say: 'I have the strength to overcome challenges'",
      "Say: 'I choose peace and happiness today'",
      "Smile at yourself and feel the positivity"
    ]
  },
  {
    id: "end-of-day",
    title: "End-of-Day Reflection",
    description: "Reflect on your day with kindness",
    estimatedTime: "10 min",
    steps: [
      "Think about three good moments from today",
      "Acknowledge any challenges you faced",
      "Forgive yourself for any mistakes",
      "Set a gentle intention for tomorrow",
      "Thank yourself for making it through the day"
    ]
  }
];

interface RitualsListProps {
  onBack: () => void;
}

export const RitualsList = ({ onBack }: RitualsListProps) => {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("noxy-completed-rituals");
    if (stored) {
      setCompletedRituals(new Set(JSON.parse(stored)));
    }
  }, []);

  const markAsCompleted = (ritualId: string) => {
    const updated = new Set([...completedRituals, ritualId]);
    setCompletedRituals(updated);
    localStorage.setItem("noxy-completed-rituals", JSON.stringify([...updated]));
    setSelectedRitual(null);
  };

  if (selectedRitual) {
    return (
      <div className="max-w-md mx-auto">
        <BackButton onClick={() => setSelectedRitual(null)} />
        
        <div className="noxy-card shimmer">
          <div className="text-center mb-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-primary mb-2">{selectedRitual.title}</h2>
            <p className="text-muted-foreground">{selectedRitual.description}</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>{selectedRitual.estimatedTime}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {selectedRitual.steps.map((step, index) => (
              <div key={index} className="flex gap-3 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5 pulse-glow">
                  {index + 1}
                </div>
                <p className="text-foreground">{step}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => markAsCompleted(selectedRitual.id)}
            className="noxy-button w-full text-primary-foreground flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Done ✅
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <BackButton onClick={onBack} />
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">✨ Daily Rituals</h2>
        
        {rituals.map((ritual) => {
          const isCompleted = completedRituals.has(ritual.id);
          
          return (
            <button
              key={ritual.id}
              onClick={() => setSelectedRitual(ritual)}
              className="noxy-card w-full text-left hover:scale-105 transition-all duration-500 relative group shimmer"
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 animate-bounceGentle">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center pulse-glow">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">{ritual.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{ritual.description}</p>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{ritual.estimatedTime}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};