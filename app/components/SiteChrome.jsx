"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { bookingUrl as defaultBookingUrl, eventLinks as defaultEventLinks, siteSettings as defaultSiteSettings } from "../site-data";
import { imageDimensions } from "../image-data";
import { headerSocialIcons } from "../social-icons";
import FooterVideoText from "./FooterVideoText";
import { useCmsBootstrap } from "../hooks/useCmsPage";

function useSharedContent() {
  const bootstrap = useCmsBootstrap({ settings: {} });
  const siteSettings = bootstrap.settings?.site || defaultSiteSettings;
  const eventLinks = bootstrap.settings?.eventExperiences
    ?.filter((item) => item.isVisible !== false)
    .map(({ title, href }) => [title, href]) || defaultEventLinks;
  const bookingUrl = bootstrap.settings?.bookingUrl?.value || defaultBookingUrl;
  const toMenuItems = (items, fallback) => items?.length
    ? items.filter((item) => item.isVisible !== false).map((item) => ({ ...item, children: (item.children || []).filter((child) => child.isVisible !== false) }))
    : fallback.map(([label, url]) => ({ label, url, target: "_self", children: [] }));
  const headerNavigation = toMenuItems(bootstrap.menus?.header, defaultSiteSettings.navigation);
  const footerNavigation = toMenuItems(bootstrap.menus?.footer, defaultSiteSettings.footerNavigation);
  const buttons = {
    headerBookingLabel: "Booking request",
    footerPlanLabel: "Plan an event",
    footerContactLabel: "Start your event",
    ...siteSettings.buttons,
  };
  return { siteSettings, eventLinks, bookingUrl, headerNavigation, footerNavigation, buttons };
}

const headerSocialLabels = ["Facebook", "Instagram", "X", "TikTok"];

function SocialIcon({ label }) {
  const icon = headerSocialIcons[label];
  const gradientId = useId().replace(/:/g, "");

  if (label === "Facebook") {
    return (
      <svg className="brand-social-svg brand-social-facebook" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#0866ff" />
        <path
          fill="#fff"
          d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.25-1.5 1.57-1.5H17V3.9c-.3-.04-1.34-.13-2.57-.13-2.55 0-4.3 1.56-4.3 4.42V10H7.25v3h2.88v8h3.57Z"
        />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg className="brand-social-svg brand-social-instagram" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <radialGradient id={`${gradientId}-ig-a`} cx="30%" cy="105%" r="120%">
            <stop offset="0" stopColor="#ffd600" />
            <stop offset=".28" stopColor="#ff7a00" />
            <stop offset=".56" stopColor="#ff0169" />
            <stop offset=".82" stopColor="#d300c5" />
            <stop offset="1" stopColor="#7638fa" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="5.6" fill={`url(#${gradientId}-ig-a)`} />
        <path className="brand-social-white" d={icon.path} />
      </svg>
    );
  }

  if (label === "X") {
    return (
      <svg className="brand-social-svg brand-social-x" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#fff" d={icon.path} />
      </svg>
    );
  }

  if (label === "TikTok") {
    return (
      <svg className="brand-social-svg tiktok-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5.6" fill="#050505" />
        <path className="tiktok-cyan" d={icon.path} />
        <path className="tiktok-pink" d={icon.path} />
        <path className="tiktok-core" d={icon.path} />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg className="brand-social-svg brand-social-linkedin" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="4.4" fill="#0a66c2" />
        <path fill="#fff" d="M6.45 8.4H3.2V19h3.25V8.4ZM4.82 3a1.88 1.88 0 1 0 0 3.76 1.88 1.88 0 0 0 0-3.76ZM9 8.4h3.12v1.45h.04c.44-.82 1.5-1.7 3.08-1.7 3.3 0 3.91 2.17 3.91 5V19H15.9v-5.2c0-1.24-.02-2.84-1.73-2.84-1.74 0-2 1.35-2 2.75V19H9V8.4Z" />
      </svg>
    );
  }

  if (label === "YouTube") {
    return (
      <svg className="brand-social-svg brand-social-youtube" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="5.6" fill="#ff0000" />
        <path fill="#fff" d="m10 8.35 6.15 3.65L10 15.65v-7.3Z" />
      </svg>
    );
  }

  if (label === "WhatsApp") {
    return (
      <svg className="brand-social-svg brand-social-whatsapp" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#25d366" />
        <path className="brand-social-whatsapp-mark" fill="#fff" d={icon.path} />
      </svg>
    );
  }
  return <svg className={`brand-social-svg brand-social-${label.toLowerCase()}`} viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>;
}

