import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args: {
    records: v.array(
      v.object({
        id: v.number(),
        name: v.string(),
        title: v.string(),
        image: v.string(),
        instruction: v.string(),
        userInstruction: v.string(),
        sampleQuestions: v.array(v.string())
      })
    ),
    uid: v.id("users")
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userAiAssistants")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .collect();

    const existingIds = new Set(existing.map(item => item.id));

    const recordsToInsert = args.records.filter(record => !existingIds.has(record.id));

    const insertedIds = await Promise.all(
      recordsToInsert.map(async (record) =>
        await ctx.db.insert("userAiAssistants", {
          ...record,
          aiModelId : 'venice/uncensored:free',
          uid: args.uid
        })
      )
    );

    return insertedIds;
  }
});


export const GetAllUserAssistants = query({
    args: { uid: v.id("users") },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("userAiAssistants").filter(q => q.eq(q.field("uid"), args.uid)).collect();
        return result;
    }
});

export const UpdateUserAiAssistant = mutation({
  args: {
    id: v.id('userAiAssistants'),
    userInstruction: v.string(),
    aiModelId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      aiModelId: args.aiModelId,
      userInstruction: args.userInstruction
    });
    return result;
  }
});


export const DeleteAssistant = mutation({
  args: {
    id: v.id('userAiAssistants')
  },
  handler: async (ctx, args) =>
    await ctx.db.delete(args.id)
});

