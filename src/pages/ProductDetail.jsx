import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `https://fakestoreapi.com/products/${id}`
                );
                setProduct(res.data);
            } catch (err) {
                console.error('Failed to fetch product', err);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find((item) => item.id === product.id);
        if (!existing) {
            cart.push({ ...product, quantity: 1 });
        } else {
            existing.quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    };

    if (!product) return <div className='loading'>Loading...</div>;

    return (
        <div className='product-detail-container'>
            <div className='image-section'>
                <img src={product.image} alt={product.title} />
            </div>
            <div className='info-section'>
                <h2>{product.title}</h2>
                <p className='description'>{product.description}</p>
                <p className='price'>${product.price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;
