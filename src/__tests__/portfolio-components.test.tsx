import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

const scrollToSection = vi.fn();

// Navigation behavior is tested without invoking browser scrolling in jsdom.
vi.mock('../utils/scrollToSection', () => ({
  scrollToSection: (id: string) => scrollToSection(id),
}));

describe('portfolio component contracts', () => {
  beforeEach(() => {
    scrollToSection.mockClear();
    localStorage.clear();
  });

  it('renders primary sections with stable selectors', () => {
    render(
      <>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
        <Footer />
      </>,
    );

    // These selectors are part of the QA engine contract and should not drift silently.
    for (const testId of [
      'section-hero',
      'section-about',
      'section-projects',
      'section-skills',
      'section-achievements',
      'section-contact',
      'site-footer',
    ]) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  });

  it('exposes stable navigation controls and scrolls to target sections', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByTestId('nav-link-projects'));
    expect(scrollToSection).toHaveBeenCalledWith('projects');

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-link-contact')).toBeInTheDocument();
  });

  it('scrolls from hero calls to work and contact sections', async () => {
    const user = userEvent.setup();
    render(<Hero />);

    await user.click(screen.getByTestId('hero-view-work-button'));
    await user.click(screen.getByTestId('hero-contact-button'));

    expect(scrollToSection).toHaveBeenCalledWith('projects');
    expect(scrollToSection).toHaveBeenCalledWith('contact');
  });

  it('opens and closes the project preview dialog accessibly', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByTestId('project-card-1'));
    const dialog = screen.getByTestId('project-preview-dialog');

    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(within(dialog).getByTestId('project-preview-github-link')).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );

    await user.click(screen.getByTestId('project-preview-close-button'));
    // AnimatePresence removes the dialog after the exit animation completes.
    await waitFor(() => {
      expect(screen.queryByTestId('project-preview-dialog')).not.toBeInTheDocument();
    });
  });

  it('keeps contact form fields accessible and bounded', () => {
    render(<Contact />);

    expect(screen.getByLabelText('Name')).toHaveAttribute('maxlength', '80');
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Subject')).toHaveAttribute('maxlength', '120');
    expect(screen.getByLabelText('Message')).toHaveAttribute('maxlength', '1000');
    expect(screen.getByTestId('contact-submit-button')).toHaveAccessibleName(/send message/i);
  });
});
