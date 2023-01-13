import { AiOutlineExport, AiOutlineFilePdf, AiOutlineHtml5 } from "react-icons/ai"
import { MdOutlineArrowRight } from "react-icons/md"
import { SubMenu } from "../../components/SubMenu"
import { AiOutlineFileWord } from "react-icons/ai"

const data = [
  {
    title: 'Doc',
    icon: <AiOutlineFileWord />
  },
  {
    title: 'Pdf',
    icon: <AiOutlineFilePdf />
  },
  {
    title: 'Html',
    icon: <AiOutlineHtml5 />
  }

]

export const PadExport = ({ idx }: { idx: string }) => {

  const onClick = (item: string) => {
    console.log(item);
  }

  return (
    <div className="mainmenu">
      <div
        className="group dropdown-content flex items-center px-4 py-2 text-sm"
      >
        <AiOutlineExport
          aria-hidden="true"
          className="dropdown-icon"
        />
        <span className="dropdown-text">Export</span>
        <MdOutlineArrowRight className="dropdown-icon absolute right-0" />
      </div>
      <SubMenu items={data} onClick={onClick} />
    </div>
  )
}
