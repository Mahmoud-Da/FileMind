// Implementation detail (private)
// In-memory storage for conversations
const conversations = new Map<string, string>();

// before refactoring
// export function getLastResponseId(conversationId: string): string | undefined {
//   return conversations.get(conversationId);
// }

// export function setLastResponseId(
//   conversationId: string,
//   responseId: string
// ): void {
//   conversations.set(conversationId, responseId);
// }

// after refactor encapsulate in object
export const conversationRepository = {
  getLastResponseId(conversationId: string): string | undefined {
    return conversations.get(conversationId);
  },

  setLastResponseId(conversationId: string, responseId: string): void {
    conversations.set(conversationId, responseId);
  },
};
