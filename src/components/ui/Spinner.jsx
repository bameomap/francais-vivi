import { C } from "../../constants.js";

export default function Spinner() {
  return <div style={{ width:26, height:26, border:`3px solid ${C.border}`, borderTopColor:C.purple, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />;
}
