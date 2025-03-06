import { Ticket } from '@acme/shared-models';
import { render, screen } from '@testing-library/react';
import Detail from './details';

describe('Detail Component', () => {
  test('renders ticket details correctly', () => {
    const mockTicket: Ticket = {
      id: 1,
      description: 'Fix login issue',
      assignee: { id: 1, name: 'John Doe' },
      assigneeId: 1,
      completed: true,
    };

    render(<Detail ticket={mockTicket} />);

    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(
      screen.getByText('Description: Fix login issue')
    ).toBeInTheDocument();
    expect(screen.getByText('Assignee: John Doe')).toBeInTheDocument();
  });

  test("displays '--' when assignee is missing", () => {
    const mockTicket: Ticket = {
      id: 2,
      description: 'Update UI design',
      completed: false,
      assigneeId: null, // No assignee
    };

    render(<Detail ticket={mockTicket} />);

    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(
      screen.getByText('Description: Update UI design')
    ).toBeInTheDocument();
    expect(screen.getByText('Assignee: --')).toBeInTheDocument();
  });
});
