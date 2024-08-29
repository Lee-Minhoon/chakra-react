import {
  ApiResponse,
  CursorQueryParams,
  CursorQueryResponse,
  Order,
  PageQueryParams,
  PageQueryResponse,
  User,
  UserCreate,
  UserUpdate,
} from "@/apis";
import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { fillZero, includesIgnoreCase, randomString, toPath } from "@/utils";
import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { RequiredKeysOf } from "type-fest";
import { readDB, writeDB } from "../db";
import { withAuth } from "../middleware";
import { getQueryParams, toEndpoint } from "../utils";

export const readUsers = (
  offset?: number,
  limit?: number,
  sort?: RequiredKeysOf<User>,
  order?: Order,
  search?: string
) => {
  let { users } = readDB();
  if (search) {
    users = users.filter(
      (user) =>
        includesIgnoreCase(user.name, search) ||
        includesIgnoreCase(user.email, search) ||
        includesIgnoreCase(user.phone, search)
    );
  }
  if (sort && order) {
    users = users.sort((a, b) => {
      const comp = a[sort] > b[sort] ? 1 : -1;
      return order === "asc" ? comp : -comp;
    });
  }
  if (offset !== undefined && limit) {
    users = users.slice(offset, offset + limit);
  }
  return users;
};

const getUsers = http.get<
  PathParams,
  DefaultBodyType,
  ApiResponse<PageQueryResponse<User>> | ApiResponse<CursorQueryResponse<User>>
>(toEndpoint(toPath(ApiRoutes.User)), ({ request }) => {
  const query = getQueryParams<
    PageQueryParams | (CursorQueryParams & { cursor: number })
  >(request);

  if ("page" in query) {
    const { page, limit, sort, order, search } = query;
    const offset = (Number(page) - 1) * Number(limit);
    const users = readUsers(
      offset,
      Number(limit),
      sort as RequiredKeysOf<User>,
      order as Order,
      search
    );

    return HttpResponse.json(
      {
        data: { total: readUsers().length, data: users },
        message: "Successfully fetched users",
      },
      { status: 200 }
    );
  } else {
    const { cursor, limit, sort, order, search } = query;
    const offset = Number(cursor);
    const users = readUsers(
      offset,
      Number(limit),
      sort as RequiredKeysOf<User>,
      order as Order,
      search
    );

    const previous = offset - Number(limit);
    const next = offset + Number(limit);

    return HttpResponse.json(
      {
        data: {
          previous: previous < 0 ? null : previous,
          next: next >= readUsers().length ? null : next,
          data: users,
        },
        message: "Successfully fetched users",
      },
      { status: 200 }
    );
  }
});

const getUser = http.get<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<User>>
>(toEndpoint(ApiRoutes.User), ({ params }) => {
  const users = readUsers();
  const user = users.find((user) => user.id === Number(params.id));

  if (!user) {
    return HttpResponse.json(
      { data: null, message: "User not found" },
      { status: 404 }
    );
  }

  return HttpResponse.json(
    { data: user, message: "Successfully fetched user" },
    { status: 200 }
  );
});

const createUser = http.post<
  PathParams,
  UserCreate,
  ApiResponse<Nullable<number>>
>(toEndpoint(toPath(ApiRoutes.User)), async ({ request }) => {
  const users = readUsers();

  if (users.length > 999) {
    return HttpResponse.json(
      { data: null, message: "Maximum users reached" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { name, email, phone, profile } = body;

  if (users.some((user) => user.email === email)) {
    return HttpResponse.json(
      { data: null, message: "Email already exists" },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: (users[users.length - 1]?.id ?? 0) + 1,
    name,
    email,
    phone,
    profile,
    approved: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);

  writeDB((db) => ({ ...db, users }));

  return HttpResponse.json(
    { data: newUser.id, message: "Successfully created user" },
    { status: 201 }
  );
});

const updateUser = http.put<
  PathParams,
  UserUpdate,
  ApiResponse<Nullable<number>>
>(toEndpoint(ApiRoutes.User), async ({ request, params }) => {
  const users = readUsers();
  const user = users.find((user) => user.id === Number(params.id));

  if (!user) {
    return HttpResponse.json(
      { data: null, message: "User not found" },
      { status: 404 }
    );
  }

  const body = await request.json();
  const { name, email, phone, profile } = body;

  if (
    users.some((user) => user.email === email && user.id !== Number(params.id))
  ) {
    return HttpResponse.json(
      { data: null, message: "Email already exists" },
      { status: 400 }
    );
  }

  user.name = name;
  user.email = email;
  user.phone = phone;
  user.profile = profile;
  user.updatedAt = new Date().toISOString();

  writeDB((db) => ({ ...db, users }));

  return HttpResponse.json(
    { data: user.id, message: "Successfully updated user" },
    { status: 200 }
  );
});

const deleteUser = http.delete<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<number>>
>(
  toEndpoint(ApiRoutes.User),
  withAuth(({ params }) => {
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === Number(params.id));

    if (userIndex === -1) {
      return HttpResponse.json(
        { data: null, message: "User not found" },
        { status: 404 }
      );
    }

    users.splice(userIndex, 1);

    writeDB((db) => ({ ...db, users }));

    return HttpResponse.json(
      { data: Number(params.id), message: "Successfully deleted user" },
      { status: 200 }
    );
  })
);

const approveUser = http.post<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<number>>
>(toEndpoint(ApiRoutes.ApproveUser), ({ params }) => {
  const users = readUsers();
  const user = users.find((user) => user.id === Number(params.id));

  if (!user) {
    return HttpResponse.json(
      { data: null, message: "User not found" },
      { status: 404 }
    );
  }

  user.approved = true;
  user.updatedAt = new Date().toISOString();

  writeDB((db) => ({ ...db, users }));

  return HttpResponse.json(
    { data: user.id, message: "Successfully approved user" },
    { status: 200 }
  );
});

const resetUsers = http.post<PathParams, DefaultBodyType, ApiResponse<null>>(
  toEndpoint(ApiRoutes.ResetUsers),
  () => {
    writeDB((db) => ({ ...db, users: [] }));

    return HttpResponse.json(
      { data: null, message: "Successfully reset users" },
      { status: 200 }
    );
  }
);

const createTestUsers = http.post<PathParams, UserCreate, ApiResponse<null>>(
  toEndpoint(ApiRoutes.CreateTestUsers),
  async ({ params }) => {
    const count = Number(params.count);

    const users = readUsers();

    if (users.length + count > 999) {
      return HttpResponse.json(
        { data: null, message: "Maximum users reached" },
        { status: 400 }
      );
    }

    for (let i = 0; i < count; i++) {
      const newUser: User = {
        id: (users[users.length - 1]?.id ?? 0) + 1,
        name: randomString(10),
        email: `${randomString(10)}@example.com`,
        phone: `010-${fillZero(Math.floor(Math.random() * 10000), 4)}-${fillZero(Math.floor(Math.random() * 10000), 4)}`,
        approved: Math.random() > 0.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
    }

    writeDB((db) => ({ ...db, users }));

    return HttpResponse.json(
      { data: null, message: "Successfully created user" },
      { status: 201 }
    );
  }
);

export const userHandlers = [
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
  resetUsers,
  createTestUsers,
];
