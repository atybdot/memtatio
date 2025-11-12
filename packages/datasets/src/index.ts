import type{ number } from "zod";
import ab from "./assets/data-sets/ab.json";
import cwh from "./assets/data-sets/cwh.json";
import hc from "./assets/data-sets/hc.json";
import ma from "./assets/data-sets/ma.json";
import pg from "./assets/data-sets/pg.json";
export const datasets = [ab, hc, pg, ma, cwh];
export type TDataset = (typeof datasets)[keyof typeof number];
export { ab as arpit, cwh as harry, hc as hitesh, ma as mannu, pg as piyush };
