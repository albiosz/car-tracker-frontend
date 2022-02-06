import { useEffect, useState } from "react"
import "../../../../store/store"
import store from "../../../../store/store";
import ShortRouting from "./ShortRouting/ShortRouting";
import LongRouting from "./LongRouting/LongRouting";

export default function History() {

  const [historyType, setHistoryType] = useState(store.getState().historyType);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setHistoryType(store.getState().historyType)
    })

    return unsubscribe;
  }, [])
  
  if (historyType === "short") {
    return <ShortRouting />
  } else if (historyType === "long") {
    return <LongRouting />
  } 

  return null;
}