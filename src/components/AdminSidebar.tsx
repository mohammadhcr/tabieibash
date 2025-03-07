import Link from "next/link"
import styles from '../styles/AdminSidebar.module.scss'

const AdminSidebar = () => {

    const {menuList, mobileMenuList} = styles

  return (
    <>
        <div className={menuList}>
            <span>داشبورد</span>
            <Link href="/admin/product">محصول</Link>
            <Link href="/admin/post">مطلب</Link>
        </div>
        <div className={mobileMenuList}>
            <Link href="/admin/product">محصول</Link>
            <hr />
            <Link href="/admin/post">مطلب</Link>
        </div>
    </>
  )
}

export default AdminSidebar