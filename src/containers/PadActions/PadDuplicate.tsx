import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { IPad, setDuplicate } from '../../services/pads';
import { textSplicing } from '../../utils';

export const PadDuplicate = ({ data }: { data: IPad }) => {

  const onClickDuplicate = async () => {
    const pad: IPad = textSplicing('Copy', data);
    await setDuplicate(pad);
  }

  return (
    <a
      onClick={onClickDuplicate}
      href="#duplicate"
      className="dropdown-content"
    >
      <HiOutlineDocumentDuplicate
        className="dropdown-icon"
        aria-hidden="true"
      />
      <span className="dropdown-text">Duplicate</span>
    </a>
  )
}
