"use client";

import Link from "next/link";

export default function Header() {
    return (
        <div className="social-float">
  <a
    href="https://wa.me/917317241999"
    target="_blank"
    className="social-icon whatsapp"
  >
    <i className="fab fa-whatsapp" />
  </a>
  <a
    href="https://facebook.com/yourpage"
    target="_blank"
    className="social-icon facebook"
  >
    <i className="fab fa-facebook-f" />
  </a>
  <a
    href="https://www.instagram.com/dynamicproperties_/"
    target="_blank"
    className="social-icon instagram"
  >
    <i className="fab fa-instagram" />
  </a>
</div>

    );
}
