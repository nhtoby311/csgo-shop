import { createContext } from "react";
import { Api } from "../types/Api";

export const ItemContext = createContext<Api[]>([]);