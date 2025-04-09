import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className='product-card'
            onClick={() => navigate(`/products/${product.id}`)}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductCard;
