const app = document.querySelector('#app');
const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const br = value => escapeHtml(value).replace(/\n/g, '<br>');
const imageGrid = (images = []) => `<div class="media-grid ${images.length === 1 ? 'one' : images.length === 2 ? 'two' : 'three'}">${images.map(image => `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}">`).join('')}</div>`;
const nav = profile => `<header class="wrap nav"><div class="brand">${escapeHtml(profile.name)} · ${escapeHtml(profile.role)}</div><nav class="nav-links"><a href="index.html">个人介绍</a><a href="cases.html">真实案例</a></nav></header>`;
const footer = () => `<footer class="footer">课程顾问面试个人介绍材料 · 内容可由管理后台更新</footer>`;

function renderHome(data) {
  const { profile, achievements, cases, services } = data;
  app.innerHTML = `${nav(profile)}
  <main>
    <section class="hero"><div class="wrap hero-grid"><div><div class="eyebrow">${escapeHtml(profile.eyebrow)}</div><h1>${br(profile.headline)}</h1><p class="intro">${escapeHtml(profile.intro)}</p><div class="actions"><a class="button primary" href="cases.html">查看真实案例</a><a class="button secondary" href="#service">了解服务方式</a></div></div><aside class="statement"><div class="eyebrow" style="color:#f4c96f">我的求职表达</div><p>“${escapeHtml(profile.statement)}”</p><small>长期践行者 · 销售服务者 · 教练式陪伴者</small></aside></div></section>
    <section class="section alt"><div class="wrap"><div class="section-head"><div class="eyebrow">能力组合</div><h2>懂理念，会服务，<br>也能陪伴改变发生</h2><p class="intro">三段长期实践彼此支撑：我懂学员的语言，也有客户经营与成交能力；我能够建立信任，更能用教练式对话支持改变持续发生。</p></div><div class="achievement-grid">${achievements.map(item => `<article class="achievement"><div class="value">${escapeHtml(item.value)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join('')}</div></div></section>
    <section class="section"><div class="wrap framework"><div><div class="eyebrow">我的长期实践</div><h2>我正在搭建自己的<br>“高能人生”体系</h2><p>这些年践行让我越来越确定：效率不是把事情塞得更多，而是拥有稳定的能量、清醒的选择与持续的行动。我会从环境与身体打底，经过情绪与思维的整理，最终回到真正想要的人生方向。</p><p>这是一套个人实践框架，不是标准答案；它帮助我更完整地理解自己，也更尊重每一位学员当下真实的处境。</p></div><div><div class="pyramid"><div class="level" style="--w:48%;--a:#985a33;--b:#bc7545"><b>愿力</b><span>使命 · 愿景 · 价值观 · 目标</span></div><div class="level" style="--w:62%;--a:#ba6d50;--b:#d59074"><b>脑力</b><span>信念 · 注意力 · 思维模式</span></div><div class="level" style="--w:76%;--a:#c77a64;--b:#dfa28e"><b>心力</b><span>情绪 · 压力 · 内在卡点</span></div><div class="level" style="--w:90%;--a:#d7a16d;--b:#e8bf91"><b>体力</b><span>睡眠 · 饮食 · 运动 · 呼吸</span></div><div class="level" style="--w:100%;--a:#a46d37;--b:#c98e4f"><b>场力</b><span>空间 · 自然 · 信息 · 社交环境</span></div></div><p class="fine-print">“高能人生能量金字塔”为个人实践框架。</p></div></div></section>
    <section class="section alt"><div class="wrap"><div class="section-head"><div class="eyebrow">已经发生的改变</div><h2>不是口号，是我走过的路</h2></div><div class="case-preview">${cases.map(item => `<article class="preview"><img src="${escapeHtml(item.images[0]?.src)}" alt="${escapeHtml(item.images[0]?.alt)}"><div><span class="eyebrow">${escapeHtml(item.kicker)}</span><h3>${br(item.title)}</h3><p>${escapeHtml(item.stat)} · ${escapeHtml(item.statNote)}</p></div></article>`).join('')}</div><div class="actions"><a class="button primary" href="cases.html">查看三段完整案例</a></div></div></section>
    <section class="section" id="service"><div class="wrap"><div class="section-head"><div class="eyebrow">我的服务方式</div><h2>先看见一个人，<br>再帮助他走下一步</h2><p class="intro">面对学员，我会把销售的结果导向与教练的尊重、好奇放在一起：既不回避目标，也不忽略人当下的状态。</p></div><div class="service-grid">${services.map((item, index) => `<article class="service"><div class="service-no">0${index + 1}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join('')}</div></div></section>
    <section class="closing"><div class="wrap"><div class="eyebrow" style="color:#f4c96f">A LONG-TERM PARTNER</div><h2>我期待加入一群持续成长的人，<br>一起把有价值的改变带给更多人。</h2><p>我愿意以长期践行者的真实感受、销售服务者的责任感，以及教练学习者的陪伴能力，服务每一位走进易效能的学员。</p></div></section>
  </main>${footer()}`;
}

function renderCases(data) {
  const { profile, cases } = data;
  app.innerHTML = `${nav(profile)}<main><section class="hero"><div class="wrap"><div class="eyebrow">REAL STORIES · PROOF OF PRACTICE</div><h1>真实的改变，<br>才是最好的介绍</h1><p class="intro" style="max-width:700px">我不把经历写成一串头衔，而是把那些已经发生的变化留下来：自己的生活、伙伴的反馈、以及在销售与服务中磨出来的能力。</p></div></section><section class="section alt"><div class="wrap"><div class="case-list">${cases.map((item, index) => `<article class="case"><div class="case-copy"><span class="case-kicker">${escapeHtml(item.kicker)}</span><h2>${br(item.title)}</h2><p>${escapeHtml(item.summary)}</p>${item.stat ? `<div class="case-stat"><b>${escapeHtml(item.stat)}</b><span>${escapeHtml(item.statNote)}</span></div>` : ''}${item.quote ? `<p class="quote">“${escapeHtml(item.quote)}”</p>` : ''}<p>${escapeHtml(item.detail)}</p>${item.privacyNote ? `<p class="privacy">${escapeHtml(item.privacyNote)}</p>` : ''}</div><figure class="case-media">${imageGrid(item.images)}<figcaption class="case-caption">案例 ${String(index + 1).padStart(2, '0')} · 真实记录</figcaption></figure></article>`).join('')}</div></div></section><section class="closing"><div class="wrap"><h2>真正的陪伴，<br>是支持一个人看见自己的力量。</h2></div></section></main>${footer()}`;
}

const loadContent = async () => {
  const apiResponse = await fetch('/api/content').catch(() => null);
  if (apiResponse?.ok) return apiResponse.json();
  const staticResponse = await fetch('site-content.json');
  if (!staticResponse.ok) throw new Error('内容暂时无法加载');
  return staticResponse.json();
};

loadContent().then(data => document.body.dataset.page === 'cases' ? renderCases(data) : renderHome(data)).catch(() => { app.innerHTML = '<div class="wrap" style="padding:80px 0">内容暂时无法加载，请稍后再试。</div>'; });
