export interface IProductAvailability {
    cod_producto: number;
    nombre_producto: string;
    cod_cliente: string;
    puntos: number;
    Link: string;
}

export interface IProduct {
    cod_producto: number;
    nombre_producto: string;
}

export const CURRENT_PRODUCTS: IProduct[] = [
    {
        cod_producto: 1,
        nombre_producto: 'LATEX PATO'
    },
    {
        cod_producto: 2,
        nombre_producto: 'VENCELATEX LATEX'
    },
    {
        cod_producto: 3,
        nombre_producto: 'DURALATEX'
    },
    {
        cod_producto: 4,
        nombre_producto: 'FAST COLOR LATEX'
    },
    {
        cod_producto: 5,
        nombre_producto: 'AMERICAN COLORS MATE'
    },
];