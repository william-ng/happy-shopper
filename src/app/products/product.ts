export class Product {
    constructor(
        public id:number,
        public name:string,
        public description:string,
        public imageSrc:string,
        public categories:string[],
        public unitPrice:number,
        public inStock:number
    ){ }
}
