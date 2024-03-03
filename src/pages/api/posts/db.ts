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
        if (order === "asc") {
          if (sort === "user") {
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return 1;
          }
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        } else {
          if (sort === "user") {
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return 1;
          }
          if (a[sort] > b[sort]) return -1;
          if (a[sort] < b[sort]) return 1;
        }
        return 0;
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
