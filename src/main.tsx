import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from './redux/store';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CurrentMonth } from './pages/CurrentMonth';
import { injectStore } from './common/factory/api_auth_client';
import CreateBudget from './pages/CreateBudget/CreateBudget';
import { CategoryList } from './pages/CategoryList';
import BudgetDetail from './pages/Budget/Budget';
import BudgetHistoryList from './pages/BudgetHistoryList/BudgetHistoryList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <SignUp /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/login', element: <Login /> },
      {
        path: '/home',
        element: <Home />,
        children: [
          { path: '/home/', element: <Dashboard /> },
          { path: '/home/dashboard', element: <Dashboard /> },
          {
            path: '/home/budget',
            element: <CurrentMonth />,
          },
          {
            path: '/home/budget/:budgetId',
            element: <BudgetDetail />,
          },
          {
            path: '/home/budget-history/:budgetId',
            element: <BudgetDetail isHistoryDetail={true} />,
          },
          { path: '/home/budget/create', element: <CreateBudget /> },
          { path: '/home/historic', element: <BudgetHistoryList /> },
          { path: '/home/categories', element: <CategoryList /> },
        ],
      },
    ],
  },
]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: 2 },
  },
});

injectStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
