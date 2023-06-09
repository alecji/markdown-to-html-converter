import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MarkdownToHtml from './MarkdownToHtml';

jest.mock('axios');

describe('MarkdownToHtml Component', () => {
  it('should render textarea for markdown input, text area for html conversion and convert button', () => {
    render(<MarkdownToHtml />);
    expect(screen.getByTestId('enterMarkdownTextBox')).toBeInTheDocument();
    expect(screen.getByTestId('html-conversion-box')).toBeInTheDocument();
    expect(screen.getByTestId('convert-btn')).toBeInTheDocument();
  });

  it('should convert to html when Convert button is clicked', async () => {
    axios.post.mockResolvedValue({
      data: {
        html: '<h1>Hello</h1>',
      },
    });

    render(<MarkdownToHtml />);

    fireEvent.change(screen.getByTestId('enterMarkdownTextBox'), { target: { value: '# Hello' } });
    fireEvent.click(screen.getByTestId('convert-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('html-conversion-box')).toHaveValue('<h1>Hello</h1>');
    });
  });
});