interface SocialProofProps {
  userCount?: string;
  avatars?: string[];
}

const defaultAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
];

const SocialProof = ({
  userCount = "10,000+",
  avatars = defaultAvatars,
}: SocialProofProps) => {
  return (
    <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-card"
          >
            <img
              src={avatar}
              alt={`User ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <p>Used by {userCount} music lovers</p>
    </div>
  );
};

export default SocialProof;
