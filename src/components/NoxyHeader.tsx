import noxyAvatar from "@/assets/noxy-avatar.jpg";

interface NoxyHeaderProps {
  userName?: string;
}

export const NoxyHeader = ({ userName = "friend" }: NoxyHeaderProps) => {
  return (
    <header className="noxy-card mb-8 text-center">
      <div className="flex items-center justify-center gap-4 mb-4">
        <img 
          src={noxyAvatar} 
          alt="Noxy" 
          className="w-16 h-16 rounded-full object-cover shadow-glow"
        />
        <div>
          <h1 className="text-2xl font-bold text-primary">Noxy</h1>
          <p className="text-sm text-muted-foreground">Your AI friend</p>
        </div>
      </div>
      <p className="text-lg text-foreground">
        Hey, {userName}! 🌸 How are you today?
      </p>
    </header>
  );
};