import { FcKindle} from 'react-icons/fc'
import { HiOutlineCube, HiOutlineClock, HiOutlineStar } from 'react-icons/hi'
import { usePadListStore } from '../../store/pad'
export default function Category() {

  const { query: { recently, important, tag, folder  }, filterByRecently, clearFilter, filterByImportant  } = usePadListStore()
  const isAllActive = !recently && !important && !tag && !folder;
  const onRecently = () => filterByRecently()
  const showAll = () => clearFilter()
  const showImportant = () => filterByImportant()

  return <section className="sec-container">
    <h2 className="sec-title">
      <FcKindle />
      <span>Category</span>
    </h2>
    <div className="sec-content">
      <div className={`sec-item ${isAllActive ? 'font-bold' : ''}`} onClick={showAll}><HiOutlineCube/>All pad</div>
      <div className={`sec-item ${recently ? 'font-bold' : ''}`} onClick={onRecently}><HiOutlineClock/>Recently</div>
      <div className={`sec-item ${important ? 'font-bold' : ''}`} onClick={showImportant}><HiOutlineStar  />Important</div>
    </div>
  </section>

}
