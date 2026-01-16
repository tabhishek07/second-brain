import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);

const TagSchema = new Schema({
  title: { type: String, required: true },
});

export const TagModel = model("Tag", TagSchema);

const contentTypes = ["image", "article", "video", "audio"];

const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", ContentSchema);

// link schema

const LinkSchema = new Schema({
  hash: { type: String, require: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true ,unique: true  },
});

export const LinkModel = model("Link", LinkSchema);
