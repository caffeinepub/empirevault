import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SiteConfig {
    productName: string;
    contactEmail: string;
    price: number;
}
export interface backendInterface {
    getConfig(): Promise<SiteConfig>;
    setConfig(productName: string, price: number, contactEmail: string): Promise<void>;
}
