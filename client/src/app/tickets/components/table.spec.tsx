import { Ticket } from '@acme/shared-models';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import BasicTable from './table';
const mockTickets: Ticket[] = [
  {
    id: 1,
    description: 'Fix login issue',
    completed: false,
    assigneeId: 1,
    assignee: { id: 1, name: 'John Doe' },
  },
  {
    id: 2,
    description: 'Update UI design',
    completed: true,
    assigneeId: null,
  },
];
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTickets),
  })
) as jest.Mock;

describe('BasicTable Component', () => {
  test('renders table with headers', () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <BasicTable tickets={mockTickets} />
      </QueryClientProvider>
    );

    const headers = ['id', 'description', 'status', 'assignee', 'actions'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders ticket rows correctly', () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <BasicTable tickets={mockTickets} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Fix login issue')).toBeInTheDocument();
    expect(screen.getByText('Update UI design')).toBeInTheDocument();

    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  test("displays 'Loading' when loading is true", () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <BasicTable tickets={[]} loading />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
