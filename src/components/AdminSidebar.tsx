import Link from "next/link"
import styles from '../styles/AdminSidebar.module.scss'

const AdminSidebar = () => {

    const {menuItems, menuList} = styles

  return (
        <div className={menuList}>
            <ul className={menuItems}>
                <Link href="/admin/product"><li>محصول</li></Link>
                <Link href="/admin/post"><li>مطلب</li></Link>
            </ul>
        </div>
  )
}

export default AdminSidebar