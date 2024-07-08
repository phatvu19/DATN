interface Product {
    id: number
    name: string
    brand: string
    description?: string
    category_id: number
    image: string
    variants?: []
}

interface Attribute {
    id: number
    name: string
}

interface AttributeValue {
    id: number
    value: string
    attribute_id: number
}

interface Variant {
    id?: number
    product_id?: number
    price: number
    price_promotional: number
    quantity: number
    attributes: {
        color?: string
        size?: string
    }
}

export type { Attribute, AttributeValue, Product, Variant }
