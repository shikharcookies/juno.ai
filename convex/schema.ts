import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
    orderId: v.optional(v.string()),
  }),

  userAiAssistants: defineTable({
    id: v.number(),
    name: v.string(),
    title: v.string(),
    image: v.string(),
    instruction: v.string(),
    userInstruction: v.string(),
    aiModelId: v.optional(v.string()),
    sampleQuestions: v.array(v.string()),
    uid: v.id("users"),
  }),

messages: defineTable({
  sender: v.union(v.literal('user'), v.literal('ai')),
  text: v.string(),
  userId: v.id('users'),
  assistantId: v.id('userAiAssistants'),
  createdAt: v.number(),
}).index('by_user_assistant', ['userId', 'assistantId']),


});
