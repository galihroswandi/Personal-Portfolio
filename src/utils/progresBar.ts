export const progresBar = () => {
  const fix = scrollY;
  const heading = document.querySelector("header.heading");
  if (fix >= 500) {
    const headingAfter = document.createElement("div");
    headingAfter.id = "heading-after";
    headingAfter.style.content = "";
    headingAfter.style.position = "absolute";
    headingAfter.style.left = "0";
    headingAfter.style.bottom = "0";
    headingAfter.style.width = "0";
    headingAfter.style.height = "2px";
    headingAfter.style.backgroundColor = "#1e293b";
    headingAfter.style.transition = "width .5s ease-in-out";
    heading?.appendChild(headingAfter);

    setTimeout(() => {
      headingAfter.style.width = "100%";
    }, 100);
  } else if (fix < 500) {
    const heading_after = document.getElementById("heading-after");
    heading_after?.remove();
  }
};
