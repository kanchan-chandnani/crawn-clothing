import { useContext } from "react";

import { ProductContext } from "../../components/contexts/Products.context.jsx";
import ProductCard from "../../components/product-card/product-card.compoenent.jsx";
import './shop.styles.scss';

const Shop = () => {
    const { products } = useContext(ProductContext);
    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Shop;