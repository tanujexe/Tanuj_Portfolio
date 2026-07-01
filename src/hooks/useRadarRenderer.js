import { useEffect } from "react";

export default function useRadarRenderer(canvasRef, isBooted) {
  useEffect(() => {
    if (!isBooted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 300;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const carPoints = [
      { x: -70, y: 15 },  { x: -68, y: 5 },   { x: -55, y: -2 },
      { x: -38, y: -12 }, { x: -20, y: -20 }, { x: 5, y: -20 },
      { x: 25, y: -12 },  { x: 38, y: -6 },   { x: 55, y: 2 },
      { x: 70, y: 8 },    { x: 73, y: 15 },   { x: 65, y: 17 },
      { x: 52, y: 17 },   { x: 48, y: 11 },   { x: 38, y: 11 },
      { x: 34, y: 17 },   { x: -25, y: 17 },  { x: -29, y: 11 },
      { x: -39, y: 11 },  { x: -43, y: 17 },  { x: -70, y: 17 }
    ];

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.8;

      angle += 0.015;
      
      ctx.strokeStyle = "rgba(255, 45, 45, 0.08)";
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 45, 45, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius
      );
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      const scaleX = Math.cos(angle * 0.5) * 1.5;
      const scaleY = 1.5;
      ctx.scale(scaleX, scaleY);

      ctx.shadowColor = "rgba(255, 45, 45, 0.4)";
      ctx.shadowBlur = 12;

      ctx.strokeStyle = "#FF2D2D";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      carPoints.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "rgba(234, 234, 234, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(-36, 11, 5, 0, Math.PI * 2);
      ctx.arc(43, 11, 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(234, 234, 234, 0.35)";
      ctx.font = "8px Courier New";
      ctx.fillText(`ROT_Y: ${(angle % (Math.PI * 2)).toFixed(2)} rad`, 20, 30);
      ctx.fillText(`SCALE_3D: [${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}]`, 20, 42);
      ctx.fillText(`VECTOR_NODES: ${carPoints.length}`, 20, 54);
      ctx.fillText(`RENDER_Hz: 240.0`, canvas.width - 100, 30);
      ctx.fillText(`SYS_STATUS: MDM_STABLE`, canvas.width - 120, 42);

      animationId = requestAnimationFrame(drawRadar);
    };
    drawRadar();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isBooted, canvasRef]);
}
