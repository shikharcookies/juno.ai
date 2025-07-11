import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const storeMessage = mutation({
  args: {
    sender: v.union(v.literal('user'), v.literal('ai')),
    text: v.string(),
    userId: v.id('users'),
    assistantId: v.id('userAiAssistants'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('messages', {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getMessages = query({
  args: {
    userId: v.id('users'),
    assistantId: v.optional(v.id('userAiAssistants')), // optional to prevent runtime error
  },
  handler: async (ctx, { userId, assistantId }) => {
    if (!assistantId) return [];

    return await ctx.db
      .query('messages')
      .withIndex('by_user_assistant', (q) =>
        q.eq('userId', userId).eq('assistantId', assistantId)
      )
      .order('asc')
      .collect();
  },
});



export const clearMessages = mutation({
  args: {
    userId: v.id('users'),
    assistantId: v.id('userAiAssistants'),
  },
  handler: async (ctx, { userId, assistantId }) => {
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_user_assistant', (q) =>
        q.eq('userId', userId).eq('assistantId', assistantId)
      )
      .collect();

    for (const msg of messages) {
      await ctx.db.delete(msg._id);
    }
  },
});

