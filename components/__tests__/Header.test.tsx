import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
  it('renders app name', () => {
    render(<Header />);
    expect(screen.getByText('ChatFile')).toBeDefined();
  });

  it('shows document info when provided', () => {
    render(<Header documentName="test.pdf" pageCount={10} fileSize={1024000} />);
    expect(screen.getByText(/test.pdf/)).toBeDefined();
    expect(screen.getByText(/10页/)).toBeDefined();
  });

  it('shows placeholder when no document', () => {
    render(<Header />);
    expect(screen.getByText('暂未加载文档')).toBeDefined();
  });
});
