import { ISize } from "./";

    
    // tags: string[];
export interface ICartProduct {
    _id: string;
    // description: string;
    images: string;
    // inStock: number;
    price: number;
    size?: ISize;
    slug: string;
    // tags: string[];
    title: string;
    // type: IType;
    gender: 'men'|'women'|'kid'|'unisex';
    // createdAt: string;
    // updatedAt: string;
    quantity: number;
}