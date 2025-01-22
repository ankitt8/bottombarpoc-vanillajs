// pageConfig.js
export const pageConfig = {
    home: {
        default: `
            <p>This is Home</p>
            <button onclick="navigate('l1')">Go to Home Level 1</button>
        `,
        l1: `
            <p>This is Home Level 1</p>
            <button onclick="navigate('l2')">Go to Home Level 2</button>
            <button onclick="navigate()">Go back to Home</button>
        `,
        l2: `
            <p>This is Home Level 2</p>
            <button onclick="navigate('l1')">Go back to Home Level 1</button>
        `
    },
    categories: {
        default: `
            <p>This is Categories</p>
            <button onclick="navigate('l1')">Go to Categories Level 1</button>
        `,
        l1: `
            <p>This is Categories Level 1</p>
            <button onclick="navigate('l2')">Go to Categories Level 2</button>
            <button onclick="navigate()">Go back to Categories</button>
        `,
        l2: `
            <p>This is Categories Level 2</p>
            <button onclick="navigate('l1')">Go back to Categories Level 1</button>
        `
    },
    cart: {
        default: `
            <p>This is Cart</p>
            <button onclick="navigate('l1')">Go to Cart Level 1</button>
        `,
        l1: `
            <p>This is Cart Level 1</p>
            <button onclick="navigate('l2')">Go to Cart Level 2</button>
            <button onclick="navigate()">Go back to Cart</button>
        `,
        l2: `
            <p>This is Cart Level 2</p>
            <button onclick="navigate('l1')">Go back to Cart Level 1</button>
        `
    }
};
