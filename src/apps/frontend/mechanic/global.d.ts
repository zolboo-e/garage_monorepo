import type { FC, PropsWithChildren } from "global";

declare module "react" {
  export declare type FCC<P = {}> = FC<PropsWithChildren<P>>;
}
