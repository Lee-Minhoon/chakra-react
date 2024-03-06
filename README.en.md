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

![next1](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/9aef2746-0c03-4eb6-b084-ce9afa3f6680)

![next2](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/0438fd08-32c6-416a-a3b2-50fa03eb5fd0)

![next3](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/07d0e2ea-7e14-48b6-a958-c1fbd7491ca9)

![next4](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/ff5dd7a2-b332-4744-a71e-2563b65b6024)

![next5](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/8ab59c2f-4049-4aae-aedf-b78d517ef2d5)

![next6](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/eb52239b-f874-4cc9-bec4-4fc955c3fb48)

![next7](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/ddb1e728-f474-4ef7-829e-985f86243d29)

![next8](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/862d76b5-1655-483f-804b-9399c77b0189)

![next9](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/e413e8a9-1668-4765-89ef-e655327b9490)

![next10](https://github.com/Lee-Minhoon/nextjs-boilerplate/assets/59780565/81c32aa1-183e-4428-a927-541fdbb6bcf8)
