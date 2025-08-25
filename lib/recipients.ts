export interface Recipient {
  address: string;
  name: string;
  description: string;
  category: "developer" | "artist" | "content-creator" | "charity" | "custom";
  avatar?: string;
}

export const RECIPIENTS: Recipient[] = [
  {
    address:
      process.env.NEXT_PUBLIC_RECIPIENT ||
      "0x4ef5FEECA9925e6bE7e309fFa7C87b0FAd67C593",
    name: "App Owner",
    description: "Support the Quick Tip app development",
    category: "developer",
    avatar: "👨‍💻"
  },
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "Avalanche Foundation",
    description: "Supporting the Avalanche ecosystem",
    category: "charity",
    avatar: "🏔️"
  },
  {
    address: "0x2345678901234567890123456789012345678901",
    name: "Crypto Artist",
    description: "Digital artist creating NFT collections",
    category: "artist",
    avatar: "🎨"
  },
  {
    address: "0x3456789012345678901234567890123456789012",
    name: "DeFi Educator",
    description: "Teaching DeFi concepts and strategies",
    category: "content-creator",
    avatar: "📚"
  },
  {
    address: "0x4567890123456789012345678901234567890123",
    name: "Open Source Dev",
    description: "Building free tools for the community",
    category: "developer",
    avatar: "🔧"
  }
];

export const getRecipientByAddress = (
  address: string
): Recipient | undefined => {
  return RECIPIENTS.find(
    (r) => r.address.toLowerCase() === address.toLowerCase()
  );
};

export const getRecipientsByCategory = (
  category: Recipient["category"]
): Recipient[] => {
  return RECIPIENTS.filter((r) => r.category === category);
};
