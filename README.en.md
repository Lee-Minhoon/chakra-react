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
