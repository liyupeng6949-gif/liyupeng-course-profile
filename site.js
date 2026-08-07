(async () => {
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const lines = value => escapeHtml(value).replace(/\n/g, '<br>');
  const getContent = async () => {
    const api = await fetch('/api/content').catch(() => null);
    if (api?.ok) return api.json();
    const staticFile = await fetch('site-content.json');
    return staticFile.json();
  };
  const data = await getContent();
  const achievementHtml = data.achievements.map(item => `<div class="number"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.description)}</span></div>`).join('');
  const caseHtml = data.cases.map((item, index) => {
    const images = item.images.map((src, imageIndex) => `<img src="${escapeHtml(src)}" alt="案例${index + 1}图片${imageIndex + 1}">`).join('');
    return `<article class="case"><div><div class="eyebrow">${escapeHtml(item.eyebrow)}</div><h3>${lines(item.title)}</h3><p>${escapeHtml(item.intro)}</p><strong class="result">${escapeHtml(item.result)}</strong><span class="result-note">${escapeHtml(item.resultNote)}</span><p>${escapeHtml(item.detail)}</p></div><div class="gallery ${item.images.length === 2 ? 'two' : 'three'}">${images}</div></article>`;
  }).join('');
  const benefitHtml = data.benefits.map((item, index) => `<div class="fit-card"><b>0${index + 1}</b><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join('');
  const whyJoinHtml = (data.profile.whyJoinItems || []).map((item, index) => `<div class="why-card"><b>0${index + 1}</b><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join('');
  document.title = `${data.profile.name}｜易效能课程顾问候选人`;
  document.getElementById('app').innerHTML = `
    <header class="hero"><div class="wrap"><nav class="nav"><div class="brand">${escapeHtml(data.profile.name)} · 个人介绍</div><a href="#cases">查看真实案例 ↓</a></nav><div class="tag">${escapeHtml(data.profile.eyebrow)}</div><h1>${lines(data.profile.headline)}</h1><p>${escapeHtml(data.profile.intro)}</p><div class="identity"><span>2016 年起易效能践行</span><span>10 年销售与客户经营</span><span>500+ 人次一对一咨询</span></div></div></header>
    <main><section class="wrap"><div class="eyebrow">ABOUT ME</div><h2>${lines(data.profile.aboutTitle)}</h2><p class="lead">从 2016 年接触易效能开始，我把计划、复盘、习惯和自我觉察放进生活。它帮助我改善身体状态，也让我更理解：真正可持续的改变，不是靠一时用力，而是找到适合自己的行动方式。</p><div class="numbers">${achievementHtml}</div></section>
    <section class="statement"><div class="wrap statement-grid"><div><div class="eyebrow">MY BELIEF</div><h2>${lines(data.profile.belief)}</h2><p class="lead">${escapeHtml(data.profile.beliefDetail)}</p></div><div class="quote">“成长不是把答案交给别人，而是陪他重新看见：自己原本就拥有改变的力量。”</div></div></section>
    <section class="wrap" id="cases"><div class="eyebrow">REAL STORIES</div><h2>三段真实经历，<br>是我服务学员的底气。</h2>${caseHtml}</section>
    <section class="why-join"><div class="wrap"><div class="eyebrow">WHY YIXIAONENG</div><h2>${lines(data.profile.whyJoinTitle || '为什么现在想要加入易效能？')}</h2><p class="lead">${escapeHtml(data.profile.whyJoinIntro || '')}</p><div class="why-list">${whyJoinHtml}</div><p class="why-closing">${escapeHtml(data.profile.whyJoinClosing || '')}</p></div></section>
    <section class="fit"><div class="wrap"><div class="eyebrow">WHAT I CAN BRING</div><h2>我希望为易效能学员带来什么</h2><p class="lead">长期践行者的真实感受、销售服务者的责任心，以及教练学习者的陪伴能力。</p><div class="fit-list">${benefitHtml}</div></div></section>
    <section class="closing wrap"><div class="eyebrow">A LONG-TERM PARTNER</div><h2>${lines(data.profile.closingTitle)}</h2><p>${escapeHtml(data.profile.closingText)}</p></section></main><footer>${escapeHtml(data.profile.name)} · 易效能课程顾问候选人个人介绍</footer>`;
})().catch(() => { document.getElementById('app').innerHTML = '<p style="padding:40px">页面加载失败，请刷新后重试。</p>'; });
