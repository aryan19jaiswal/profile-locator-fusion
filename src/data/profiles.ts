
import { Profile } from "../types";

export const profiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    description: "Software developer with expertise in React and TypeScript. Passionate about creating intuitive user interfaces.",
    address: "123 Tech Avenue, San Francisco, CA",
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    phone: "415-555-1234",
    email: "sarah.j@example.com",
    profession: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "CSS", "UI/UX"],
    interests: ["Hiking", "Photography", "Machine Learning"]
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    description: "Data scientist specializing in machine learning models for predictive analytics.",
    address: "456 Data Drive, Boston, MA",
    location: {
      lat: 42.3601,
      lng: -71.0589
    },
    phone: "617-555-9876",
    email: "mchen@example.com",
    profession: "Data Scientist",
    skills: ["Python", "TensorFlow", "Statistical Analysis", "Data Visualization"],
    interests: ["Chess", "Rock Climbing", "Cooking"]
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "/placeholder.svg",
    description: "Product manager with a background in UX research. Focused on creating user-centered product experiences.",
    address: "789 Product Lane, Austin, TX",
    location: {
      lat: 30.2672,
      lng: -97.7431
    },
    phone: "512-555-3456",
    email: "elena.r@example.com",
    profession: "Senior Product Manager",
    skills: ["Product Strategy", "User Research", "Agile Methodologies", "Wireframing"],
    interests: ["Tennis", "Travel", "Sustainable Design"]
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "/placeholder.svg",
    description: "DevOps engineer focused on building robust CI/CD pipelines and cloud infrastructure.",
    address: "321 Cloud Street, Seattle, WA",
    location: {
      lat: 47.6062,
      lng: -122.3321
    },
    phone: "206-555-7890",
    email: "jwilson@example.com",
    profession: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    interests: ["Mountain Biking", "Gaming", "Home Automation"]
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "/placeholder.svg",
    description: "UX designer dedicated to creating accessible and beautiful digital experiences.",
    address: "555 Design Blvd, Portland, OR",
    location: {
      lat: 45.5051,
      lng: -122.6750
    },
    phone: "503-555-2345",
    email: "priya.p@example.com",
    profession: "Senior UX Designer",
    skills: ["Figma", "User Testing", "Accessibility", "Interaction Design"],
    interests: ["Painting", "Yoga", "Science Fiction"]
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "/placeholder.svg",
    description: "Cybersecurity specialist with expertise in network security and ethical hacking.",
    address: "678 Security Road, Chicago, IL",
    location: {
      lat: 41.8781,
      lng: -87.6298
    },
    phone: "312-555-6789",
    email: "dkim@example.com",
    profession: "Security Engineer",
    skills: ["Penetration Testing", "Network Security", "Cryptography", "Security Auditing"],
    interests: ["Martial Arts", "Puzzle Solving", "Documentaries"]
  }
];
