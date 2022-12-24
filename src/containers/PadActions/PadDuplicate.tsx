import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { message } from '../../components/message';
import { IPad, duplicatePad } from '../../services/pads';

export const PadDuplicate = ({ data }: { data: IPad }) => {

  const onDuplicate = async () => {
    await duplicatePad(data.id!).then(() => {
      message.success('Duplicated successfully');
    }).catch(() => {
      message.error('Duplicated failed');
    });
  }

  return (
    <a
      onClick={onDuplicate}
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
