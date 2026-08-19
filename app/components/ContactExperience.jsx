"use client";

import { useEffect, useRef, useState } from "react";
import { bookingUrl as defaultBookingUrl, siteSettings as defaultSiteSettings } from "../site-data";
import { useCmsBootstrap } from "../hooks/useCmsPage";

const defaultHeadline = ["Every", "unforgettable", "event", "starts", "with", "hello."];

export default function ContactExperience({ content = {} }) {
  const bootstrap = useCmsBootstrap({ settings: {} });
  const siteSettings = bootstrap.settings?.site || defaultSiteSettings;
  const bookingUrl = bootstrap.settings?.bookingUrl?.value || defaultBookingUrl;
  const headline = content.headline || defaultHeadline;
  const sectionRef = useRef(null);
  const mapCanvasRef = useRef(null);
  const inquiryRef = useRef(null);
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });
  const [formStartedAt] = useState(() => Date.now());

  const submitInquiry = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setFormStatus({ state: "sending", message: "Sending your inquiry…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formStartedAt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your inquiry could not be sent.");
      form.reset();
      setFormStatus({ state: "success", message: "Thank you. Our events team will be in touch shortly." });
    } catch (error) {
      setFormStatus({ state: "error", message: error.message || "Your inquiry could not be sent. Please call or email us." });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle("is-visible", entry.isIntersecting),
      { threshold: 0.14, rootMargin: "-8% 0px -8% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const inquiry = inquiryRef.current;
    if (!inquiry) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => inquiry.classList.toggle("is-form-visible", entry.isIntersecting),
      { threshold: .16, rootMargin: "-8% 0px -8% 0px" }
    );
    observer.observe(inquiry);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    let map;
    let marker;
    let observer;

    const createMap = async () => {
      try {
        const maplibreModule = await import("maplibre-gl");
        if (disposed || !mapCanvasRef.current) return;
        const maplibregl = maplibreModule.default || maplibreModule;
        const destination = [-77.5153225, 38.8051458];

        map = new maplibregl.Map({
          container: mapCanvasRef.current,
          style: {
            version: 8,
            sources: {
              satellite: {
                type: "raster",
                tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
                tileSize: 256,
                maxzoom: 19,
                attribution: "Tiles © Esri, Maxar, Earthstar Geographics",
              },
            },
            layers: [
              { id: "night", type: "background", paint: { "background-color": "#11181c" } },
              { id: "satellite", type: "raster", source: "satellite", paint: { "raster-saturation": .12, "raster-contrast": .1, "raster-brightness-min": .04, "raster-brightness-max": .98, "raster-fade-duration": 700 } },
            ],
          },
          center: [-77.58, 38.77],
          zoom: 10.8,
          pitch: 18,
          bearing: 12,
          minZoom: 8,
          maxZoom: 19,
          antialias: true,
          attributionControl: false,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

        const markerElement = document.createElement("div");
        markerElement.className = "contact-real-map-marker";
        markerElement.innerHTML = '<i></i><b>MG</b><span>Magnoliya Grand</span>';
        marker = new maplibregl.Marker({ element: markerElement, anchor: "bottom" }).setLngLat(destination).addTo(map);

        map.on("load", () => {
          if (disposed) return;
          const stage = mapCanvasRef.current?.closest(".contact-map-stage");
          if (!stage) return;
          observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              markerElement.classList.add("is-arriving");
              map.flyTo({ center: destination, zoom: 17.1, pitch: 62, bearing: -28, duration: 6200, curve: 1.35, essential: true });
            } else {
              markerElement.classList.remove("is-arriving");
              map.stop();
              map.jumpTo({ center: [-77.58, 38.77], zoom: 10.8, pitch: 18, bearing: 12 });
            }
          }, { threshold: .28, rootMargin: "-7% 0px -7% 0px" });
          observer.observe(stage);
        });
      } catch {
        mapCanvasRef.current?.classList.add("map-unavailable");
      }
    };

    createMap();
    return () => {
      disposed = true;
      observer?.disconnect();
      marker?.remove();
      map?.remove();
    };
  }, []);

  return (
    <section className="contact-experience" ref={sectionRef} aria-label="Contact Magnoliya Grand">
      <div className="contact-experience__glow" aria-hidden="true" />

      <header className="contact-experience__header">
        <p className="contact-experience__eyebrow"><span /> {content.eyebrow || "Private event concierge"}</p>
        <h2 aria-label="Every unforgettable event starts with hello.">
          {headline.map((word, index) => (
            <span className={word === "unforgettable" || word === "hello." ? "accent" : ""} key={word}>
              <i style={{ "--word-delay": `${index * 90}ms` }}>{word}</i>
            </span>
          ))}
        </h2>
        <p className="contact-experience__intro">
          {content.intro || "Share your date, guest count, and vision. Our events team will shape the right space, flow, and next step around your occasion."}
        </p>
      </header>

      <div className="contact-experience__body">
        <article className="contact-concierge">
          <div className="contact-concierge__top">
            <span>{content.conversationLabel || "Start a conversation"}</span>
            <i aria-hidden="true">MG</i>
          </div>

          <a className="contact-concierge__link" href={siteSettings.contact.phoneHref}>
            <small>{content.phoneLabel || "Call the events team"}</small>
            <strong>{siteSettings.contact.phone}</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="contact-concierge__link" href={siteSettings.contact.emailHref}>
            <small>{content.emailLabel || "Send your vision"}</small>
            <strong>{siteSettings.contact.email}</strong>
            <span aria-hidden="true">↗</span>
          </a>

          <div className="contact-concierge__address">
            <small>{content.addressLabel || "Visit Magnoliya Grand"}</small>
            <p>{siteSettings.contact.street}<br />{siteSettings.contact.city}</p>
            <span>{content.distanceLabel || "Minutes from Dulles Airport"}</span>
          </div>

          <div className="contact-concierge__actions">
            <a className="button button-gold" href={bookingUrl} target="_blank" rel="noreferrer">{content.requestLabel || "Request your date"} ↗</a>
            <a className="contact-direction-link" href={siteSettings.contact.directions} target="_blank" rel="noreferrer">{content.directionsLabel || "Get directions"} <span>↗</span></a>
          </div>
        </article>

        <div className="contact-map-stage">
          <div ref={mapCanvasRef} className="contact-map-canvas" aria-label="Interactive satellite map flying to Magnoliya Grand in Manassas, Virginia" />
          <div className="contact-map-vignette" aria-hidden="true" />
          <div className="contact-map-details">
            <small>{content.mapLabel || "Live satellite destination"}</small>
            <strong>{content.mapName || "Magnoliya Grand"}</strong>
            <span>{content.coordinates || "38.80515° N · 77.51532° W"}</span>
          </div>
          <a className="contact-map-open" href={siteSettings.contact.directions} target="_blank" rel="noreferrer">
            {content.mapLinkLabel || "Open live map"} <span>↗</span>
          </a>
        </div>
      </div>

      <section className="contact-inquiry" ref={inquiryRef} aria-labelledby="contact-inquiry-title">
        <div className="contact-inquiry__intro">
          <p className="section-kicker">{content.formKicker || "Begin your event"}</p>
          <h3 id="contact-inquiry-title">{content.formTitle || "Tell us what"}<br /><em>{content.formAccent || "you are imagining."}</em></h3>
          <p>{content.formIntro || "Share the essentials and our events team will follow up with availability, thoughtful recommendations, and the next steps for a private tour."}</p>
          <div className="contact-inquiry__promise">
            <span>{content.responseLabel || "Personal response"}</span>
            <strong>{content.responseValue || "Typically within 24 hours"}</strong>
          </div>
        </div>

        <form className="contact-inquiry__form" onSubmit={submitInquiry} noValidate>
          <div className="inquiry-field">
            <label htmlFor="inquiry-name">Your name <span>*</span></label>
            <input id="inquiry-name" name="name" type="text" autoComplete="name" maxLength="100" required />
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-email">Email address <span>*</span></label>
            <input id="inquiry-email" name="email" type="email" autoComplete="email" maxLength="180" required />
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-phone">Phone number <span>*</span></label>
            <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength="40" required />
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-event-type">Event type <span>*</span></label>
            <select id="inquiry-event-type" name="eventType" defaultValue="" required>
              <option value="" disabled>Select your occasion</option>
              <option>Wedding &amp; Reception</option>
              <option>Conferences &amp; Corporate</option>
              <option>Meeting &amp; Seminar</option>
              <option>Gala &amp; Fundraiser</option>
              <option>Cultural &amp; Music Concert</option>
              <option>Trade Show &amp; Expo</option>
              <option>Milestone Celebration</option>
              <option>Other Event</option>
            </select>
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-date">Preferred date <span>*</span></label>
            <input id="inquiry-date" name="date" type="date" required />
          </div>
          <div className="inquiry-field">
            <label htmlFor="inquiry-guests">Estimated guests <span>*</span></label>
            <input id="inquiry-guests" name="guestCount" type="number" inputMode="numeric" min="1" max="5000" required />
          </div>
          <div className="inquiry-field inquiry-field--wide">
            <label htmlFor="inquiry-message">Tell us about your vision <span>*</span></label>
            <textarea id="inquiry-message" name="message" rows="5" maxLength="3000" required />
          </div>
          <div className="inquiry-honey" aria-hidden="true">
            <label htmlFor="inquiry-company">Company website</label>
            <input id="inquiry-company" name="companyWebsite" type="text" tabIndex="-1" autoComplete="off" />
          </div>
          <div className="contact-inquiry__submit inquiry-field--wide">
            <button className="button button-gold" type="submit" disabled={formStatus.state === "sending"}>
              {formStatus.state === "sending" ? "Sending…" : (content.submitLabel || "Send your inquiry")} <span aria-hidden="true">↗</span>
            </button>
            <p className={`contact-inquiry__status is-${formStatus.state}`} role="status" aria-live="polite">{formStatus.message}</p>
          </div>
        </form>
      </section>

      <div className="contact-journey" aria-label="Planning journey">
        {(content.journey || [["Imagine", "Tell us the occasion, date, and atmosphere you have in mind."], ["Visit", "Walk the venue with a specialist and explore the right setting."], ["Celebrate", "Bring your gathering to life with a team focused on every detail."]]).map(([title, body]) => <div key={title}><span>{title}</span><p>{body}</p></div>)}
      </div>
    </section>
  );
}
