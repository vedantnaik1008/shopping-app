import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (category = '') => {
        try {
            setLoading(true);
            const url = category
                ? `https://fakestoreapi.com/products/category/${category}`
                : `https://fakestoreapi.com/products`;
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                'https://fakestoreapi.com/products/categories'
            );
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);
        fetchProducts(selected);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='products-container'>
            <div className='filters'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    onChange={handleCategoryChange}
                    value={selectedCategory}>
                    <option value=''>All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div className='products-grid'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
