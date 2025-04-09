import { useEffect, useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const updateCart = (items) => {
        setCartItems(items);
        localStorage.setItem('cart', JSON.stringify(items));
    };

    const handleQuantityChange = (id, newQty) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQty } : item
        );
        updateCart(updatedItems);
    };

    const handleRemove = (id) => {
        const filteredItems = cartItems.filter((item) => item.id !== id);
        updateCart(filteredItems);
    };

    const handleCheckout = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 4000);
    };

    const totalPrice = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <div className='cart-container'>
            <h2>Cart Items</h2>

            {showMessage && (
                <div className='popup'>Order placed successfully!</div>
            )}

            {cartItems.length === 0 ? (
                <p className='cart-empty'>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className='cart-item'>
                            <img src={item.image} alt={item.title} />
                            <div className='item-info'>
                                <h4>{item.title}</h4>
                                <div className="item-flex">
                                    <span>${item.price}</span>
                                    <input
                                        type='number'
                                        min='1'
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.id,
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                    <button onClick={() => handleRemove(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='cart-summary'>
                        <h3>Total: ${totalPrice}</h3>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
