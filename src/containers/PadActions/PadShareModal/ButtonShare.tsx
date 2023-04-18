import { BsLink } from "react-icons/bs"

export const ButtonShare = () => {
  return (
    <div className="flex justify-between">
      <button type="button" className="btn btn-lg">
        <BsLink />
        <p className="pl-5">Copy link</p>
      </button>
      <button type="button" className="btn btn-primary btn-lg">
        Done
      </button>
    </div>
  )
}