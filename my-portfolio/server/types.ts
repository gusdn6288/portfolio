// server/types.ts
export type FeedbackDoc = {
  _id?: import("mongodb").ObjectId;
  slug: string;
  name: string;
  message: string;
  email?: string;
  createdAt: Date;
};
