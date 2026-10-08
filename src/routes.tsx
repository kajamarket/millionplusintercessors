import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { ArticlePage, getStaticPaths as getArticlePaths } from './pages/ArticlePage';
import { CategoryPage, getStaticPaths as getCategoryPaths } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { posts } from './data/posts';

// Calculate total pages for pagination
const totalPages = Math.max(1, Math.ceil(posts.length / 9));
const paginationPaths = Array.from({ length: totalPages }, (_, i) => `/blog/page/${i + 1}`);

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'blog',
        element: <BlogListPage />,
      },
      {
        path: 'blog/page/:n',
        element: <BlogListPage />,
        getStaticPaths: () => paginationPaths,
      },
      {
        path: 'blog/:slug',
        element: <ArticlePage />,
        getStaticPaths: getArticlePaths,
      },
      {
        path: 'category/:slug',
        element: <CategoryPage />,
        getStaticPaths: getCategoryPaths,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: '404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
