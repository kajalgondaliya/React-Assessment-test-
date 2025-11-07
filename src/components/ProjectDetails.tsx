import { useParams, Link, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import './ProjectDetails.css';

export const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="project-details-container" role="status" aria-live="polite">
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-details-container" role="alert">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="project-details-container">
        <p>Project not found</p>
        <Link to="/" className="back-link">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-details-container">
      <Link to="/" className="back-link" aria-label="Back to projects list">
        ← Back to Projects
      </Link>

      <article className="project-details" aria-labelledby="project-title">
        <header className="project-header">
          <div className="header-content">
            <h1 id="project-title">{project.name}</h1>
            <div className="header-badges">
              <span className={`status-badge status-${project.status}`} aria-label={`Status: ${project.status}`}>
                {project.status}
              </span>
              <span className={`priority-badge priority-${project.priority}`} aria-label={`Priority: ${project.priority}`}>
                {project.priority} priority
              </span>
            </div>
          </div>
        </header>

        <section className="project-info" aria-labelledby="project-info-heading">
          <h2 id="project-info-heading" className="sr-only">Project Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}
            </div>
            {project.dueDate && (
              <div className="info-item">
                <strong>Due Date:</strong> {new Date(project.dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="info-item">
              <strong>Progress:</strong>
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={project.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Project progress: ${project.progress}%`}
                  
                >
                  <div 
                    className="progress-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{project.progress}%</span>
              </div>
            </div>
            {project.budget && (
              <div className="info-item">
                <strong>Budget:</strong>
                <div className="budget-info">
                  <span>
                    {project.budget.currency} {project.budget.spent.toLocaleString()} / {project.budget.allocated.toLocaleString()}
                  </span>
                  <span className="budget-percentage">
                    ({Math.round((project.budget.spent / project.budget.allocated) * 100)}% spent)
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="project-description" aria-labelledby="description-heading">
          <h2 id="description-heading">Description</h2>
          <p>{project.description}</p>
        </section>

        <section className="project-technologies" aria-labelledby="technologies-heading">
          <h2 id="technologies-heading">Technologies</h2>
          <div className="tech-list">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="project-members" aria-labelledby="members-heading">
          <h2 id="members-heading">Team Members ({project.members.length})</h2>
          <div className="members-list" role="list" aria-label="Project team members">
            {project.members.map((member) => (
              <div key={member.id} className="member-item" role="listitem">
                <div className="member-avatar">
                  {member.name.charAt(0)}
                </div>
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-tags" aria-labelledby="tags-heading">
          <h2 id="tags-heading" className="sr-only">Project Tags</h2>
          <div className="tags-list">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

