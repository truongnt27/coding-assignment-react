import { baseFetch } from './base-fetch';

export const TicketsApi = {
  fetchTickets: async function () {
    return await baseFetch('/api/tickets');
  },
  fetchTicketById: async function (id: number) {
    return await baseFetch('/api/tickets/' + id);
  },
  createTicket: async function (description: string) {
    return await baseFetch('/api/tickets', {
      method: 'POST',
      body: JSON.stringify({ description }),
    });
  },
  markTicketComplete: async function (id: number) {
    return await baseFetch(`/api/tickets/${id}/complete`, {
      method: 'PUT',
    });
  },
  markTicketIncomplete: async function (id: number) {
    return await baseFetch(`/api/tickets/${id}/complete`, {
      method: 'DELETE',
    });
  },
  assignTicket: async function ({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }) {
    return await baseFetch(`/api/tickets/${id}/assign/${userId}`, {
      method: 'PUT',
    });
  },
  unassignTicket: async function (id: number) {
    return await baseFetch(`/api/tickets/${id}/unassign`, {
      method: 'PUT',
    });
  },
};
