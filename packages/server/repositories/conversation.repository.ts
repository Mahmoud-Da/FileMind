interface SessionData {
  lastResponseId?: string;
  context?: string;
}

const sessions = new Map<string, SessionData>();

export const conversationRepository = {
  setContext(conversationId: string, context: string): void {
    const currentSession = sessions.get(conversationId) || {};
    sessions.set(conversationId, { ...currentSession, context });
  },

  getContext(conversationId: string): string | undefined {
    return sessions.get(conversationId)?.context;
  },

  setLastResponseId(conversationId: string, responseId: string): void {
    const currentSession = sessions.get(conversationId) || {};
    sessions.set(conversationId, {
      ...currentSession,
      lastResponseId: responseId,
    });
  },

  getLastResponseId(conversationId: string): string | undefined {
    return sessions.get(conversationId)?.lastResponseId;
  },
};
