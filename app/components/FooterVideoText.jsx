"use client";

import { useEffect, useRef } from "react";

export default function FooterVideoText() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frameId = 0;
    let stopped = false;

    const playVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.play().catch(() => {});
    };

    const draw = () => {
      if (stopped) return;
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * pixelRatio));
      const height = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.clearRect(0, 0, width, height);

      if (video.readyState >= 2 && video.videoWidth && video.videoHeight) {
        const coverScale = Math.max(width / video.videoWidth, height / video.videoHeight);
        const drawWidth = video.videoWidth * coverScale;
        const drawHeight = video.videoHeight * coverScale;
        context.drawImage(video, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);

        context.globalCompositeOperation = "destination-in";
        let fontSize = height * 0.76;
        context.font = `400 ${fontSize}px Georgia, "Times New Roman", serif`;
        const measuredWidth = context.measureText("MAGNOLIYA").width;
        if (measuredWidth > width * 0.94) fontSize *= (width * 0.94) / measuredWidth;

        context.font = `400 ${fontSize}px Georgia, "Times New Roman", serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#fff";
        context.fillText("MAGNOLIYA", width / 2, height * 0.52);
        context.globalCompositeOperation = "source-over";

        context.strokeStyle = "rgba(231,197,132,.58)";
        context.lineWidth = Math.max(1, pixelRatio * 0.65);
        context.strokeText("MAGNOLIYA", width / 2, height * 0.52);
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const resume = () => {
      if (document.visibilityState === "visible") playVideo();
    };

    video.addEventListener("loadeddata", playVideo);
    window.addEventListener("pageshow", playVideo);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("touchstart", playVideo, { once: true, passive: true });
    window.addEventListener("pointerdown", playVideo, { once: true, passive: true });

    playVideo();
    frameId = window.requestAnimationFrame(draw);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frameId);
      video.removeEventListener("loadeddata", playVideo);
      window.removeEventListener("pageshow", playVideo);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("pointerdown", playVideo);
    };
  }, []);

  return (
    <div className="footer-watermark footer-video-text" aria-hidden="true">
      <canvas ref={canvasRef} className="footer-video-canvas" />
      <video
        ref={videoRef}
        className="footer-video-source"
        src="/home-assets/magnoliya-hero.mp4?v=20260806-audio"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
}
