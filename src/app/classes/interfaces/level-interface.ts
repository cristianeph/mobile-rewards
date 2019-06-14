export interface ILevel {
    cod_categoria: number;
    categoria: string;
}

export const CURRENT_LEVELS: ILevel[] = [
    {
        cod_categoria: 91,
        categoria: 'Oro'
    },
    {
        cod_categoria: 92,
        categoria: 'Plata'
    },
    {
        cod_categoria: 93,
        categoria: 'Bronce'
    },
];