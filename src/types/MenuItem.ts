import { StaticImageData } from "next/image";

export interface MenuItem{
    id:string;
    price:number;
    image:StaticImageData;
    category:string
    name:string;
    description:string;

}