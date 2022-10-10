import classNames from "classnames";
import Container from "../Container";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { lang } from "../../../constants/lang";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { routes } from "../../../routes";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useTheme } from "../../../hooks/useTheme";

type NavbarProps = {
  //
};

const navigation = [
  { name: lang.home.fr, href: routes.home },
  { name: lang.login.fr, href: routes.login },
  { name: lang.register.fr, href: routes.register },
];

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useCurrentUser();

  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    logout((err) => {
      setLogoutLoading(false);
    });
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-dark-600 backdrop-filter backdrop-blur bg-opacity-70 items-center sticky top-0 shadow-sm z-20"
    >
      {({ open, close }) => (
        <>
          <Container>
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-700">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/assets/img/logo.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/assets/img/logo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            router.pathname == item.href
                              ? "bg-primary-500 text-white"
                              : "hover:bg-primary-500 hover:text-white duration-200 ease-in-out transition",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            router.pathname == item.href ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  type="button"
                  className={
                    "group bg-gray-50 dark:bg-dark-500 border border-gray-100 dark:border-dark-700 px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  {theme === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 duration-200 transition-transform ease-in-out group-hover:rotate-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 duration-200 transition-transform ease-in-out group-hover:rotate-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  )}
                </button>
                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-dark-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-50 dark:bg-dark-600" : "",
                                "block px-4 py-2 text-sm w-full text-left"
                              )}
                            >
                              {logoutLoading
                                ? lang.logoutLoading.fr
                                : lang.logout.fr}
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button key={item.name} as="div">
                  <Link href={item.href} key={item.name}>
                    <a
                      className={classNames(
                        router.pathname == item.href
                          ? "bg-dark-500"
                          : "hover:bg-dark-500",
                        "block px-3 py-2 rounded-md text-base font-medium duration-200 ease-in-out transition"
                      )}
                      onClick={() => close()}
                      aria-current={
                        router.pathname == item.href ? "page" : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

Navbar.propTypes = {
  //
};

export default Navbar;
