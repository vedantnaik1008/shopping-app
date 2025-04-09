import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';

function App() {

    return (
        <div className=''>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route
                        path='/products'
                        element={
                            <PrivateRoute>
                                <Products />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/products/:id'
                        element={
                            <PrivateRoute>
                                <ProductDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/cart'
                        element={
                            <PrivateRoute>
                                <Cart />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
