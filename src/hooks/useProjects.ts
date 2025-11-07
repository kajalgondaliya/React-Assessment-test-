import { useState, useEffect } from 'react';

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  dueDate?: string;
  technologies: string[];
  members: ProjectMember[];
  budget?: {
    allocated: number;
    spent: number;
    currency: string;
  };
  progress: number;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Build a modern e-commerce platform with React and TypeScript. Includes user authentication, product catalog, shopping cart, and checkout flow. The platform will support multiple payment gateways, inventory management, and order tracking.',
    status: 'active',
    createdAt: '2024-01-15',
    dueDate: '2024-06-30',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API'],
    members: [
      { id: '1', name: 'Sarah Johnson', role: 'Project Manager' },
      { id: '2', name: 'Mike Chen', role: 'Frontend Developer' },
      { id: '3', name: 'Emily Davis', role: 'Backend Developer' },
      { id: '4', name: 'David Wilson', role: 'UI/UX Designer' },
      { id: '5', name: 'Lisa Anderson', role: 'QA Engineer' },
    ],
    budget: {
      allocated: 150000,
      spent: 87500,
      currency: 'USD',
    },
    progress: 65,
    priority: 'high',
    tags: ['e-commerce', 'payment', 'inventory', 'marketplace'],
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'A collaborative task management application with real-time updates. Features include project boards, team collaboration, and deadline tracking. Supports file attachments, comments, and notifications.',
    status: 'active',
    createdAt: '2024-02-01',
    dueDate: '2024-05-15',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express', 'JWT'],
    members: [
      { id: '6', name: 'John Smith', role: 'Product Owner' },
      { id: '7', name: 'Maria Garcia', role: 'Full Stack Developer' },
      { id: '8', name: 'Robert Brown', role: 'DevOps Engineer' },
      { id: '9', name: 'Jennifer Lee', role: 'Frontend Developer' },
    ],
    budget: {
      allocated: 95000,
      spent: 52000,
      currency: 'USD',
    },
    progress: 55,
    priority: 'medium',
    tags: ['collaboration', 'productivity', 'real-time', 'kanban'],
  },
  {
    id: '3',
    name: 'Weather Dashboard',
    description: 'A weather dashboard displaying current conditions and forecasts for multiple locations. Integrates with weather API services. Features include interactive maps, weather alerts, and historical data visualization.',
    status: 'completed',
    createdAt: '2023-12-10',
    dueDate: '2024-01-31',
    technologies: ['Vue.js', 'D3.js', 'OpenWeather API', 'Chart.js'],
    members: [
      { id: '10', name: 'Alex Taylor', role: 'Frontend Developer' },
      { id: '11', name: 'Sophie Martin', role: 'Data Visualization Specialist' },
      { id: '12', name: 'James White', role: 'Backend Developer' },
    ],
    budget: {
      allocated: 45000,
      spent: 42000,
      currency: 'USD',
    },
    progress: 100,
    priority: 'low',
    tags: ['weather', 'dashboard', 'data-visualization', 'api-integration'],
  },
  {
    id: '4',
    name: 'Social Media Analytics',
    description: 'Analytics dashboard for social media metrics. Tracks engagement, reach, and performance across multiple platforms. Includes automated reports, competitor analysis, and trend predictions.',
    status: 'pending',
    createdAt: '2024-03-05',
    dueDate: '2024-08-20',
    technologies: ['Next.js', 'Python', 'TensorFlow', 'Twitter API', 'Instagram API'],
    members: [
      { id: '13', name: 'Amanda Harris', role: 'Data Scientist' },
      { id: '14', name: 'Kevin Martinez', role: 'ML Engineer' },
      { id: '15', name: 'Rachel Kim', role: 'Backend Developer' },
      { id: '16', name: 'Tom Jackson', role: 'Frontend Developer' },
    ],
    budget: {
      allocated: 180000,
      spent: 0,
      currency: 'USD',
    },
    progress: 0,
    priority: 'medium',
    tags: ['analytics', 'social-media', 'machine-learning', 'big-data'],
  },
  {
    id: '5',
    name: 'Recipe Finder',
    description: 'Recipe discovery app with advanced filtering. Users can search by ingredients, cuisine type, dietary restrictions, and cooking time. Includes meal planning, shopping lists, and nutritional information.',
    status: 'active',
    createdAt: '2024-01-20',
    dueDate: '2024-04-30',
    technologies: ['React Native', 'Firebase', 'Spoonacular API', 'Redux'],
    members: [
      { id: '17', name: 'Nicole Green', role: 'Mobile Developer' },
      { id: '18', name: 'Daniel Park', role: 'Backend Developer' },
      { id: '19', name: 'Olivia Rodriguez', role: 'UI/UX Designer' },
    ],
    budget: {
      allocated: 75000,
      spent: 38000,
      currency: 'USD',
    },
    progress: 48,
    priority: 'low',
    tags: ['mobile', 'recipes', 'food', 'nutrition'],
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setProjects(mockProjects);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    loading,
    error,
    getProjectById,
  };
};

