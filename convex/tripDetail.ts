import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id("UserTable"),
    tripDetail: v.any()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('TripDetail', {
      tripId: args.tripId,
      uid: args.uid,
      tripDetail: args.tripDetail
    });
    return result; // Add return statement
  }
})

export const GetUserTrips = query({
  args: {
    uid: v.id('UserTable')
  },
  handler: async (ctx, args) => {
    // Validate that uid is provided
    if (!args.uid) {
      throw new Error('User ID is required');
    }
    
    const result = await ctx.db.query('TripDetail')
      .filter((q) => q.eq(q.field('uid'), args.uid))
      .order('desc')
      .collect()

    return result
  }
})

export const GetUserTripId = query({
  args: {
    uid: v.id('UserTable'),
    tripId: v.string()
  },
  handler: async (ctx, args) => {
    // Validate that both uid and tripId are provided
    if (!args.uid) {
      throw new Error('User ID is required');
    }
    
    if (!args.tripId) {
      throw new Error('Trip ID is required');
    }
    
    const result = await ctx.db.query('TripDetail')
      .filter((q) => q.and(
        q.eq(q.field('uid'), args.uid),
        q.eq(q.field('tripId'), args.tripId)
      ))
      .first() // Use .first() instead of .collect()[0] for better performance and null safety

    return result // Will return null if no trip found, which is expected behavior
  }
})