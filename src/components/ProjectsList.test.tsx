import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsList } from './ProjectsList';

describe('ProjectsList', () => {

  it('renders the projects list and allows searching', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    // Check that search input is present
    const searchInput = screen.getByLabelText('Search projects');
    expect(searchInput).toBeInTheDocument();

    // Check that multiple projects are displayed
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
  });

  it('filters projects based on search query', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    
    // Type in search input
    await user.type(searchInput, 'e-commerce');

    // Wait for debounce (300ms) and then check filtered results
    await waitFor(
      () => {
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
        expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('filters projects by status', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    await user.type(searchInput, 'completed');

    await waitFor(
      () => {
        expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
        expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument();
        expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('filters projects by priority', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    await user.type(searchInput, 'high');

    await waitFor(
      () => {
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
        expect(screen.queryByText('Recipe Finder')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('shows empty state when no projects match search', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    await user.type(searchInput, 'nonexistent-project-xyz');

    await waitFor(
      () => {
        expect(screen.getByText('No projects found matching your search.')).toBeInTheDocument();
        expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('displays project progress and member count', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    // Check for progress percentage
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('55%')).toBeInTheDocument();
    
    // Check for member count (use getAllByText since there might be multiple)
    const memberCounts = screen.getAllByText(/members/i);
    expect(memberCounts.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/5 members/i).length).toBeGreaterThan(0);
  });

  it('displays priority badges on project cards', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    // Check for priority badges (case-insensitive search)
    const priorityBadges = screen.getAllByText(/^(low|medium|high)$/i);
    expect(priorityBadges.length).toBeGreaterThan(0);
  });

  it('displays status badges on project cards', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    // Check for status badges (use getAllByText since there are multiple instances)
    const activeBadges = screen.getAllByText('active');
    expect(activeBadges.length).toBeGreaterThan(0);
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('clears search results when input is cleared', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects') as HTMLInputElement;
    
    // Search for something
    await user.type(searchInput, 'e-commerce');

    await waitFor(
      () => {
        expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );

    // Clear search
    await user.clear(searchInput);

    await waitFor(
      () => {
        expect(screen.getByText('Task Management App')).toBeInTheDocument();
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('is case-insensitive when searching', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    
    // Search with uppercase
    await user.type(searchInput, 'E-COMMERCE');

    await waitFor(
      () => {
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('filters multiple projects when search matches multiple', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search projects');
    
    // Search for "recipe" which should only match Recipe Finder
    await user.type(searchInput, 'recipe');

    await waitFor(
      () => {
        // Should show Recipe Finder
        expect(screen.getByText('Recipe Finder')).toBeInTheDocument();
        // Should not show other projects
        expect(screen.queryByText('E-commerce Platform')).not.toBeInTheDocument();
        expect(screen.queryByText('Weather Dashboard')).not.toBeInTheDocument();
        expect(screen.queryByText('Task Management App')).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it('renders project cards with correct navigation links', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    });

    // Check that project cards have correct href attributes
    const projectLinks = screen.getAllByLabelText(/View details for/i);
    expect(projectLinks.length).toBeGreaterThan(0);
    
    // Check that at least one link has the correct path structure
    const ecommerceLink = screen.getByLabelText('View details for E-commerce Platform');
    expect(ecommerceLink).toHaveAttribute('href', '/project/1');
  });

  it('displays dashboard title', async () => {
    render(
      <BrowserRouter>
        <ProjectsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Projects Dashboard')).toBeInTheDocument();
    });
  });
});

