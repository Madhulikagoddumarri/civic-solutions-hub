export type ComplaintStatus = "reported" | "in-progress" | "resolved";
export type Priority = "low" | "medium" | "high" | "emergency";
export type IssueType = "pothole" | "garbage" | "water-leak" | "streetlight" | "road-damage" | "noise" | "other";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  issueType: IssueType;
  status: ComplaintStatus;
  priority: Priority;
  location: { lat: number; lng: number; address: string };
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  resolvedImageUrl?: string;
  department?: string;
  rating?: number;
  userHasUpvoted?: boolean;
}

export const issueTypeLabels: Record<IssueType, string> = {
  pothole: "Pothole",
  garbage: "Garbage Dump",
  "water-leak": "Water Leak",
  streetlight: "Broken Streetlight",
  "road-damage": "Road Damage",
  noise: "Noise Complaint",
  other: "Other",
};

export const issueTypeIcons: Record<IssueType, string> = {
  pothole: "🕳️",
  garbage: "🗑️",
  "water-leak": "💧",
  streetlight: "💡",
  "road-damage": "🚧",
  noise: "🔊",
  other: "📋",
};

export const mockComplaints: Complaint[] = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    description: "A dangerous pothole approximately 2 feet wide has formed near the intersection of Main St and Oak Ave. Multiple vehicles have been damaged.",
    issueType: "pothole",
    status: "in-progress",
    priority: "high",
    location: { lat: 40.7128, lng: -74.006, address: "Main St & Oak Ave" },
    upvotes: 47,
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-18T14:00:00Z",
    department: "Roads & Infrastructure",
  },
  {
    id: "2",
    title: "Illegal garbage dump in park",
    description: "Large amounts of construction debris have been illegally dumped near the south entrance of Central Park.",
    issueType: "garbage",
    status: "reported",
    priority: "medium",
    location: { lat: 40.7148, lng: -74.003, address: "Central Park South Entrance" },
    upvotes: 32,
    createdAt: "2024-03-17T08:15:00Z",
    updatedAt: "2024-03-17T08:15:00Z",
    department: "Sanitation",
  },
  {
    id: "3",
    title: "Water main leak flooding street",
    description: "Water is gushing from a broken water main, flooding the entire block. Emergency repair needed.",
    issueType: "water-leak",
    status: "reported",
    priority: "emergency",
    location: { lat: 40.711, lng: -74.009, address: "456 Elm Street" },
    upvotes: 89,
    createdAt: "2024-03-19T06:45:00Z",
    updatedAt: "2024-03-19T06:45:00Z",
    department: "Water Services",
  },
  {
    id: "4",
    title: "Broken streetlight on residential road",
    description: "The streetlight at the corner of Pine and 3rd has been out for 2 weeks, making the area unsafe at night.",
    issueType: "streetlight",
    status: "resolved",
    priority: "medium",
    location: { lat: 40.716, lng: -74.001, address: "Pine St & 3rd Ave" },
    upvotes: 18,
    createdAt: "2024-03-10T19:00:00Z",
    updatedAt: "2024-03-20T11:30:00Z",
    department: "Electrical",
    rating: 4,
  },
  {
    id: "5",
    title: "Road surface cracking on highway ramp",
    description: "Significant cracking and deterioration on the northbound highway on-ramp. Poses safety risk to motorcycles.",
    issueType: "road-damage",
    status: "in-progress",
    priority: "high",
    location: { lat: 40.718, lng: -74.008, address: "Highway 101 North Ramp" },
    upvotes: 56,
    createdAt: "2024-03-12T15:20:00Z",
    updatedAt: "2024-03-19T09:00:00Z",
    department: "Roads & Infrastructure",
  },
  {
    id: "6",
    title: "Excessive construction noise at night",
    description: "Construction work continuing past 10 PM in residential zone, violating noise ordinance.",
    issueType: "noise",
    status: "resolved",
    priority: "low",
    location: { lat: 40.713, lng: -74.004, address: "200 Broadway" },
    upvotes: 12,
    createdAt: "2024-03-14T22:30:00Z",
    updatedAt: "2024-03-16T10:00:00Z",
    rating: 5,
  },
];

export const notifications = [
  { id: "1", message: "Your complaint #3 has been assigned to Water Services", time: "2 min ago", read: false },
  { id: "2", message: "Complaint #1 status updated to In Progress", time: "1 hour ago", read: false },
  { id: "3", message: "Your complaint #4 has been resolved!", time: "3 hours ago", read: true },
  { id: "4", message: "15 people upvoted your complaint #5", time: "1 day ago", read: true },
];

export const workflowSteps = [
  { label: "Submit", icon: "📝", description: "Citizen reports issue" },
  { label: "Review", icon: "👁️", description: "System validates & categorizes" },
  { label: "Assign", icon: "🏢", description: "Routed to department" },
  { label: "Process", icon: "⚙️", description: "Team works on fix" },
  { label: "Resolve", icon: "✅", description: "Issue fixed & verified" },
  { label: "Notify", icon: "🔔", description: "Citizen gets update" },
];