export function SiteHeader() {
  const { siteSettings, eventLinks, bookingUrl, headerNavigation, buttons } = useSharedContent();
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const closeMenu = () => {
    setOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <div className="utility-bar">
        <div className="utility-contact">
          <a className="utility-call" href={siteSettings.contact.phoneHref} aria-label={`Call ${siteSettings.contact.phone}`}>
            <span className="utility-call-icon" aria-hidden="true">☎</span>{siteSettings.contact.phone}
          </a>
          <a className="utility-email" href={siteSettings.contact.gmailHref} target="_blank" rel="noreferrer" aria-label={`Compose an email to ${siteSettings.contact.email} in Gmail`}>
            <span className="utility-email-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M3.75 6.75h16.5v10.5H3.75V6.75Zm.75.75 7.5 5.75 7.5-5.75" /></svg>
            </span>
            <span className="utility-email-text">{siteSettings.contact.email}</span>
          </a>
        </div>
        <span>{siteSettings.brand.tagline}</span>
        <div className="utility-socials">
          {siteSettings.socials
            .filter(([label]) => headerSocialLabels.includes(label))
            .sort(([a], [b]) => headerSocialLabels.indexOf(a) - headerSocialLabels.indexOf(b))
            .map(([label, href]) => (
              <a className={`utility-icon utility-icon-${label.toLowerCase()}`} style={{ "--social-brand": `#${headerSocialIcons[label].hex}` }} href={href} target="_blank" rel="noreferrer" key={label} aria-label={label} title={label}>
                <SocialIcon label={label} />
              </a>
            ))}
          <a className="utility-icon utility-email-social" href={siteSettings.contact.gmailHref} target="_blank" rel="noreferrer" aria-label={`Compose an email to ${siteSettings.contact.email} in Gmail`} title="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 6.75h16.5v10.5H3.75V6.75Zm.75.75 7.5 5.75 7.5-5.75" /></svg>
          </a>
        </div>
      </div>
      <header className="nav-shell">
        <Link className="wordmark" href="/" aria-label="Magnoliya Grand home">
          <img
            {...imageDimensions("/home-assets/magnoliya-official-logo.png")}
            className="header-official-logo"
            src="/home-assets/magnoliya-official-logo.png"
            alt="Magnoliya Grand Conference and Event Center"
          />
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
          {headerNavigation.map((item) => {
            const submenu = item.children?.length ? item.children : item.label === "Events" ? eventLinks.map(([label, url]) => ({ label, url, target: "_self" })) : [];
            const itemKey = `${item.label}-${item.url}`;
            const submenuOpen = openSubmenu === itemKey;
            return submenu.length ? (
            <div className={`nav-item nav-item-events${submenuOpen ? " is-open" : ""}`} key={itemKey}>
              <div className="nav-parent-row">
                <a href={item.url} target={item.target} rel={item.target === "_blank" ? "noreferrer" : undefined} onClick={closeMenu}>{item.label}</a>
                <button
                  className="submenu-toggle"
                  type="button"
                  aria-expanded={submenuOpen}
                  aria-controls={`submenu-${itemKey.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                  aria-label={`${submenuOpen ? "Close" : "Open"} ${item.label} submenu`}
                  onClick={() => setOpenSubmenu((current) => current === itemKey ? null : itemKey)}
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <div className="nav-submenu" id={`submenu-${itemKey.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
                {submenu.map((child) => (
                  <a href={child.url} target={child.target} rel={child.target === "_blank" ? "noreferrer" : undefined} onClick={closeMenu} key={`${child.label}-${child.url}`}>{child.label}</a>
                ))}
              </div>
            </div>
          ) : (
            <a className={item.label === "Contact" ? "nav-contact-link" : undefined} href={item.url} target={item.target} rel={item.target === "_blank" ? "noreferrer" : undefined} onClick={closeMenu} key={itemKey}>{item.label}</a>
          );})}
          <div className="nav-mobile-contact">
            <a href={siteSettings.contact.phoneHref}>Call {siteSettings.contact.phone}</a>
            <a href={siteSettings.contact.gmailHref} target="_blank" rel="noreferrer">Email {siteSettings.contact.email}</a>
          </div>
        </nav>
        <a className="nav-cta" href={bookingUrl} target="_blank" rel="noreferrer">{buttons.headerBookingLabel} <span>↗</span></a>
        <button className="menu-button" onClick={() => { setOpen(!open); if (open) setOpenSubmenu(null); }} aria-expanded={open} aria-label="Toggle menu">
          <span /><span />
        </button>
      </header>
    </>
  );
}

export function SiteFooter() {
  const { siteSettings, eventLinks, bookingUrl, footerNavigation, buttons } = useSharedContent();
  return (
    <footer className="site-footer" id="contact">
      <FooterVideoText />
      <div className="footer-main">
        <div className="footer-intro">
          <div className="footer-brand">
            <img
              {...imageDimensions("/home-assets/magnoliya-official-logo.png")}
              className="footer-official-logo"
              src="/home-assets/magnoliya-official-logo.png"
              alt="Magnoliya Grand Conference and Event Center"
            />
          </div>
          <h2>The perfect setting<br />for your next story.</h2>
          <p>Grandeur, hospitality, and moments worth remembering.</p>
        </div>
        <nav className="footer-column footer-explore" aria-label="Footer navigation">
          <p className="footer-label">Explore</p>
          {footerNavigation.slice(0, 7).map((item) => <a href={item.url} target={item.target} rel={item.target === "_blank" ? "noreferrer" : undefined} key={`${item.label}-${item.url}`}><span>{item.label}</span><i>↗</i></a>)}
          <a href={bookingUrl} target="_blank" rel="noreferrer"><span>{buttons.footerPlanLabel}</span><i>↗</i></a>
        </nav>
        <div className="footer-column footer-contact">
          <p className="footer-label">Find us</p>
          <a href={siteSettings.contact.phoneHref}>{siteSettings.contact.phone}</a>
          <a href={siteSettings.contact.emailHref}>{siteSettings.contact.email}</a>
          <a href={siteSettings.contact.directions} target="_blank" rel="noreferrer">{siteSettings.contact.street}<br />{siteSettings.contact.city}</a>
          <a className="footer-enquire" href={bookingUrl} target="_blank" rel="noreferrer">{buttons.footerContactLabel} <span>↗</span></a>
        </div>
      </div>
      <nav className="footer-events-row" aria-label="Event types">
        {eventLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <div className="footer-bottom">
        <p>© 2026 Magnoliya Grand Manor Conference &amp; Event Center</p>
        <p>Manassas, Virginia · Near Washington, D.C.</p>
        <div className="footer-social-icons">
          {siteSettings.socials
            .filter(([label]) => Boolean(headerSocialIcons[label]))
            .map(([label, href]) => (
              <a href={href} style={{ "--social-brand": `#${headerSocialIcons[label].hex}` }} target="_blank" rel="noreferrer" aria-label={`Magnoliya Grand on ${label}`} title={label} key={label}>
                <SocialIcon label={label} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}

export function BookingBand({ title }) {
  const { siteSettings } = useSharedContent();
  const resolvedTitle = title || siteSettings.bookingBand.title;
  return (
    <section className="page-booking">
      <p className="section-kicker light">{siteSettings.bookingBand.kicker}</p>
      <h2>{resolvedTitle}</h2>
      <p>{siteSettings.bookingBand.description}</p>
      <div className="final-actions">
        <Link className="button button-gold" href={siteSettings.bookingBand.primaryHref || "/contact"}>{siteSettings.bookingBand.primaryLabel || "Schedule a Tour"} <span>→</span></Link>
      </div>
    </section>
  );
}
