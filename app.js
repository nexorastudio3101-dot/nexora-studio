function courseCard(c){
  return `<article class="card">
    <a href="course.html?slug=${c.slug}">
      <img src="${c.image}" alt="${c.title}">
      <div class="card-body">
        <div class="eyebrow">${c.category}</div>
        <h3>${c.title}</h3>
        <div class="desc">${c.shortDescription}</div>
        <div class="card-meta"><span>${c.level}</span><span>•</span><span>${c.duration}</span></div>
        <div class="card-bottom"><span class="price">${c.price}</span><span class="view">VIEW ↗</span></div>
      </div>
    </a>
  </article>`;
}
function renderHome(){
  const el=document.getElementById("featured"); if(!el)return;
  el.innerHTML=courses.slice(0,3).map(courseCard).join("");
}
function renderCourses(){
  const grid=document.getElementById("all-courses"); const filters=document.getElementById("filters"); if(!grid)return;
  const cats=["ALL",...new Set(courses.map(c=>c.category))];
  filters.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
  const draw=cat=>{grid.innerHTML=courses.filter(c=>cat==="ALL"||c.category===cat).map(courseCard).join("")};
  draw("ALL");
  filters.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{filters.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");draw(b.dataset.cat)}));
}
function renderCourse(){
  const root=document.getElementById("course-page"); if(!root)return;
  const slug=new URLSearchParams(location.search).get("slug")||courses[0].slug;
  const c=courses.find(x=>x.slug===slug)||courses[0];
  document.title=`${c.title} — NEXORA Studio`;
  const purchase=c.purchaseLink
    ? `<a class="btn primary" href="${c.purchaseLink}" target="_blank" rel="noreferrer">BUY NOW ↗</a>`
    : `<button class="btn primary notify-trigger" type="button">NOTIFY ME WHEN IT OPENS ↗</button>`;
  root.innerHTML=`
  <a class="link-lime" href="courses.html">← ALL COURSES</a>
  <div class="course-hero" style="margin-top:32px">
    <div class="course-title">
      <div class="eyebrow">${c.category}</div>
      <h1>${c.title}</h1>
      <div class="course-subtitle">${c.shortDescription}</div>
      <div class="course-facts">
        <div class="fact"><div class="label">Level</div><div class="value">${c.level}</div></div>
        <div class="fact"><div class="label">Duration</div><div class="value">${c.duration}</div></div>
        <div class="fact"><div class="label">Access</div><div class="value">${c.access}</div></div>
      </div>
    </div>
    <aside class="purchase">
      <img src="${c.image}" alt="${c.title}">
      <div class="purchase-inner">
        <div class="purchase-price">${c.price}<span>ONE-TIME</span></div>
        ${purchase}
        <div class="benefits">
          <div class="benefit">Instant access after purchase</div>
          <div class="benefit">Watch at your own pace, on any device</div>
        </div>
        <p class="purchase-note">Checkout is handled by our external course platform — card details are never stored on this site. Questions? <a href="mailto:nexora.studio310@gmail.com">Email us.</a></p>
      </div>
    </aside>
  </div>
  <div class="course-content">
    <section class="block about-block"><h2>ABOUT THIS COURSE</h2><p>${c.description}</p></section>
    <div class="course-info-grid">
      <section class="block"><h2>WHAT YOU'LL LEARN</h2><ul class="checklist">${c.learn.map(x=>`<li>${x}</li>`).join("")}</ul></section>
      <section class="block"><h2>WHO THIS IS FOR</h2><ul class="plain-list">${c.who.map(x=>`<li>${x}</li>`).join("")}</ul></section>
      <section class="block"><h2>WHAT YOU NEED</h2><ul class="plain-list">${c.needs.map(x=>`<li>${x}</li>`).join("")}</ul></section>
      <section class="block"><h2>TAUGHT BY</h2><h3>NEXORA Studio</h3><p>A digital media and education studio covering artificial intelligence, AI agents, productivity, careers and digital skills — for curious people without a technical background.</p></section>
    </div>
    <section class="block curriculum"><h2>CURRICULUM</h2>${c.curriculum.map((m,i)=>`<div class="module"><div class="module-title">${String(i+1).padStart(2,"0")} — ${m.title}</div><ul>${m.lessons.map(l=>`<li>${l}</li>`).join("")}</ul></div>`).join("")}</section>
    <section class="block faq"><h2>FAQ</h2>${c.faq.map((f,i)=>`<div class="faq-item"><button type="button"><span>${f[0]}</span><span class="plus">+</span></button><div class="answer">${f[1]}</div></div>`).join("")}</section>
    <section class="block more-courses"><div class="section-head"><h2>MORE COURSES</h2><a class="link-lime" href="courses.html">ALL COURSES ↗</a></div><div class="course-grid">${courses.filter(x=>x.slug!==c.slug).slice(0,3).map(courseCard).join("")}</div></section>
  </div>`;
  document.querySelectorAll(".faq-item button").forEach(btn=>btn.addEventListener("click",()=>btn.parentElement.classList.toggle("open")));
  document.querySelectorAll(".notify-trigger").forEach(btn=>btn.addEventListener("click",()=>document.getElementById("notify-modal").classList.add("open")));
  const close=document.getElementById("close-modal"); if(close)close.addEventListener("click",()=>document.getElementById("notify-modal").classList.remove("open"));
  const form=document.getElementById("notify-form"); if(form)form.addEventListener("submit",e=>{
    e.preventDefault(); localStorage.setItem("nexora-notify-"+c.slug,document.getElementById("notify-email").value);
    alert("Thanks — your email has been saved for this course in this prototype.");
    document.getElementById("notify-modal").classList.remove("open");
  });
}
renderHome();renderCourses();renderCourse();