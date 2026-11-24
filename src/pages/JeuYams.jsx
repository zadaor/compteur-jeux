import { useEffect, useRef } from 'react';

export default function JeuYams() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Données
    const N = {u1:"Les 1",u2:"Les 2",u3:"Les 3",u4:"Les 4",u5:"Les 5",u6:"Les 6",br:"Brelan",ca:"Carré",fu:"Full",ps:"P. suite",gs:"G. suite",ya:"Yams",ch:"Chance"};
    const FIX = {fu:25,ps:30,gs:40,ya:50};
    const SUM = {br:1,ca:1,ch:1};
    const ORD = [["u1","u2","u3","u4"],["u5","u6","H","B"],["br","ca","fu","ps"],["gs","ya","ch","L"]];
    const LOWK = ["br","ca","fu","ps","gs","ya","ch"];
    
    let S = {players:[{n:"Joueur 1",s:{}},{n:"Joueur 2",s:{}},{n:"Joueur 3",s:{}}],view:[0,1],next:0};

    // Charger depuis localStorage
    try {
      const raw = localStorage.getItem("yams-v1");
      if (raw) {
        const o = JSON.parse(raw);
        if (o && o.players && o.players.length) {
          S = o;
        }
      }
    } catch (e) {}

    function save() {
      try { localStorage.setItem("yams-v1", JSON.stringify(S)); } catch (e) {}
    }

    function esc(t) {
      return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
    }

    function tot(p) {
      let u = 0, l = 0, i;
      for (i = 1; i <= 6; i++) u += +p.s["u" + i] || 0;
      LOWK.forEach(function(k) { l += +p.s[k] || 0; });
      const b = u >= 63 ? 35 : 0;
      return {u: u, b: b, l: l, t: u + b + l};
    }

    function tile(i, k, p, r) {
      if (k === "H") return '<div class="t s"><i>Haut</i><b>' + r.u + '/63</b></div>';
      if (k === "B") return '<div class="t s' + (r.b ? " ok" : "") + '"><i>Bonus</i><b>' + (r.b ? "+35" : "0") + '</b></div>';
      if (k === "L") return '<div class="t s ok"><i>Total</i><b>' + r.t + '</b></div>';
      const v = p.s[k];
      const c = "t" + (v == null ? " e" : (v === 0 ? " z" : " h"));
      return '<button class="' + c + '" data-p="' + i + '" data-k="' + k + '" aria-label="' + N[k] + ', ' + (v == null ? "vide" : v + " points") + '"><i>' + N[k] + '</i><b>' + (v == null ? "–" : v) + '</b></button>';
    }

    function panel(i, slot, max) {
      const p = S.players[i];
      const r = tot(p);
      let h = '<div class="panel p' + slot + '"><div class="hd"><input class="nm" data-p="' + i + '" maxlength="12" value="' + esc(p.n) + '" aria-label="Nom du joueur">';
      h += '<span class="lead' + (max > 0 && r.t === max ? " on" : "") + '">En tête</span><b class="tt">' + r.t + '</b>';
      if (S.players.length > 2) h += '<button class="x" data-del="' + i + '" aria-label="Supprimer ce joueur">×</button>';
      h += '</div><div class="tiles">';
      ORD.forEach(function(row) { row.forEach(function(k) { h += tile(i, k, p, r); }); });
      return h + '</div></div>';
    }

    function render() {
      let t = "";
      S.players.forEach(function(p, i) { 
        t += '<button class="tab" role="tab" aria-selected="false" data-tab="' + i + '"><span class="dot"></span>' + esc(p.n) + '</button>'; 
      });
      t += '<button class="tab add" data-add="1" aria-label="Ajouter un joueur">+</button>';
      container.querySelector('#tabs').innerHTML = t;

      let max = 0;
      S.players.forEach(function(p) { const x = tot(p).t; if (x > max) max = x; });

      const pe = container.querySelector('#panels');
      const st = pe.scrollTop;
      let g = "";
      S.players.forEach(function(p, i) { g += panel(i, i % 2, max); });
      g += '<button class="empty" data-add="1">+ Ajouter un joueur</button>';
      pe.innerHTML = g;
      pe.scrollTop = st;
      updateTabs();
    }

    function updateTabs() {
      const pe = container.querySelector('#panels');
      const c = pe.children[0];
      if (!c) return;
      const step = c.offsetHeight + 8;
      const f = Math.round(pe.scrollTop / step);
      container.querySelectorAll(".tab[data-tab]").forEach(function(b) {
        const s = +b.dataset.tab - f;
        const on = s === 0 || s === 1;
        b.className = "tab" + (on ? " on s" + s : "");
        b.setAttribute("aria-selected", on);
      });
    }

    function goTo(i) {
      const pe = container.querySelector('#panels');
      const c = pe.children[i];
      if (!c) return;
      pe.scrollTo({ 
        top: c.offsetTop, 
        behavior: window.matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" 
      });
    }

    let ov = container.querySelector('#ov');
    let sl = container.querySelector('#sl');
    let cur = null, dice = [], last = null;

    function closeSl() {
      ov.classList.remove("open");
      sl.classList.remove("open");
      if (last && container.contains(last)) last.focus();
    }

    function setV(v) {
      const p = S.players[cur.p];
      if (v == null) delete p.s[cur.k];
      else p.s[cur.k] = v;
      save();
      closeSl();
      render();
    }

    function sheetHtml() {
      const p = S.players[cur.p];
      const k = cur.k;
      const v = p.s[k];
      let h = '<div class="sh"><h2 id="slt">' + esc(p.n) + ' · ' + N[k] + '</h2><button class="x" data-close="1" aria-label="Fermer">×</button></div>';
      h += '<p class="sub">' + (v == null ? "Pas encore renseigné" : "Actuellement : " + v + " point" + (v > 1 ? "s" : "")) + '</p><div class="chips">';
      
      if (k[0] === "u") {
        const f = +k[1];
        for (let n = 0; n <= 5; n++) {
          h += '<button class="chip' + (v === n * f ? " sel" : "") + '" data-set="' + n * f + '">' + n + (n > 1 ? " dés" : " dé") + '<small>' + n * f + ' pts</small></button>';
        }
      } else if (FIX[k]) {
        h += '<button class="chip' + (v === FIX[k] ? " sel" : "") + '" data-set="' + FIX[k] + '">Réussi<small>' + FIX[k] + ' pts</small></button><button class="chip' + (v === 0 ? " sel" : "") + '" data-set="0">Barré<small>0 pt</small></button>';
      } else {
        const s = dice.reduce(function(a, b) { return a + b; }, 0);
        h += '</div><p class="sum">' + s + ' <span class="sub" style="font-size:12px">' + dice.length + '/5 dés – touche les faces</span></p><div class="chips">';
        dice.forEach(function(d, j) { h += '<button class="die" data-rm="' + j + '" aria-label="Retirer le dé ' + d + '">' + d + '</button>'; });
        h += '</div><div class="chips">';
        for (let d = 1; d <= 6; d++) h += '<button class="chip pk" data-die="' + d + '">' + d + '</button>';
      }
      h += '</div><div class="act">';
      if (SUM[k]) h += '<button class="ok" data-val="1">Valider</button>';
      h += '<button class="no" data-set="0">Barré</button><button data-clr="1">Effacer</button></div>';
      sl.innerHTML = h;
    }

    function openSl(pi, k, el) {
      cur = { p: pi, k: k };
      dice = [];
      last = el;
      sheetHtml();
      ov.classList.add("open");
      sl.classList.add("open");
      const c = sl.querySelector("[data-close]");
      if (c) c.focus();
    }

    // Event listeners
    sl.addEventListener("click", function(e) {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.close) return closeSl();
      if (b.dataset.set != null) return setV(+b.dataset.set);
      if (b.dataset.clr) return setV(null);
      if (b.dataset.die) {
        if (dice.length < 5) { dice.push(+b.dataset.die); sheetHtml(); }
        return;
      }
      if (b.dataset.rm != null) { dice.splice(+b.dataset.rm, 1); sheetHtml(); return; }
      if (b.dataset.val) { if (dice.length) return setV(dice.reduce(function(a, c) { return a + c; }, 0)); closeSl(); }
    });

    ov.addEventListener("click", closeSl);
    document.addEventListener("keydown", function(e) { 
      if (e.key === "Escape" && sl.classList.contains("open")) closeSl(); 
    });

    const pn = container.querySelector("#panels");
    pn.addEventListener("input", function(e) {
      const t = e.target;
      if (!t.classList.contains("nm")) return;
      const p = S.players[+t.dataset.p];
      p.n = t.value || "Joueur";
      save();
      const b = container.querySelector('[data-tab="' + t.dataset.p + '"]');
      if (b) b.lastChild.textContent = p.n;
    });

    pn.addEventListener("click", function(e) {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.add) { addP(); return; }
      if (b.dataset.del != null) { S.players.splice(+b.dataset.del, 1); save(); render(); return; }
      if (b.dataset.k) openSl(+b.dataset.p, b.dataset.k, b);
    });

    pn.addEventListener("scroll", updateTabs, { passive: true });

    function addP() {
      S.players.push({ n: "Joueur " + (S.players.length + 1), s: {} });
      save();
      render();
      const pe = container.querySelector("#panels");
      pe.scrollTo({ top: pe.scrollHeight });
    }

    container.querySelector("#tabs").addEventListener("click", function(e) {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.add) { addP(); return; }
      if (b.dataset.tab != null) goTo(+b.dataset.tab);
    });

    let rs = container.querySelector("#rs");
    let rt;
    rs.addEventListener("click", function() {
      if (rs.textContent !== "Confirmer ?") {
        rs.textContent = "Confirmer ?";
        rt = setTimeout(function() { rs.textContent = "Nouvelle partie"; }, 3000);
        return;
      }
      clearTimeout(rt);
      rs.textContent = "Nouvelle partie";
      S.players.forEach(function(p) { p.s = {}; });
      save();
      render();
    });

    container.querySelector("#home").addEventListener("click", function() {
      window.location.href = "/";
    });

    container.querySelector("#th").addEventListener("click", function() {
      const h = document.documentElement;
      h.setAttribute("data-theme", h.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    if (!S.view || S.view.length < 2) S.view = [0, Math.min(1, S.players.length - 1)];
    render();

    // Cleanup
    return () => {
      clearTimeout(rt);
      document.removeEventListener("keydown", closeSl);
    };
  }, []);

  return (
    <div className="yams-container" ref={containerRef}>
      <div className="app">
        <header>
          <h1>Yam's</h1>
          <div className="hb">
            <button className="pill" id="home" aria-label="Retour à l'accueil">Accueil</button>
            <button className="pill" id="th" aria-label="Changer de thème">Thème</button>
            <button className="pill" id="rs">Nouvelle partie</button>
          </div>
        </header>
        <nav id="tabs" role="tablist" aria-label="Joueurs"></nav>
        <section id="panels"></section>
      </div>
      <div className="ov" id="ov"></div>
      <aside className="sl" id="sl" role="dialog" aria-modal="true" aria-labelledby="slt"></aside>
    </div>
  );
}
