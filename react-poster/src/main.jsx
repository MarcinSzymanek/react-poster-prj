import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './routes/RootLayout'
import { MainContent, loader as postsLoader } from './routes/MainContent'
import { NewPost, action as submitAction } from './routes/NewPostRoutForm'
import { PostDetails, loader as detailsLoader } from './routes/PostDetails'
import Spinner from './components/core/Spinner'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <MainContent />,
                loader: postsLoader,
                HydrateFallback: Spinner,
                children: [
                    {
                        path: '/:id',
                        element: <PostDetails />,
                        loader: detailsLoader,
                    },
                    {
                        path: 'create-post',
                        element: <NewPost />,
                        action: submitAction,
                    },
                ],
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
