import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('should render header text', () => {
    render(<Header />);
    
    expect(screen.getByText('Markdown to HTML Converter')).toBeInTheDocument();
    expect(screen.getByText('Paste or copy your markdown and see it converted to HTML!')).toBeInTheDocument();
  });
});