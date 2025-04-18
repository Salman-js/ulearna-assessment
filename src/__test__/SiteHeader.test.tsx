// __tests__/SiteHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SiteHeader } from '@/components/site-header';

describe('SiteHeader', () => {
  it('renders the GitHub link button correctly', () => {
    render(<SiteHeader />);

    // Find the GitHub link button
    const githubLink = screen.getByText('GitHub');

    // Check if the link button is rendered
    expect(githubLink).toBeDefined();
  });

  it('hides the GitHub link button on small screens', () => {
    render(<SiteHeader />);

    // Simulate a small screen
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('max-width: 640px'),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Find the GitHub link button
    const githubLink = screen.queryByText('GitHub');

    // Check if the link button is hidden
    expect(githubLink).not.toBeDefined();
  });
});
