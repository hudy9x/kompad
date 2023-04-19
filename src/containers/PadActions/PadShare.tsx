import { useEffect, useState } from 'react';
import { HiOutlineUserAdd } from 'react-icons/hi'
import { IPad } from '../../services/pads'
import { usePadListStore } from '../../store/pad';

export const PadShare = ({ data }: { data: IPad }) => {
  const { setIsShareModal, setTitle } = usePadListStore()
  const openModalPadShare = async () => {
    setIsShareModal(true)
    setTitle(data.title)
  }

  return (
    <div>
      <a
        href="#share"
        className="group dropdown-content flex items-center px-4 py-2 text-sm"
        onClick={openModalPadShare}
      >
        <HiOutlineUserAdd className="dropdown-icon" aria-hidden="true" />
        <span className="dropdown-text">Share</span>
      </a>
    </div>
  )
}
