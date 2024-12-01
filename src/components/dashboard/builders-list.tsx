import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Builder {
  id: number;
  name: string;
  role: string;
  skills: string[];
  avatar: string;
}

const builders: Builder[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "Solidity"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Blockchain Engineer",
    skills: ["Ethereum", "Solidity", "Rust"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Frontend Developer",
    skills: ["React", "Vue.js", "TypeScript"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Diana Martinez",
    role: "Smart Contract Developer",
    skills: ["Solidity", "Vyper", "Hardhat"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Ethan Wilson",
    role: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "AWS"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Fiona Lee",
    role: "UI/UX Designer",
    skills: ["Figma", "Sketch", "Adobe XD"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function BuildersList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {builders.map((builder) => (
        <Card key={builder.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={builder.avatar} alt={builder.name} />
                <AvatarFallback>
                  {builder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{builder.name}</CardTitle>
                <CardDescription>{builder.role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {builder.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
