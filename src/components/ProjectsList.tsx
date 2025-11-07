import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import './ProjectsList.css';

export const ProjectsList = () => {
  const { projects, loading, error } = useProjects();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredProjects = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return projects;
    }
    const query = debouncedSearchQuery.toLowerCase();
    return projects.filter(
      project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query) ||
        project.priority.toLowerCase().includes(query)
    );
  }, [projects, debouncedSearchQuery]);

  if (loading) {
    return (
      <div className="projects-container" role="status" aria-live="polite">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container" role="alert">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <header>
        <h1>Projects Dashboard</h1>
        <div className="search-container">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="text"
            placeholder="Search by name, description, status, technologies, tags, or team members..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            aria-label="Search projects"
            aria-describedby="search-description"
          />
          <span id="search-description" className="sr-only">
            Filter projects by name, description, status, technologies, tags, or team members
          </span>
        </div>
      </header>

      {filteredProjects.length === 0 ? (
        <p className="no-results" role="status" aria-live="polite">
          No projects found matching your search.
        </p>
      ) : (
        <div className="projects-grid" role="region" aria-label="Projects list">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="project-card"
              aria-label={`View details for ${project.name}`}
            >
              <div className="project-card-header">
                <h2>{project.name}</h2>
                <span className={`priority-badge priority-${project.priority}`}>
                  {project.priority}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-progress">
                <div className="progress-info">
                  <span>Progress</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="project-meta">
                <div className="meta-left">
                  <span className={`status-badge status-${project.status}`}>
                    {project.status}
                  </span>
                  <span className="member-count">
                    👥 {project.members.length} {project.members.length === 1 ? 'member' : 'members'}
                  </span>
                </div>
                <span className="project-date">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

