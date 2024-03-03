import { RequiredKeysOf } from "type-fest";
import { readDB, writeDB } from "../db";
import { Order, Post } from "../types";

export const readPosts = async () => {
  try {
    const db = await readDB();
    return db.posts;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const readPostsWithUser = async (
  sort?: RequiredKeysOf<Post> & "user_name",
  order?: Order,
  search?: string
) => {
  try {
    const db = await readDB();
    let posts = db.posts.map((post) => ({
      ...post,
      user: db.users.find((user) => user.id === post.userId) ?? null,
    }));
    if (search && search.length > 0) {
      posts = posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.user?.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    if (sort && order) {
      posts = posts.sort((a, b) => {
        const ac = sort === "user" ? a.user?.name ?? "" : a[sort];
        const bc = sort === "user" ? b.user?.name ?? "" : b[sort];
        if (ac > bc) return order === "desc" ? -1 : 1;
        else if (ac < bc) return order === "desc" ? 1 : -1;
        else return 0;
      });
    }
    return posts;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writePosts = async (posts: Post[]) => {
  try {
    const db = await readDB();
    await writeDB({ ...db, posts });
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};
