import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import RootLayout from './RootLayout';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Authorprofile from './components/Authorprofile';
import Article from './components/Article';
import Userprofile from './components/Userprofile';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import ArticleOfAuthor from './components/ArticleOfAuthor';
import { Navigate } from 'react-router-dom';
function App() {
  let browserRouter=createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/signin',
          element:<Signin/>
        },
        {
          path:'/userprofile',
          element:<Userprofile/>,
          children:[
            {
              path:'articles',
              element:<Articles/>
            },
            {
              path:'article/:articleId',
              element:<Article/>
            }
          ]
        },
        {
          path:'/authorprofile',
          element:<Authorprofile/>,
          children:[
            {
              path:'new-article',
              element:<AddArticle/>
            },
            {
              path:'articleofauthor/:username',
              element:<ArticleOfAuthor/>
            },
            {
              path:"article/:articleId",
              element:<Article/>
            },  
            {
              path:'',
              element:<Navigate to="new-article"/>
            }
          ]
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
