import { IPad } from "../../services/pads"
import PadCover from "./PadCover"

export default function PadCoverImage({ pad }: { pad: IPad }) {
  console.log(pad)
  const imgSrc = pad.cover || 'https://images.pexels.com/photos/771322/pexels-photo-771322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return <div className="pad-cover absolute top-0 left-0 w-full h-[220px] bg-gray-700"
    style={{
      backgroundImage: `linear-gradient(0deg, rgb(0 0 0 / 92%) 0%, rgb(0 0 0 / 62%) 35%, rgba(0, 212, 255, 0) 70%), url(${imgSrc})`,
      backgroundPosition: 'center',
      backgroundSize: `100%`
    }}>
    {pad.id ? <PadCover id={pad.id} /> : null}
  </div>
}
