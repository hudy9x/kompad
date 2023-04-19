import { BsLink } from "react-icons/bs"

export const ButtonShareModal = ({
  onClickShare,
  onClickCopy
}: {
  onClickShare: () => void,
  onClickCopy: () => void
}) => {
  
  return (
    <div className="flex justify-between">
      <button type="button" className="btn btn-lg" onClick={onClickCopy}>
        <BsLink />
        <p className="pl-5">Copy link</p>
      </button>
      <button type="button" className="btn btn-primary btn-lg" onClick={onClickShare}>
        Done
      </button>
    </div>
  )
}
