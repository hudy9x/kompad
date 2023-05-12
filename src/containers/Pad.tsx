import { Outlet, useNavigate } from "react-router-dom"
import Titlebar from "../components/Titlebar"
import { useEffect } from "react";
import { usePadStore } from "../store";

function Pad() {
  const { idShared } = usePadStore((state) => state)
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!idShared) return;
    navigate(`${idShared}`)
  },[idShared, navigate])
  
  return (
    <>
      <Titlebar />
      <Outlet />
    </>
  )
}

export default Pad
