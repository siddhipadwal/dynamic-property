"use client";

import Link from "next/link";

export default function Header() {
    return (
        <div
            id="offcanvas-mobile-menu"
            className="offcanvas left-0 transform -translate-x-full fixed font-normal text-sm top-0 z-50 h-screen xs:w-[300px] lg:w-[380px] transition-all ease-in-out duration-300 bg-white"
        >
            <div className="py-12 pr-5 h-[100vh] overflow-y-auto">
                {/* close button start */}
                <button
                    className="offcanvas-close text-primary text-[25px] w-10 h-10 absolute right-0 top-0 z-[1]"
                    aria-label="offcanvas"
                >
                    x
                </button>
                {/* close button end */}
                {/* offcanvas-menu start */}
                <nav className="offcanvas-menu mr-[20px]">
                    <ul>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="/"
                                className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="/about"
                                className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="#"
                                className="relative block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                Properties
                            </Link>
                            <ul className="offcanvas-submenu static top-auto hidden w-full visible opacity-100 capitalize">
                                <li>
                                    <Link
                                        href="/properties"
                                        className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                                    >
                                        All Properties
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/properties/ready-to-move"
                                        className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                                    >
                                        Ready to Move
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/properties/under-construction"
                                        className="text-sm pt-3 px-10 pb-1 text-black font-light block transition-all hover:text-secondary"
                                    >
                                        Under Construction
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="/location"
                                className="relative block capitalize font-normal text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                Locations
                            </Link>
                        </li>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="/blog"
                                className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                Blogs
                            </Link>
                        </li>
                        <li className="relative block border-b-primary border-b">
                            <Link
                                href="/contact"
                                className="relative block capitalize text-black hover:text-secondary text-base my-2 py-1 px-5"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* offcanvas-menu end */}
                <div className="px-5 flex flex-wrap mt-3 sm:hidden">
                    <Link
                        href="/coming-soon"
                        className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-secondary before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto before:transition-all leading-none px-[20px] py-[15px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-primary after:rounded-md after:transition-all"
                    >
                        Add Property
                    </Link>
                </div>
            </div>
        </div>

    );
}
