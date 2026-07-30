import { C } from "../../constants.js";

export default function Spinner({ size = 26 }) {
  const bw = Math.max(2, Math.round(size / 9));
  return <div style={{ display:"inline-block", width:size, height:size, border:`${bw}px solid ${C.border}`, borderTopColor:C.purple, borderRadius:"50%", animation:"spin 0.8s linear infinite", verticalAlign:"middle" }} />;
}
