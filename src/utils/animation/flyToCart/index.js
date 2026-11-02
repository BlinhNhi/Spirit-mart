export function flyToCart(sourceEl, imgSrc, targetSelector = "[data-cart-target]") {
  const target = document.querySelector(targetSelector);
  if (!sourceEl || !target || !imgSrc) return;

  // người dùng bật "giảm chuyển động" thì bỏ qua hiệu ứng bay
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const s = sourceEl.getBoundingClientRect();
  const t = target.getBoundingClientRect();

  const size = Math.min(s.width, s.height, 200);
  const startX = s.left + s.width / 2;
  const startY = s.top + s.height / 2;

  // nếu Header đã cuộn khỏi màn hình thì bay tới mép trên của màn hình
  const endX = t.left + t.width / 2;
  const endY = Math.max(t.top + t.height / 2, 24);

  const dx = endX - startX;
  const dy = endY - startY;

  const fly = document.createElement("img");
  fly.src = imgSrc;
  Object.assign(fly.style, {
    position: "fixed",
    left: `${startX - size / 2}px`,
    top: `${startY - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: "cover",
    borderRadius: "16px",
    border: "3px solid #fb923c",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    zIndex: "9999",
    pointerEvents: "none",
  });
  document.body.appendChild(fly);

  const anim = fly.animate(
    [
      { transform: "translate(0px, 0px) scale(1)", opacity: 1, borderRadius: "16px" },
      {
        // điểm giữa nhô lên để tạo đường cong
        transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(0.6)`,
        opacity: 1,
        offset: 0.5,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(0.08)`,
        opacity: 0.3,
        borderRadius: "50%",
      },
    ],
    { duration: 850, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  );

  anim.onfinish = () => {
    fly.remove();
    // icon giỏ hàng nảy lên
    target.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(1.3) rotate(-12deg)", offset: 0.4 },
        { transform: "scale(0.95) rotate(6deg)", offset: 0.7 },
        { transform: "scale(1) rotate(0deg)" },
      ],
      { duration: 450, easing: "ease-out" },
    );
  };
}