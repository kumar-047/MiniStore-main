import React, { useState } from "react";
import { clearCredentials } from "../Slice/authSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineAssignment } from "react-icons/md";
import { FaListAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const OfficeSidebar = () => {

  const {userInfo}=useSelector((state)=>state.auth)
  const userName = userInfo?.name || 'User'
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const handleLogout = async () => {
    dispatch(clearCredentials())
    navigate('/')
  };

  const [open, setOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(false); // State for Products dropdown

  const menus = [
    { name: "Dashboard", link: "/Admin", icon: MdOutlineDashboard },
    { name: "Profile", link: "/Admin/Adminprofile", icon: AiOutlineUser },
    { name: "Customers", link: "/Admin/CustomerTable", icon: AiOutlineUser },
    { name: "Orders", link: "/Admin/OrdersTable", icon: FaClipboardList },
    {
      name: "Products",
      link: "#",
      icon: FaBoxOpen,
      submenu: [
        { name: "Product Adding", link: "/Admin/ProductRegister", icon: FaBoxOpen },
        { name: "Product Table", link: "/Admin/ProductTable", icon: FaBoxOpen }
      ]
    },
    { name: "Logout", icon: LuLogOut, onClick: handleLogout },
  ];

  const toggleAttendanceMenu = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const toggleFeesMenu = () => {
    setFeesOpen(!feesOpen);
  };

  const toggleSalaryMenu = () => {
    setSalaryOpen(!salaryOpen);
  };

  const toggleProductsMenu = () => {
    setProductsOpen(!productsOpen); // Toggle Products submenu visibility
  };

  

  const renderSubMenu = (menu, menuOpen) => (
    <div className="pl-8">
      {menu.submenu.map((submenu, j) => (
        <Link
          to={submenu.link}
          key={j}
          className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
        >
          <div>{React.createElement(submenu.icon, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `${j + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {submenu.name}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            {submenu.name}
          </h2>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex items-center justify-between">
          <span className={`text-lg font-semibold ${!open && 'hidden'}`}>{ `${userName}`}</span>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i}>
              {!menu.submenu ? (
                menu.name === "Logout" ? (
                  <button
                    onClick={menu.onClick}
                    className={` w-full ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                  </button>
                ) : (
                  <Link
                    to={menu.link}
                    className={` ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                    <h2
                      className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu.name}
                    </h2>
                  </Link>
                )
              ) : (
                <div>
                  <div
                    className={` ${menu.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                    onClick={() => {
                      if (menu.name === "Products") toggleProductsMenu(); // Toggle Products
                    }}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                    >
                      {menu.name}
                    </h2>
                    {open && (
                      <div className="ml-auto">
                        {
                        (menu.name === "Products" && productsOpen) ? (
                          <IoIosArrowUp size={20} />
                        ) : (
                          <IoIosArrowDown size={20} />
                        )}
                      </div>
                    )}
                  </div>
               
                  {menu.name === "Products" && productsOpen && open && renderSubMenu(menu, productsOpen)} {/* Render Products submenu */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeSidebar;
