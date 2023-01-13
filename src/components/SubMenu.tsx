import { Menu } from "@headlessui/react"

export const SubMenu = ({ items, onClick }: {
  items: Array<{
    title: string,
    icon: any
  }>,
  onClick: (item: string) => void
}) => {

  const handleClick = (item: string) => {
    onClick(item);
  }

  return (
    <Menu.Items className="submenu dropdown div-y absolute top-0 left-56 mt-2 w-56 origin-top-right" >
      <div className="py-1">
        {items.map((item) => (
          <a
            href={item.title}
            className="group dropdown-content flex items-center px-4 py-2 text-sm"
            onClick={() => handleClick(item.title)}
          >
            <div className="dropdown-icon-sub" >
              {item.icon}
            </div>
            <span className="dropdown-text">{item.title}</span>
          </a>
        ))}
      </div>
    </Menu.Items>
  )
}
