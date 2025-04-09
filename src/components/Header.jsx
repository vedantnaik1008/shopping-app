import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Header.css';

const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        };

        updateCartCount();
        const interval = setInterval(updateCartCount, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        navigate('/');
    };

    const token = localStorage.getItem('token');
    if (!token) return null;

    return (
        <header className='header'>
            <div className='nav-container'>
                <h2 className='logo'>FakeShop</h2>

                <button
                    className='hamburger'
                    onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <Link to='/products' onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to='/cart' onClick={() => setMenuOpen(false)}>
                        Cart <span className='badge'>{cartCount}</span>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
