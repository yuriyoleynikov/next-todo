import { createContext } from "react";
import { Store } from "./store";

const StoreContext = createContext<Store | null>(null)
export default StoreContext
