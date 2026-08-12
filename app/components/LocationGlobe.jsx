"use client";

import { useEffect, useRef, useState } from "react";

const VENUE_COORDINATES = [-77.5153225, 38.8051458];
const EARTH_VIEW = [-18, 18];
const SATELLITE_GLOBE_STYLE = {
  version: 8,
  projection: { type: "globe" },
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    },
  },
  layers: [
    {
      id: "space",
      type: "background",
      paint: { "background-color": "#02070b" },
    },
    {
      id: "satellite-earth",
      type: "raster",
      source: "satellite",
      paint: {
        "raster-saturation": 0.14,
        "raster-contrast": 0.08,
        "raster-brightness-min": 0.03,
        "raster-brightness-max": 0.98,
        "raster-fade-duration": 650,
      },
    },
  ],
  sky: {
    "atmosphere-blend": ["interpolate", ["linear"], ["zoom"], 0, 1, 5, 1, 7, 0],
  },
  light: {
    anchor: "map",
    position: [1.5, 90, 80],
  },
};

export default function LocationGlobe() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const playFlightRef = useRef(() => {});
  const [status, setStatus] = useState("Preparing the globe");
  const [flightKey, setFlightKey] = useState(0);

  useEffect(() => {
    let disposed = false;
    let observer;
    let marker;
    let markerElement;
    let timers = [];

    const clearFlightTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const createGlobe = async () => {
      try {
        const maplibreModule = await import("maplibre-gl");
        if (disposed || !mapContainerRef.current) return;

        const maplibregl = maplibreModule.default || maplibreModule;
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: SATELLITE_GLOBE_STYLE,
          center: EARTH_VIEW,
          zoom: 0.35,
          pitch: 0,
          bearing: -18,
          minZoom: 0,
          maxZoom: 18,
          antialias: true,
          attributionControl: false,
          renderWorldCopies: false,
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

        markerElement = document.createElement("div");
        markerElement.className = "globe-venue-marker";
        const markerHalo = document.createElement("span");
        markerHalo.className = "globe-marker-halo";
        const markerPin = document.createElement("span");
        markerPin.className = "globe-marker-pin";
        markerPin.textContent = "MG";
        const markerLabel = document.createElement("span");
        markerLabel.className = "globe-marker-label";
        markerLabel.textContent = "Magnoliya Grand";
        markerElement.append(markerHalo, markerPin, markerLabel);

        marker = new maplibregl.Marker({ element: markerElement, anchor: "bottom" })
          .setLngLat(VENUE_COORDINATES)
          .addTo(map);

        const resetToEarth = () => {
          clearFlightTimers();
          map.stop();
          markerElement?.classList.remove("is-visible");
          map.jumpTo({ center: EARTH_VIEW, zoom: 0.35, pitch: 0, bearing: -18 });
          setStatus("Earth view");
        };

        const playFlight = () => {
          if (!map.loaded()) return;
          clearFlightTimers();
          map.stop();
          markerElement?.classList.remove("is-visible");
          map.jumpTo({ center: EARTH_VIEW, zoom: 0.35, pitch: 0, bearing: -18 });
          map.resize();
          setFlightKey((value) => value + 1);
          setStatus("Earth view");

          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reducedMotion) {
            map.jumpTo({ center: VENUE_COORDINATES, zoom: 14.8, pitch: 52, bearing: -24 });
            markerElement?.classList.add("is-visible");
            setStatus("Magnoliya Grand");
            return;
          }

          timers.push(window.setTimeout(() => {
            setStatus("Flying to Northern Virginia");
            map.flyTo({
              center: VENUE_COORDINATES,
              zoom: 14.8,
              pitch: 56,
              bearing: -24,
              duration: 8500,
              curve: 1.45,
              essential: true,
            });
          }, 650));

          timers.push(window.setTimeout(() => setStatus("Approaching Manassas"), 6100));
          timers.push(window.setTimeout(() => {
            markerElement?.classList.add("is-visible");
            setStatus("Magnoliya Grand");
          }, 9200));
        };

        playFlightRef.current = playFlight;

        map.on("style.load", () => {
          map.setProjection({ type: "globe" });
        });

        map.on("load", () => {
          if (disposed) return;
          setStatus("Earth view");
          const section = mapContainerRef.current?.closest(".location");
          if (!section) return;
          observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) playFlight();
            else resetToEarth();
          }, { threshold: 0.36, rootMargin: "-5% 0px -5% 0px" });
          observer.observe(section);
        });

        map.on("error", () => {
          if (!disposed) setStatus("Globe connection unavailable");
        });
      } catch {
        if (!disposed) setStatus("Globe connection unavailable");
      }
    };

    createGlobe();

    return () => {
      disposed = true;
      clearFlightTimers();
      observer?.disconnect();
      marker?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="location-map location-globe" aria-label="Interactive globe flying to Magnoliya Grand in Manassas, Virginia">
      <div ref={mapContainerRef} className="location-globe-canvas" />
      <div className="globe-vignette" aria-hidden="true" />
      <div className="globe-journey" aria-live="polite">
        <span>Live destination journey</span>
        <strong>{status}</strong>
        <div className="globe-progress" aria-hidden="true"><i key={flightKey} /></div>
      </div>
      <div className="globe-coordinates">
        <span>Exact destination</span>
        <strong>38.80515° N · 77.51532° W</strong>
      </div>
      <button className="globe-replay" type="button" onClick={() => playFlightRef.current()}>
        Replay journey <span aria-hidden="true">↻</span>
      </button>
    </div>
  );
}
