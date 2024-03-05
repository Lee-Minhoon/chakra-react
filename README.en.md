<h1 align="center">NextJS Boilerplate</h1>

This is Next.js boilerplate for front-end.

There is a lot of code integrated with [Charka UI](https://npmjs.com/package/@chakra-ui/react) and [React Query](https://npmjs.com/package/@tanstack/react-query).

You can take and modify the code as you wish, and copy any parts you need.

## Demo

Data on the demo site may be deleted arbitrarily. [link](https://nextjs-boilerplate-dusky-phi.vercel.app/)

## Getting Started

Install dependencies.

```bash
yarn
```

Then, start the Next.js server.

```bash
yarn dev
```

## Main Features

- [Global Modal Provider](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/providers/ModalProvider/ModalProvider.tsx) (Zustand)
- [Optimistic Update](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/apis/hooks.ts) (React Query, refer to [github](https://github.com/horprogs/react-query))
- [WYSIWYG Editor](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/Editor/Editor.tsx) (Quill)
- Forms (React Hook Form)
- [Table](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/DataTable/DataTable.tsx) (React Table)
- [Infinite List](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/InfiniteList/InfiniteList.tsx) (React Query)
- [Virtual List](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/VirtualList/VirtualListBase.tsx) (React Virtual)
- Translation (React I18next)

## Features

### Core

- [Next.js](https://www.npmjs.com/package/next)

### UI

- [Charka UI](https://npmjs.com/package/@chakra-ui/react)
- [React Table](https://npmjs.com/package/@tanstack/react-table)
- [Quill](https://www.npmjs.com/package/quill)
- [React Icons](https://npmjs.com/package/react-icons)

### Data

- [Axios](https://www.npmjs.com/package/axios)
- [Zustand](https://npmjs.com/package/zustand)
- [React Query](https://npmjs.com/package/@tanstack/react-query)
- [React Hook Form](https://npmjs.com/package/react-hook-form)

### Utilities

- [React Virtual](https://npmjs.com/package/@tanstack/react-virtual)
- [React I18next](https://www.npmjs.com/package/react-i18next)

### Code

- [TypeScript](https://www.npmjs.com/package/typescript)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

## Attention

- This project is not for intended for full-stack development. The focus is only on front-end development.

- No server-side rendering is used, everything is rendered on the client. So, as long as you change the router, there is no difficulty in integrating with React.

- Server-side code is for demonstration purposes only and should be removed if not used. If the server code has been removed, the libraries that need to be removed are as follows.

  - formidable (for form parsing)
  - aws-sdk (for file upload)

## Previews

![n1](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/8e964648-8c99-459a-9f83-3e104321dfba)

![n2](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/c43e107e-a37b-4d8e-9491-58f5a9c8d34f)

![n3](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/41d14720-c2d5-4d50-9fea-1fb45fa00a61)

![n4](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/06be1540-443d-4bb3-b44b-38a5fc8f5848)

![n5](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/4f14e0d3-8c86-4342-a703-1831297314cd)

![n6](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/6b764c66-3356-466d-bb8b-329b9e370ef3)

![n7](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/7360fee4-afa6-44b9-a938-31b8e95fbc79)

![n8](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/dc2b318f-0c27-4651-8b86-1ca19da3d72a)

![n9](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/33bf740f-8cba-4968-8917-04bd08d36db9)

![n10](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/34bb3002-43d5-4150-9e7f-f20578be3a03)
