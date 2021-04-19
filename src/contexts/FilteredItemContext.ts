import { createContext } from "react";
import { Api } from "../types/Api";

export const FilteredItemContext = createContext<Api[]>([]);