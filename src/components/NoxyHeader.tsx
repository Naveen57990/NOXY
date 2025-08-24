import noxyAvatar from "@/assets/noxy-avatar.jpg";

interface NoxyHeaderProps {
  userName?: string;
}

export const NoxyHeader = ({ userName = "friend" }: NoxyHeaderProps) => {
  return (
    <header className="noxy-card mb-8 text-center shimmer animate-fadeIn">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="relative">
          <img 
            src={noxyAvatar} 
            alt="Noxy" 
            className="w-16 h-16 rounded-full object-cover shadow-glow floating"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full pulse-glow"></div>
        </div>
        <div className="animate-slideInLeft">
          <h1 className="text-2xl font-bold text-primary">Noxy</h1>
          <p className="text-sm text-muted-foreground">Your AI friend</p>
        </div>
      </div>
      <p className="text-lg text-foreground animate-slideInRight">
        Hey, {userName}! 🌸 How are you today?
      </p>
    </header>
  );
};