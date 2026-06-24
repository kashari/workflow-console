import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ================================================================== *
 *  WorkflowGraphWebGL  — Focused-Explorer state-machine analyzer
 *  Navigate one state's neighborhood at a time; search/outline to jump;
 *  common transitions collapse to "globals"; reachability + path tracing.
 * ================================================================== */

/* ----------------------------- THEMES ----------------------------- */
const LIGHT = {
  bg: "#f3f3f1", headerRed: "#e30613",
  edge: "#5b626a", edgeDim: "#d2d5da", edgeHi: "#0a9d6b", arrow: "#3a4047",
  stateTop: "#ffffff", stateBottom: "#efeee9", stateBorder: "#cfcabb",
  stateText: "#1a1a1a", stateBadgeFill: "#e8e5db", stateBadgeText: "#55534b",
  darkFill: "#272d35", darkBorder: "#272d35", darkText: "#f3f5f8",
  darkBadgeFill: "#3a414b", darkBadgeText: "#c4cbd3",
  transFill: "#0e6e7c", transBorder: "#0b5c68", transText: "#effdff",
  transBadgeFill: "#0b5c68", transBadgeText: "#bdeef4",
  forkBar: "#1c1c1c", forkIcon: "#ffffff", forkText: "#1a1a1a",
  choiceFill: "#fbf4e0", choiceBorder: "#c98a10", choiceAccent: "#c98a10",
  choiceText: "#5a4a16", choiceBadgeFill: "#efe3bf", choiceBadgeText: "#8a6b18",
  initial: "#16a35c", end: "#e07b1f", endOk: "#16a35c", endErr: "#d92d20", bullet: "#16a35c", white: "#ffffff",
  ui: { panel: "#ffffff", border: "#d7d7d2", text: "#23262b", subt: "#5a5f66", btn: "#ffffff", btnText: "#23262b", editorBg: "#fbfbf9", editorText: "#2a2d33", hover: "#efefe9", active: "#e7f4ee" },
};

const DARK = {
  bg: "#070809", headerRed: "#e30613",
  edge: "#8b9197", edgeDim: "#2a2f35", edgeHi: "#37e3a6", arrow: "#c3c8cd",
  stateTop: "#fcfbf7", stateBottom: "#e6e2d7", stateBorder: "#c9c4b6",
  stateText: "#191919", stateBadgeFill: "#dcd7c9", stateBadgeText: "#39392f",
  darkFill: "#171c22", darkBorder: "#2d353e", darkText: "#eef2f6",
  darkBadgeFill: "#262e37", darkBadgeText: "#aab2ba",
  transFill: "#0e3a43", transBorder: "#155561", transText: "#eafdff",
  transBadgeFill: "#11525f", transBadgeText: "#c0eef6",
  forkBar: "#d4dade", forkIcon: "#11161b", forkText: "#dfe4ea",
  choiceFill: "#3a3320", choiceBorder: "#e8b53a", choiceAccent: "#e8b53a",
  choiceText: "#f6eccf", choiceBadgeFill: "#2a2415", choiceBadgeText: "#d9bf72",
  initial: "#1fb574", end: "#f0922b", endOk: "#1fce86", endErr: "#ef5350", bullet: "#19b67a", white: "#ffffff",
  ui: { panel: "#0d1115", border: "#2c343c", text: "#dde3e8", subt: "#aeb6bd", btn: "#15191e", btnText: "#dde3e8", editorBg: "#0a0e12", editorText: "#c9d4dd", hover: "#161c22", active: "#10271f" },
};

const DPR_DRAW = 2.5;
const FONT_STACK = 'Inter, "SF Pro Display", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif';
const FONT_LABEL = `600 14px ${FONT_STACK}`;
const FONT_BADGE = `700 10px ${FONT_STACK}`;
const FONT_FORK = `700 11px ${FONT_STACK}`;
const NODE_H = 46, PAD_X = 14, GAP = 10, BADGE_PAD = 8, MAX_LABEL_W = 152;
const BAR_W = 18, BAR_H = 58, DIA = 44;
const GAPX = 72, ROWGAP = 26; // focus-view layout spacing

/* --------------------------- SAMPLE JSON --------------------------- */
const SAMPLE = {
  version: "1.0.0", id: "withdrawal",
  states: [
    { type: "SimpleState", id: "INIT" },
    { type: "SimpleState", id: "INTRO" },
    { type: "ForkState", id: "JOURNEY_FORK" },
    { type: "SimpleState", id: "KYC" },
    { type: "SimpleState", id: "BOOKING" },
    { type: "JoinState", id: "JOURNEY_JOIN" },
    { type: "ChoiceState", id: "SIGNATURE_CHOICE" },
    { type: "SimpleState", id: "PROCEED_TO_PAPER_SIGNATURE" },
    { type: "SimpleState", id: "PROCEED_TO_DIGITAL_SIGNATURE" },
    { type: "SimpleState", id: "COMPLETE_PROCESS", microfrontendBullet: true, bulletName: "TYP", productStatus: "COMPLETED", dossierStatus: "COMPLETED" },
    { type: "SimpleState", id: "WITHDRAWN", microfrontendBullet: true },
    { type: "SimpleState", id: "PROCESS_KO", microfrontendBullet: true },
  ],
  transitions: [
    { type: "ExternalTransition", source: "INIT", target: "INTRO", event: "START_JOURNEY" },
    { type: "ExternalTransition", source: "INIT", target: "WITHDRAWN", event: "CANCEL_WITHDRAWAL" },
    { type: "ExternalTransition", source: "INTRO", target: "JOURNEY_FORK", event: "NEXT" },
    { type: "ExternalTransition", source: "JOURNEY_FORK", target: "KYC", event: "FORK_KYC" },
    { type: "ExternalTransition", source: "JOURNEY_FORK", target: "BOOKING", event: "FORK_BOOKING" },
    { type: "ExternalTransition", source: "KYC", target: "JOURNEY_JOIN", event: "KYC_DONE" },
    { type: "ExternalTransition", source: "BOOKING", target: "JOURNEY_JOIN", event: "BOOKING_DONE" },
    { type: "ExternalTransition", source: "JOURNEY_JOIN", target: "SIGNATURE_CHOICE", event: "PROCEED" },
    { type: "ExternalTransition", source: "SIGNATURE_CHOICE", target: "PROCEED_TO_PAPER_SIGNATURE", event: "NEXT_BRANCH" },
    { type: "ExternalTransition", source: "SIGNATURE_CHOICE", target: "PROCEED_TO_DIGITAL_SIGNATURE", event: "NEXT_DIGITAL" },
    { type: "ExternalTransition", source: "PROCEED_TO_PAPER_SIGNATURE", target: "COMPLETE_PROCESS", event: "PROCEED_TO_TYP" },
    { type: "ExternalTransition", source: "PROCEED_TO_DIGITAL_SIGNATURE", target: "COMPLETE_PROCESS", event: "PROCEED_TO_TYP" },
  ],
  commonTransitions: [
    { sourceList: ["JOURNEY_JOIN", "INIT", "PROCEED_TO_PAPER_SIGNATURE", "PROCEED_TO_DIGITAL_SIGNATURE"], target: "PROCESS_KO", event: "PROCESS_SELLING_KO" },
  ],
  initialState: "INIT",
  endStates: ["COMPLETE_PROCESS", "WITHDRAWN", "PROCESS_KO"],
};

/* --------------------- JSON -> state-centric model ---------------- */
function stateCat(type = "") {
  const t = type.toLowerCase();
  if (t.includes("fork")) return "fork";
  if (t.includes("join")) return "join";
  if (t.includes("choice")) return "choice";
  return "simple";
}
const KO_TOKENS = new Set(["KO", "ERROR", "ERRORED", "FAIL", "FAILED", "FAILURE", "REJECT", "REJECTED", "CANCEL", "CANCELED", "CANCELLED", "WITHDRAWN", "WITHDRAWAL", "WITHDRAW", "ABORT", "ABORTED", "TIMEOUT", "DENIED", "EXPIRED", "REFUSED", "DECLINED", "INVALID", "BLOCKED"]);

/* Each state holds its own incoming/outgoing transitions and any global
 * (commonTransition) handlers. commonTransitions go into `globals` only —
 * they are NEVER drawn as edges, which kills the fan-in spider web. */
function buildModel(wf) {
  const errors = [];
  const endSet = new Set(wf.endStates || []);
  const endNature = (id, s) => {
    const tokens = `${id} ${s.productStatus || ""} ${s.dossierStatus || ""}`.toUpperCase().split(/[^A-Z0-9]+/);
    return tokens.some((t) => KO_TOKENS.has(t)) ? "error" : "ok";
  };
  const states = new Map();
  for (const s of wf.states || []) {
    if (s == null || s.id == null) { errors.push('A state is missing an "id" and was skipped'); continue; }
    const cat = stateCat(s.type);
    states.set(s.id, {
      id: s.id, type: s.type || "SimpleState", badge: s.type || "SimpleState", cat,
      isInitial: s.id === wf.initialState, isEnd: endSet.has(s.id),
      endStatus: endSet.has(s.id) ? endNature(s.id, s) : null,
      hasBullet: !!s.microfrontendBullet, bulletName: s.bulletName || null,
      productStatus: s.productStatus || null, dossierStatus: s.dossierStatus || null,
      out: [], in: [], globals: [],
    });
  }
  const order = [...states.keys()];
  const add = (source, target, event, kind) => {
    const okS = states.has(source), okT = states.has(target);
    if (!okS) errors.push(`Unknown source "${source}" (event ${event}) — skipped`);
    if (!okT) errors.push(`Unknown target "${target}" (event ${event}) — skipped`);
    if (!okS || !okT) return;
    if (kind === "global") states.get(source).globals.push({ event, target });
    else { states.get(source).out.push({ event, target }); states.get(target).in.push({ event, source }); }
  };
  for (const t of wf.transitions || []) add(t.source, t.target, t.event, "normal");
  const globalsList = [];
  for (const ct of wf.commonTransitions || []) {
    globalsList.push({ event: ct.event, target: ct.target, sourceList: [...(ct.sourceList || [])] });
    for (const s of ct.sourceList || []) add(s, ct.target, ct.event, "global");
  }
  if (wf.initialState && !states.has(wf.initialState)) errors.push(`initialState "${wf.initialState}" is not a defined state`);
  return { states, order, initial: wf.initialState, endStates: [...endSet], globalsList, errors };
}

/* --------------------------- analysis ---------------------------- */
function analyze(model) {
  const { states, initial, endStates } = model;
  const fwd = new Map(), rev = new Map();
  for (const id of states.keys()) { fwd.set(id, []); rev.set(id, []); }
  for (const [id, s] of states) for (const e of [...s.out, ...s.globals]) {
    if (!states.has(e.target)) continue;
    fwd.get(id).push(e.target); rev.get(e.target).push(id);
  }
  const bfs = (starts, adj) => {
    const seen = new Set(starts.filter((x) => states.has(x))), q = [...seen];
    while (q.length) { const c = q.shift(); for (const t of adj.get(c) || []) if (!seen.has(t)) { seen.add(t); q.push(t); } }
    return seen;
  };
  const reachable = initial ? bfs([initial], fwd) : new Set();
  const canReachEnd = bfs(endStates, rev);
  const unreachable = [], cannotReachEnd = [], deadEnds = [];
  for (const [id, s] of states) {
    if (initial && !reachable.has(id)) unreachable.push(id);
    if (!canReachEnd.has(id)) cannotReachEnd.push(id);
    if (!s.isEnd && s.out.length === 0 && s.globals.length === 0) deadEnds.push(id);
  }
  return { reachable, canReachEnd, unreachable, cannotReachEnd, deadEnds };
}
/* BFS shortest path from -> to (over real + global edges). Returns an array of
 * { state, event } steps (event is the transition taken to reach `state`). */
function shortestPath(model, from, to) {
  const { states } = model;
  if (!states.has(from) || !states.has(to)) return null;
  if (from === to) return [{ state: from, event: null }];
  const prev = new Map(), seen = new Set([from]); let q = [from], done = false;
  while (q.length && !done) {
    const c = q.shift(), s = states.get(c);
    for (const e of [...s.out, ...s.globals]) if (!seen.has(e.target) && states.has(e.target)) {
      seen.add(e.target); prev.set(e.target, { from: c, event: e.event });
      if (e.target === to) { done = true; break; }
      q.push(e.target);
    }
  }
  if (!prev.has(to)) return null;
  const path = []; let cur = to;
  while (cur !== from) { const p = prev.get(cur); path.push({ state: cur, event: p.event }); cur = p.from; }
  path.push({ state: from, event: null }); path.reverse(); return path;
}
function pathToNearestEnd(model, from) {
  const ends = new Set(model.endStates);
  if (ends.has(from)) return [{ state: from, event: null }];
  const prev = new Map(), seen = new Set([from]); let q = [from], found = null;
  while (q.length && !found) {
    const c = q.shift(), s = model.states.get(c); if (!s) continue;
    for (const e of [...s.out, ...s.globals]) if (!seen.has(e.target) && model.states.has(e.target)) {
      seen.add(e.target); prev.set(e.target, { from: c, event: e.event });
      if (ends.has(e.target)) { found = e.target; break; }
      q.push(e.target);
    }
  }
  if (!found) return null;
  const path = []; let cur = found;
  while (cur !== from) { const p = prev.get(cur); path.push({ state: cur, event: p.event }); cur = p.from; }
  path.push({ state: from, event: null }); path.reverse(); return path;
}

/* --------------- focused subgraph (one hop around center) --------- */
function stateNode(s) {
  return {
    id: s.id, kind: "state", label: s.id, badge: s.badge, cat: s.cat,
    isInitial: s.isInitial, isEnd: s.isEnd, endStatus: s.endStatus, hasBullet: s.hasBullet,
    renderKind: s.cat === "fork" || s.cat === "join" ? "bar" : s.cat === "choice" ? "diamond" : "box",
  };
}
function eventNode(id, event) {
  return { id, kind: "transition", label: String(event), badge: "External", cat: "transition", renderKind: "box" };
}
/* Builds the local view: center in the middle, predecessors stacked on the
 * left (source state + event), successors stacked on the right (event +
 * target state). Always small, so it lays out cleanly without any solver. */
function buildFocusView(model, centerId, m) {
  const center = model.states.get(centerId);
  if (!center) return { nodes: [], edges: [] };
  const cNode = stateNode(center); cNode.isCenter = true; cNode._sz = nodeSize(cNode, m);

  const succ = center.out.map((e, i) => {
    const ev = eventNode(`succ-ev-${i}`, e.event); ev._sz = nodeSize(ev, m); ev.navTo = e.target;
    const stN = stateNode(model.states.get(e.target) || { id: e.target, badge: "?", cat: "simple" });
    stN.id = `succ-st-${i}`; stN.navTo = e.target; stN._sz = nodeSize(stN, m);
    return { ev, st: stN };
  });
  const pred = center.in.map((e, j) => {
    const ev = eventNode(`pred-ev-${j}`, e.event); ev._sz = nodeSize(ev, m); ev.navTo = e.source;
    const stN = stateNode(model.states.get(e.source) || { id: e.source, badge: "?", cat: "simple" });
    stN.id = `pred-st-${j}`; stN.navTo = e.source; stN._sz = nodeSize(stN, m);
    return { ev, st: stN };
  });

  const maxW = (arr, k) => arr.reduce((mx, r) => Math.max(mx, r[k]._sz.w), 0);
  const wSuccEv = maxW(succ, "ev"), wSuccSt = maxW(succ, "st");
  const wPredEv = maxW(pred, "ev"), wPredSt = maxW(pred, "st");
  const wC = cNode._sz.w;

  const xSuccEv = wC / 2 + GAPX + wSuccEv / 2;
  const xSuccSt = xSuccEv + wSuccEv / 2 + GAPX + wSuccSt / 2;
  const xPredEv = -(wC / 2 + GAPX + wPredEv / 2);
  const xPredSt = xPredEv - (wPredEv / 2 + GAPX + wPredSt / 2);

  const stack = (rows, xEv, xSt) => {
    const heights = rows.map((r) => Math.max(r.ev._sz.h, r.st._sz.h));
    const total = heights.reduce((a, b) => a + b, 0) + ROWGAP * Math.max(0, rows.length - 1);
    let y = -total / 2;
    rows.forEach((r, i) => {
      const cy = y + heights[i] / 2;
      r.ev.x = xEv; r.ev.y = cy; r.st.x = xSt; r.st.y = cy;
      y += heights[i] + ROWGAP;
    });
  };
  stack(succ, xSuccEv, xSuccSt);
  stack(pred, xPredEv, xPredSt);
  cNode.x = 0; cNode.y = 0;

  const nodes = [cNode];
  const edges = [];
  succ.forEach((r, i) => {
    nodes.push(r.ev, r.st);
    edges.push({ id: `es-out-${i}`, source: cNode.id, target: r.ev.id });
    edges.push({ id: `es-in-${i}`, source: r.ev.id, target: r.st.id });
  });
  pred.forEach((r, j) => {
    nodes.push(r.st, r.ev);
    edges.push({ id: `ep-out-${j}`, source: r.st.id, target: r.ev.id });
    edges.push({ id: `ep-in-${j}`, source: r.ev.id, target: cNode.id });
  });
  return { nodes, edges };
}

/* ----------------------- canvas drawing --------------------------- */
function mctx() { return document.createElement("canvas").getContext("2d"); }
function rr(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function cutleryFork(ctx, cx, cy, h, color) {
  const top = cy - h / 2, neck = cy - h / 8, tip = cy + h / 2;
  ctx.strokeStyle = color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 1.6;
  for (const dx of [-4.2, -1.4, 1.4, 4.2]) { ctx.beginPath(); ctx.moveTo(cx + dx, top); ctx.lineTo(cx + dx, neck); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(cx - 4.2, neck); ctx.quadraticCurveTo(cx, neck + 4, cx + 4.2, neck); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, neck + 2); ctx.lineTo(cx, tip); ctx.stroke();
}
function spartanLambda(ctx, cx, cy, h, color) {
  const top = cy - h / 2, bot = cy + h / 2, leg = h * 0.44;
  ctx.strokeStyle = color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx - leg, bot); ctx.lineTo(cx, top); ctx.lineTo(cx + leg, bot); ctx.stroke();
}
function nodeSize(node, m) {
  m.font = node.renderKind === "bar" ? FONT_FORK : FONT_LABEL;
  const rawLabelW = m.measureText(node.label).width;
  if (node.renderKind === "bar") {
    const labelW = Math.min(rawLabelW, 120);
    const w = Math.ceil(Math.max(BAR_W, labelW) + 10);
    const h = BAR_H + 6 + 15;
    return { kind: "bar", w, h, labelW, anchorW: BAR_W, anchorH: BAR_H, ay: BAR_H / 2 + 2 - h / 2 };
  }
  const labelW = Math.min(rawLabelW, MAX_LABEL_W);
  m.font = FONT_BADGE;
  const badgeW = m.measureText(node.badge.toUpperCase()).width + BADGE_PAD * 2;
  if (node.renderKind === "diamond") {
    const w = Math.ceil(PAD_X + DIA + GAP + labelW + GAP + badgeW + PAD_X);
    return { kind: "diamond", w, h: NODE_H, labelW, badgeW, anchorW: w, anchorH: NODE_H, ay: 0 };
  }
  const needsIcon = node.kind === "state" && (node.hasBullet || node.isInitial || node.isEnd);
  const leftIcon = needsIcon ? 28 : 0;
  const w = Math.ceil(PAD_X + leftIcon + labelW + GAP + badgeW + PAD_X);
  return { kind: "box", w, h: NODE_H, labelW, badgeW, leftIcon, anchorW: w, anchorH: NODE_H, ay: 0 };
}
function boxStyle(node, th) {
  if (node.kind === "transition") return { top: th.transFill, bot: th.transFill, border: th.transBorder, text: th.transText, bf: th.transBadgeFill, bt: th.transBadgeText };
  if (node.hasBullet) return { top: th.darkFill, bot: th.darkFill, border: th.darkBorder, text: th.darkText, bf: th.darkBadgeFill, bt: th.darkBadgeText };
  return { top: th.stateTop, bot: th.stateBottom, border: th.stateBorder, text: th.stateText, bf: th.stateBadgeFill, bt: th.stateBadgeText };
}
function trunc(ctx, label, max) {
  if (ctx.measureText(label).width <= max) return label;
  let lo = 0, hi = label.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (ctx.measureText(label.slice(0, mid) + "…").width <= max) lo = mid; else hi = mid - 1;
  }
  return label.slice(0, lo) + "…";
}
function drawNode(node, sz, th, dpr = DPR_DRAW) {
  const cv = document.createElement("canvas");
  cv.width = Math.ceil(sz.w * dpr); cv.height = Math.ceil(sz.h * dpr);
  const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr); ctx.textBaseline = "middle";
  const { w, h } = sz;

  if (sz.kind === "bar") {
    const bx = (w - BAR_W) / 2;
    rr(ctx, bx, 2, BAR_W, BAR_H, 6); ctx.fillStyle = th.forkBar; ctx.fill();
    if (node.cat === "join") spartanLambda(ctx, w / 2, 2 + BAR_H / 2, 28, th.forkIcon);
    else cutleryFork(ctx, w / 2, 2 + BAR_H / 2, 30, th.forkIcon);
    ctx.font = FONT_FORK; ctx.fillStyle = th.forkText; ctx.textAlign = "center";
    ctx.fillText(trunc(ctx, node.label, w - 4), w / 2, BAR_H + 6 + 7);
    ctx.textAlign = "left";
    return cv;
  }
  if (sz.kind === "diamond") {
    const cy = h / 2, d = DIA;
    ctx.beginPath();
    ctx.moveTo(2 + d / 2, 3); ctx.lineTo(d, cy); ctx.lineTo(2 + d / 2, h - 3); ctx.lineTo(2, cy); ctx.closePath();
    ctx.fillStyle = th.choiceFill; ctx.fill();
    ctx.lineWidth = 1.8; ctx.strokeStyle = th.choiceAccent; ctx.stroke();
    ctx.fillStyle = th.choiceAccent; ctx.font = `800 16px ${FONT_STACK}`; ctx.textAlign = "center";
    ctx.fillText("?", 2 + d / 2, cy + 0.5); ctx.textAlign = "left";
    let cx = PAD_X + d + GAP;
    ctx.font = FONT_LABEL; ctx.fillStyle = th.choiceText;
    ctx.fillText(trunc(ctx, node.label, sz.labelW), cx, cy + 0.5);
    const bw = sz.badgeW, bxp = w - PAD_X - bw, byp = (h - 19) / 2;
    rr(ctx, bxp, byp, bw, 19, 6); ctx.fillStyle = th.choiceBadgeFill; ctx.fill();
    ctx.font = FONT_BADGE; ctx.fillStyle = th.choiceBadgeText;
    ctx.fillText(node.badge.toUpperCase(), bxp + BADGE_PAD, cy + 0.5);
    return cv;
  }

  // box
  const s = boxStyle(node, th), r = 9, inset = 1.5;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, s.top); grad.addColorStop(1, s.bot);
  rr(ctx, inset, inset, w - inset * 2, h - inset * 2, r); ctx.fillStyle = grad; ctx.fill();
  if (node.isInitial) { rr(ctx, inset, inset, w - inset * 2, h - inset * 2, r); ctx.lineWidth = 2.4; ctx.strokeStyle = th.initial; ctx.stroke(); }
  else if (node.isEnd) {
    const ec = node.endStatus === "error" ? th.endErr : th.endOk;
    rr(ctx, inset, inset, w - inset * 2, h - inset * 2, r); ctx.lineWidth = 2.4; ctx.strokeStyle = ec; ctx.stroke();
    rr(ctx, inset + 3, inset + 3, w - (inset + 3) * 2, h - (inset + 3) * 2, r - 3); ctx.lineWidth = 1; ctx.globalAlpha = 0.55; ctx.strokeStyle = ec; ctx.stroke(); ctx.globalAlpha = 1;
  } else { rr(ctx, inset, inset, w - inset * 2, h - inset * 2, r); ctx.lineWidth = 1.2; ctx.strokeStyle = s.border; ctx.stroke(); }

  let cx = PAD_X;
  if (sz.leftIcon) {
    const iy = h / 2;
    if (node.isEnd) {
      const ec = node.endStatus === "error" ? th.endErr : th.endOk;
      ctx.fillStyle = ec; ctx.beginPath(); ctx.arc(cx + 8, iy, 8.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = th.white; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
      if (node.endStatus === "error") {
        ctx.beginPath();
        ctx.moveTo(cx + 4.5, iy - 3.5); ctx.lineTo(cx + 11.5, iy + 3.5);
        ctx.moveTo(cx + 11.5, iy - 3.5); ctx.lineTo(cx + 4.5, iy + 3.5); ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(cx + 4, iy + 0.5); ctx.lineTo(cx + 7, iy + 4); ctx.lineTo(cx + 12.5, iy - 3.5); ctx.stroke();
      }
    } else if (node.isInitial) {
      ctx.fillStyle = th.initial; ctx.beginPath(); ctx.arc(cx + 8, iy, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = th.white; ctx.beginPath(); ctx.moveTo(cx + 5.5, iy - 4); ctx.lineTo(cx + 12, iy); ctx.lineTo(cx + 5.5, iy + 4); ctx.closePath(); ctx.fill();
    } else if (node.hasBullet) {
      // microfrontend bullet: filled dot inside a thin ring
      ctx.beginPath(); ctx.arc(cx + 8, iy, 8, 0, Math.PI * 2);
      ctx.lineWidth = 1.6; ctx.strokeStyle = th.bullet; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + 8, iy, 4, 0, Math.PI * 2);
      ctx.fillStyle = th.bullet; ctx.fill();
    }
    cx += 28;
  }
  ctx.font = FONT_LABEL; ctx.fillStyle = s.text;
  ctx.fillText(trunc(ctx, node.label, sz.labelW), cx, h / 2 + 0.5);
  const bw = sz.badgeW, bxp = w - PAD_X - bw, byp = (h - 19) / 2;
  rr(ctx, bxp, byp, bw, 19, 6); ctx.fillStyle = s.bf; ctx.fill();
  ctx.font = FONT_BADGE; ctx.fillStyle = s.bt;
  ctx.fillText(node.badge.toUpperCase(), bxp + BADGE_PAD, h / 2 + 0.5);
  return cv;
}

/* --------------------- edge geometry ------------------------------ */
function round(pts, r) {
  if (pts.length < 3) return pts;
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py) || 1, d2 = Math.hypot(nx - cx, ny - cy) || 1, rr2 = Math.min(r, d1 / 2, d2 / 2);
    out.push([cx + (px - cx) * (rr2 / d1), cy + (py - cy) * (rr2 / d1)]);
    out.push([cx + (nx - cx) * (rr2 / d2), cy + (ny - cy) * (rr2 / d2)]);
  }
  out.push(pts[pts.length - 1]); return out;
}
function simpleRoute(a, b) {
  const ax = a.x + a._sz.anchorW / 2, ay = a.y, bx = b.x - b._sz.anchorW / 2, by = b.y;
  if (bx > ax + 26) { const mx = (ax + bx) / 2; return round([[ax, ay], [mx, ay], [mx, by], [bx, by]], 8); }
  const ly = Math.max(ay, by) + a._sz.h / 2 + 34;
  return round([[ax, ay], [ax + 20, ay], [ax + 20, ly], [bx - 20, ly], [bx - 20, by], [bx, by]], 8);
}
function ribbon(pts, hw, z) {
  const v = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const ax = x1, ay = -y1, bx = x2, by = -y2;
    let dx = bx - ax, dy = by - ay; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const nx = -dy * hw, ny = dx * hw;
    v.push(ax + nx, ay + ny, z, ax - nx, ay - ny, z, bx + nx, by + ny, z, bx + nx, by + ny, z, ax - nx, ay - ny, z, bx - nx, by - ny, z);
  }
  return v;
}
function arrow(pts, sz, z) {
  const [x2, y2] = pts[pts.length - 1], [x1, y1] = pts[pts.length - 2];
  let dx = x2 - x1, dy = y2 - y1; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
  const nx = -dy, ny = dx;
  return [x2, -y2, z, (x2 - dx * sz) + nx * sz * 0.55, -((y2 - dy * sz) + ny * sz * 0.55), z, (x2 - dx * sz) - nx * sz * 0.55, -((y2 - dy * sz) - ny * sz * 0.55), z];
}

/* ============================ EXPORT ENGINE ====================== */
const PAPER_MM = { A4: [210, 297], A3: [297, 420], A5: [148, 210], Letter: [215.9, 279.4], Tabloid: [279.4, 431.8] };

function buildDiagramSVG(nodes, edges, th, { pad = 48, dpr = 4 } = {}) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const routes = [];
  for (const e of edges) {
    const a = nodeById.get(e.source), b = nodeById.get(e.target);
    if (!a || !b) continue;
    const pts = e._route || simpleRoute(a, b); routes.push(pts);
    for (const [x, y] of pts) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  }
  for (const n of nodes) {
    minX = Math.min(minX, n.x - n._sz.w / 2); maxX = Math.max(maxX, n.x + n._sz.w / 2);
    minY = Math.min(minY, n.y - n._sz.h / 2); maxY = Math.max(maxY, n.y + n._sz.h / 2);
  }
  if (!isFinite(minX)) { minX = 0; maxX = 200; minY = 0; maxY = 120; }
  const ox = -minX + pad, oy = -minY + pad;
  const W = Math.ceil(maxX - minX + pad * 2), H = Math.ceil(maxY - minY + pad * 2);

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${th.bg}"/>`);
  for (const pts of routes) {
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${(x + ox).toFixed(1)} ${(y + oy).toFixed(1)}`).join(" ");
    parts.push(`<path d="${d}" fill="none" stroke="${th.edge}" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="round" opacity="0.95"/>`);
    const [x2, y2] = pts[pts.length - 1], [x1, y1] = pts[pts.length - 2];
    let dx = x2 - x1, dy = y2 - y1; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const nx = -dy, ny = dx, s = 11;
    const tipX = x2 + ox, tipY = y2 + oy;
    const p1x = (x2 - dx * s) + nx * s * 0.55 + ox, p1y = (y2 - dy * s) + ny * s * 0.55 + oy;
    const p2x = (x2 - dx * s) - nx * s * 0.55 + ox, p2y = (y2 - dy * s) - ny * s * 0.55 + oy;
    parts.push(`<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${th.arrow}"/>`);
  }
  for (const n of nodes) {
    const href = drawNode(n, n._sz, th, dpr).toDataURL("image/png");
    const x = (n.x - n._sz.w / 2 + ox).toFixed(1), y = (n.y - n._sz.h / 2 + oy).toFixed(1);
    parts.push(`<image x="${x}" y="${y}" width="${n._sz.w}" height="${n._sz.h}" href="${href}" preserveAspectRatio="none"/>`);
  }
  parts.push(`</svg>`);
  return { svg: parts.join(""), width: W, height: H, bg: th.bg };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
function loadImage(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
function svgUrl(svg) { return URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" })); }

async function rasterize(svg, width, height, scale, mime, bg) {
  const url = svgUrl(svg);
  try {
    const img = await loadImage(url);
    const c = document.createElement("canvas");
    c.width = Math.round(width * scale); c.height = Math.round(height * scale);
    const ctx = c.getContext("2d");
    if (mime === "image/jpeg") { ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height); }
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob(res, mime, 0.95));
  } finally { setTimeout(() => URL.revokeObjectURL(url), 4000); }
}

function fitToPaper(width, height, paperName, marginMm) {
  const base = PAPER_MM[paperName] || PAPER_MM.A4;
  const landscape = width >= height;
  const pw = landscape ? base[1] : base[0], ph = landscape ? base[0] : base[1];
  const availW = pw - marginMm * 2, availH = ph - marginMm * 2;
  const ar = width / height;
  let w = availW, h = w / ar;
  if (h > availH) { h = availH; w = h * ar; }
  return { landscape, pw, ph, x: (pw - w) / 2, y: (ph - h) / 2, w, h };
}

async function exportPDF(svg, width, height, { paper = "A4", margin = 12, title }) {
  const { jsPDF } = await import("jspdf");
  await import("svg2pdf.js");
  const fit = fitToPaper(width, height, paper, margin);
  const fmt = paper === "Letter" ? "letter" : paper === "Tabloid" ? "tabloid" : paper.toLowerCase();
  const doc = new jsPDF({ orientation: fit.landscape ? "landscape" : "portrait", unit: "mm", format: fmt });
  const hy = Math.max(6, margin - 4);
  doc.setFontSize(10); doc.setTextColor(90); doc.text(title || "State Machine", margin, hy);
  doc.setFontSize(8); doc.setTextColor(150); doc.text(new Date().toLocaleString(), fit.pw - margin, hy, { align: "right" });
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;left:-99999px;top:0";
  wrap.innerHTML = svg; document.body.appendChild(wrap);
  const el = wrap.querySelector("svg");
  try { await doc.svg(el, { x: fit.x, y: fit.y, width: fit.w, height: fit.h }); }
  finally { document.body.removeChild(wrap); }
  doc.save(`${(title || "state-machine").replace(/\s+/g, "_")}.pdf`);
}

function printDiagram(svg, width, height, { title }) {
  const landscape = width >= height;
  const win = window.open("", "_blank");
  if (!win) return false;
  win.document.write(`<!doctype html><html><head><title>${title || "State Machine"}</title>
  <style>
    @page { size: ${landscape ? "landscape" : "portrait"}; margin: 12mm; }
    html,body { margin:0; padding:0; }
    .meta { font: 600 12px Inter, system-ui, sans-serif; color:#444; display:flex; justify-content:space-between; padding:0 2mm 4mm; }
    svg { width:100%; height:auto; max-height:${landscape ? "180mm" : "250mm"}; display:block; }
  </style></head><body>
    <div class="meta"><span>${title || "State Machine"}</span><span>${new Date().toLocaleString()}</span></div>
    <div class="frame">${svg}</div>
    <script>window.onload=function(){setTimeout(function(){window.focus();window.print();},300);};<\/script>
  </body></html>`);
  win.document.close();
  return true;
}

/* ------------------------- React component ------------------------ */
const GROUPS = [
  { key: "initial", label: "Initial", test: (s) => s.isInitial },
  { key: "end", label: "End states", test: (s) => s.isEnd },
  { key: "choice", label: "Choices", test: (s) => s.cat === "choice" },
  { key: "forkjoin", label: "Forks & Joins", test: (s) => s.cat === "fork" || s.cat === "join" },
  { key: "simple", label: "States", test: (s) => s.cat === "simple" && !s.isInitial && !s.isEnd },
];

export default function WorkflowGraphWebGL() {
  const mountRef = useRef(null);
  const S = useRef({});
  const navigateRef = useRef(() => {});
  const centerRef = useRef(null);

  const [jsonText, setJsonText] = useState(JSON.stringify(SAMPLE, null, 2));
  const [editorOpen, setEditorOpen] = useState(false);
  const [graphData, setGraphData] = useState(SAMPLE);
  const [themeName, setThemeName] = useState("light");
  const [exportOpen, setExportOpen] = useState(false);
  const [busy, setBusy] = useState(null);
  const [pngScale, setPngScale] = useState(3);
  const [paper, setPaper] = useState("A4");
  const [margin, setMargin] = useState(12);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const th = themeName === "light" ? LIGHT : DARK;
  const u = th.ui;

  const model = useMemo(() => buildModel(graphData), [graphData]);
  const analysis = useMemo(() => analyze(model), [model]);

  centerRef.current = center;
  const centerState = center ? model.states.get(center) : null;

  // reset focus to the initial state whenever the model changes
  useEffect(() => {
    const start = model.initial && model.states.has(model.initial) ? model.initial : model.order[0] || null;
    setCenter(start); setHistory([]); setFuture([]);
  }, [model]);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 4200); };

  const goTo = (id, { record = true } = {}) => {
    if (!id || !model.states.has(id) || id === centerRef.current) { if (id === centerRef.current) S.current.recenter?.(); return; }
    if (record && centerRef.current) { setHistory((h) => [...h, centerRef.current]); setFuture([]); }
    setCenter(id);
  };
  navigateRef.current = (id) => goTo(id);
  const back = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setFuture([center, ...future]);
    setCenter(prev);
  };
  const forward = () => {
    if (!future.length) return;
    const nxt = future[0];
    setFuture(future.slice(1));
    setHistory([...history, center]);
    setCenter(nxt);
  };

  /* ---- WebGL renderer: created once per (model, theme); content swapped imperatively ---- */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(th.bg);
    let W = container.clientWidth || 800, H = container.clientHeight || 600;
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000);
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(W, H); renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);

    const m = mctx();
    let raf = 0, ro = null;
    let nodeMeshes = [], nodeDisposables = [];
    let eMesh = null, aMesh = null, eGeo = null, aGeo = null;
    let curNodes = [], curEdges = [];

    const clearFocus = () => {
      for (const mm of nodeMeshes) group.remove(mm);
      nodeDisposables.forEach((d) => d.dispose && d.dispose()); nodeDisposables = []; nodeMeshes = [];
      if (eMesh) { group.remove(eMesh); eGeo.dispose(); eMesh.material.dispose(); eMesh = null; }
      if (aMesh) { group.remove(aMesh); aGeo.dispose(); aMesh.material.dispose(); aMesh = null; }
    };
    const buildEdges = () => {
      const id2 = new Map(curNodes.map((n) => [n.id, n]));
      const eP = [], eC = [], aP = [], aC = [];
      const baseE = new THREE.Color(th.edge), baseA = new THREE.Color(th.arrow);
      for (const e of curEdges) {
        const a = id2.get(e.source), b = id2.get(e.target); if (!a || !b) continue;
        const pts = e._route || simpleRoute(a, b);
        const rv = ribbon(pts, 1.1, -1); Array.prototype.push.apply(eP, rv); for (let i = 0; i < rv.length / 3; i++) eC.push(baseE.r, baseE.g, baseE.b);
        const av = arrow(pts, 14, -0.5); Array.prototype.push.apply(aP, av); for (let i = 0; i < av.length / 3; i++) aC.push(baseA.r, baseA.g, baseA.b);
      }
      eGeo = new THREE.BufferGeometry();
      eGeo.setAttribute("position", new THREE.Float32BufferAttribute(eP, 3));
      eGeo.setAttribute("color", new THREE.Float32BufferAttribute(eC, 3));
      eMesh = new THREE.Mesh(eGeo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
      aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute("position", new THREE.Float32BufferAttribute(aP, 3));
      aGeo.setAttribute("color", new THREE.Float32BufferAttribute(aC, 3));
      aMesh = new THREE.Mesh(aGeo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true }));
      group.add(eMesh); group.add(aMesh);
    };
    const rebuildEdges = () => {
      if (eMesh) { group.remove(eMesh); eGeo.dispose(); eMesh.material.dispose(); eMesh = null; }
      if (aMesh) { group.remove(aMesh); aGeo.dispose(); aMesh.material.dispose(); aMesh = null; }
      const id2 = new Map(curNodes.map((n) => [n.id, n]));
      for (const e of curEdges) { const a = id2.get(e.source), b = id2.get(e.target); e._route = a && b ? simpleRoute(a, b) : null; }
      buildEdges();
    };

    const st = S.current;
    st.cur = st.cur || { x: 0, y: 0, zoom: 1 };
    st.targetZoom = st.cur.zoom; st.focal = null; st.vel = { x: 0, y: 0 }; st.mode = null; st.dirty = true;
    st.targetX = st.cur.x; st.targetY = st.cur.y; st.flying = false; st.fade = 1;

    const apply = () => { camera.zoom = st.cur.zoom; camera.position.set(st.cur.x, st.cur.y, 10); camera.updateProjectionMatrix(); };

    st.showCenter = (centerId) => {
      if (!model.states.has(centerId)) centerId = model.initial && model.states.has(model.initial) ? model.initial : model.order[0];
      if (!centerId) { clearFocus(); st.dirty = true; return; }
      clearFocus();
      const fv = buildFocusView(model, centerId, m);
      curNodes = fv.nodes; curEdges = fv.edges;
      const id2 = new Map(curNodes.map((n) => [n.id, n]));
      for (const e of curEdges) { const a = id2.get(e.source), b = id2.get(e.target); e._route = a && b ? simpleRoute(a, b) : null; }
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const n of curNodes) {
        const tex = new THREE.CanvasTexture(drawNode(n, n._sz, th));
        tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.SRGBColorSpace;
        const geo = new THREE.PlaneGeometry(n._sz.w, n._sz.h);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
        const mesh = new THREE.Mesh(geo, mat); mesh.position.set(n.x, -n.y, n.isCenter ? 0.2 : 0);
        mesh.userData.node = n; mesh.userData.navTo = n.navTo || null;
        group.add(mesh); nodeMeshes.push(mesh); nodeDisposables.push(tex, geo, mat);
        minX = Math.min(minX, n.x - n._sz.w / 2); maxX = Math.max(maxX, n.x + n._sz.w / 2);
        minY = Math.min(minY, n.y - n._sz.h / 2); maxY = Math.max(maxY, n.y + n._sz.h / 2);
      }
      buildEdges();
      if (!isFinite(minX)) { minX = -100; maxX = 100; minY = -100; maxY = 100; }
      const gw = maxX - minX || 1, gh = maxY - minY || 1, p = 1.3;
      st.targetZoom = Math.min(Math.max(Math.min(W / (gw * p), H / (gh * p)), 0.4), 1.7);
      st.cur.zoom = st.targetZoom; st.focal = null; st.flying = false;
      st.cur.x = (minX + maxX) / 2; st.targetX = st.cur.x;
      st.cur.y = -(minY + maxY) / 2; st.targetY = st.cur.y;
      st.fade = 0;
      st.nodes = curNodes; st.edges = curEdges; st.th = th; st.title = String(graphData.id || "state-machine");
      st.dirty = true;
    };
    st.recenter = () => { if (st.nodes) st.showCenter(centerRef.current); };
    st.zoomBy = (f) => { st.targetZoom = Math.min(Math.max(st.targetZoom * f, 0.2), 4); st.focal = null; };

    const loop = () => {
      let moved = false;
      if (Math.abs(st.cur.zoom - st.targetZoom) > 1e-4) {
        st.cur.zoom += (st.targetZoom - st.cur.zoom) * 0.2; moved = true;
        if (st.focal) { st.cur.x = st.focal.wx - st.focal.mx / st.cur.zoom; st.cur.y = st.focal.wy + st.focal.my / st.cur.zoom; }
      } else { st.cur.zoom = st.targetZoom; st.focal = null; }
      if (st.mode !== "pan" && (Math.abs(st.vel.x) > 0.02 || Math.abs(st.vel.y) > 0.02)) { st.cur.x -= st.vel.x; st.cur.y += st.vel.y; st.vel.x *= 0.9; st.vel.y *= 0.9; moved = true; }
      if (st.fade < 1) {
        st.fade = Math.min(1, st.fade + 0.14); moved = true;
        for (const mm of nodeMeshes) mm.material.opacity = st.fade;
        if (eMesh) eMesh.material.opacity = 0.95 * st.fade;
        if (aMesh) aMesh.material.opacity = st.fade;
      }
      if (moved || st.dirty) { apply(); renderer.render(scene, camera); st.dirty = false; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let lastX = 0, lastY = 0, isDown = false, movedAmt = 0, dragMesh = null;
    const rc = new THREE.Raycaster();
    const pick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      rc.setFromCamera(ndc, camera);
      return rc.intersectObjects(nodeMeshes)[0]?.object || null;
    };
    const onDown = (e) => { isDown = true; lastX = e.clientX; lastY = e.clientY; movedAmt = 0; st.vel = { x: 0, y: 0 }; dragMesh = pick(e); st.mode = dragMesh ? "node" : "pan"; container.style.cursor = "grabbing"; };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY; movedAmt += Math.abs(dx) + Math.abs(dy);
      if (st.mode === "node" && dragMesh) {
        const n = dragMesh.userData.node;
        n.x += dx / st.cur.zoom; n.y += dy / st.cur.zoom;
        dragMesh.position.set(n.x, -n.y, n.isCenter ? 0.2 : 0);
        rebuildEdges(); st.dirty = true;
      } else {
        st.cur.x -= dx / st.cur.zoom; st.cur.y += dy / st.cur.zoom; st.vel = { x: dx / st.cur.zoom, y: dy / st.cur.zoom }; st.dirty = true;
      }
      lastX = e.clientX; lastY = e.clientY;
    };
    const onUp = () => {
      if (isDown && movedAmt < 5 && dragMesh) {
        const navTo = dragMesh.userData.navTo;
        if (navTo) navigateRef.current(navTo);
      }
      isDown = false; dragMesh = null; st.mode = null; container.style.cursor = "grab";
    };
    const onWheel = (e) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2, my = e.clientY - rect.top - rect.height / 2;
      st.focal = { mx, my, wx: st.cur.x + mx / st.cur.zoom, wy: st.cur.y - my / st.cur.zoom };
      st.targetZoom = Math.min(Math.max(st.targetZoom * Math.exp(-e.deltaY * 0.0014), 0.2), 4);
    };
    container.style.cursor = "grab";
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    ro = new ResizeObserver(() => {
      W = container.clientWidth || W; H = container.clientHeight || H;
      camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
      camera.updateProjectionMatrix(); renderer.setSize(W, H); st.dirty = true;
    });
    ro.observe(container);

    st.showCenter(centerRef.current || model.initial || model.order[0]);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("wheel", onWheel);
      clearFocus();
      st.showCenter = null; st.recenter = null;
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [model, themeName]); // eslint-disable-line

  // swap focus content when the center changes (no renderer rebuild)
  useEffect(() => { if (center != null) S.current.showCenter?.(center); }, [center]);

  /* ----------------------------- export ----------------------------- */
  const doExport = async (kind) => {
    const s = S.current;
    if (!s.nodes || !s.nodes.length) { notify("Nothing to export in this view."); return; }
    setBusy(kind);
    try {
      const title = s.title || "state-machine";
      const mk = (opts) => buildDiagramSVG(s.nodes, s.edges, s.th, opts);
      if (kind === "svg") {
        const { svg } = mk({ dpr: 4 });
        downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${title}.svg`);
      } else if (kind === "png" || kind === "jpeg") {
        const { svg, width, height, bg } = mk({ dpr: 4 });
        const mime = kind === "png" ? "image/png" : "image/jpeg";
        const blob = await rasterize(svg, width, height, pngScale, mime, bg);
        downloadBlob(blob, `${title}@${pngScale}x.${kind === "png" ? "png" : "jpg"}`);
      } else if (kind === "pdf") {
        const { svg, width, height } = mk({ dpr: 4 });
        await exportPDF(svg, width, height, { paper, margin, title });
      } else if (kind === "print") {
        const { svg, width, height } = mk({ dpr: 4 });
        if (!printDiagram(svg, width, height, { title })) notify("Pop-up blocked — allow pop-ups to print.");
      }
    } catch (err) {
      if (kind === "pdf") notify("PDF needs jspdf + svg2pdf.js");
      else notify("Export failed: " + (err?.message || err));
      console.error(err);
    } finally { setBusy(null); }
  };

  const applyJson = () => { try { setGraphData(JSON.parse(jsonText)); setEditorOpen(false); } catch (err) { notify("Invalid JSON: " + err.message); } };

  /* ----------------------------- derived UI data -------------------- */
  const q = search.trim().toLowerCase();
  const matches = (s) => {
    if (!q) return true;
    if (s.id.toLowerCase().includes(q)) return true;
    return [...s.out, ...s.in, ...s.globals].some((e) => String(e.event).toLowerCase().includes(q));
  };
  const grouped = GROUPS.map((g) => ({
    ...g,
    items: model.order.map((id) => model.states.get(id)).filter((s) => g.test(s) && matches(s)),
  })).filter((g) => g.items.length);

  const pathInit = centerState && model.initial ? shortestPath(model, model.initial, center) : null;
  const pathEnd = centerState ? pathToNearestEnd(model, center) : null;

  /* ----------------------------- styles ----------------------------- */
  const SIDE_W = 244, PANEL_W = 312, TOP = 30, BAR_H2 = 36, HEAD = TOP + BAR_H2;
  const Btn = ({ children, onClick, title }) => (
    <button title={title} onClick={onClick} style={{ background: u.btn, color: u.btnText, border: `1px solid ${u.border}`, borderRadius: 6, padding: "5px 9px", fontSize: 12, cursor: "pointer", fontFamily: FONT_STACK }}>{children}</button>
  );
  const Pill = ({ children, tone }) => {
    const c = tone === "ok" ? th.endOk : tone === "err" ? th.endErr : u.subt;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: c, border: `1px solid ${c}`, borderRadius: 20, padding: "1px 8px" }}>{children}</span>;
  };
  const NodeRow = ({ id, sub, active, tone, onClick }) => (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, padding: "5px 8px", borderRadius: 6, cursor: "pointer", background: active ? u.active : "transparent", color: u.text }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = u.hover; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12.5, fontWeight: active ? 700 : 500 }}>{id}</span>
      {sub && <span style={{ fontSize: 10.5, color: tone === "err" ? th.endErr : u.subt, flexShrink: 0 }}>{sub}</span>}
    </div>
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: th.bg, fontFamily: FONT_STACK, overflow: "hidden", color: u.text }}>
      {/* header */}
      <div style={{ height: TOP, background: th.headerRed, color: "#fff", display: "flex", alignItems: "center", padding: "0 14px", fontSize: 12, fontWeight: 700, letterSpacing: 0.3 }}>
        STATE MACHINE ANALYZER — EXPLORER · <span style={{ opacity: 0.85, marginLeft: 6 }}>{String(graphData.id || "untitled")}</span>
      </div>

      {/* breadcrumb / toolbar */}
      <div style={{ position: "absolute", top: TOP, left: 0, right: 0, height: BAR_H2, background: u.panel, borderBottom: `1px solid ${u.border}`, display: "flex", alignItems: "center", gap: 8, padding: "0 10px", zIndex: 6 }}>
        <Btn onClick={back} title="Back">←</Btn>
        <Btn onClick={forward} title="Forward">→</Btn>
        <Btn onClick={() => goTo(model.initial)} title="Jump to initial">⌂ Start</Btn>
        <div style={{ display: "flex", alignItems: "center", gap: 4, overflow: "hidden", flex: 1, fontSize: 12, color: u.subt }}>
          {[...history.slice(-3), center].filter(Boolean).map((id, i, arr) => (
            <React.Fragment key={id + i}>
              {i > 0 && <span style={{ opacity: 0.5 }}>›</span>}
              <span onClick={() => goTo(id)} style={{ cursor: "pointer", fontWeight: id === center ? 700 : 500, color: id === center ? th.edgeHi : u.subt, whiteSpace: "nowrap" }}>{id}</span>
            </React.Fragment>
          ))}
        </div>
        <Btn onClick={() => S.current.zoomBy?.(1.2)}>+</Btn>
        <Btn onClick={() => S.current.zoomBy?.(0.8)}>−</Btn>
        <Btn onClick={() => S.current.recenter?.()} title="Re-fit">⤢</Btn>
        <button onClick={() => setThemeName((t) => (t === "light" ? "dark" : "light"))} style={{ background: u.btn, color: u.btnText, border: `1px solid ${u.border}`, borderRadius: 16, padding: "5px 11px", fontSize: 12, cursor: "pointer", fontFamily: FONT_STACK }}>{themeName === "light" ? "◐" : "◑"}</button>
        <Btn onClick={() => setEditorOpen((o) => !o)}>Edit JSON</Btn>
        <Btn onClick={() => setExportOpen((o) => !o)}>Export</Btn>
      </div>

      {/* left sidebar: search + outline */}
      <div style={{ position: "absolute", top: HEAD, left: 0, width: SIDE_W, bottom: 0, background: u.panel, borderRight: `1px solid ${u.border}`, display: "flex", flexDirection: "column", zIndex: 5 }}>
        <div style={{ padding: 10, borderBottom: `1px solid ${u.border}` }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search states / events…"
            style={{ width: "100%", boxSizing: "border-box", padding: "7px 9px", borderRadius: 6, border: `1px solid ${u.border}`, background: u.editorBg, color: u.text, fontSize: 12.5, outline: "none", fontFamily: FONT_STACK }} />
          <div style={{ marginTop: 7, fontSize: 11, color: u.subt }}>
            {model.states.size} states · {model.globalsList.length} global handlers
            {analysis.unreachable.length > 0 && <span style={{ color: th.endErr }}> · {analysis.unreachable.length} unreachable</span>}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 6px 14px" }}>
          {grouped.map((g) => (
            <div key={g.key} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: u.subt, padding: "6px 8px 3px" }}>{g.label} · {g.items.length}</div>
              {g.items.map((s) => {
                const unreachable = analysis.unreachable.includes(s.id);
                return <NodeRow key={s.id} id={s.id} active={s.id === center} tone={unreachable ? "err" : undefined}
                  sub={unreachable ? "unreachable" : s.isEnd ? (s.endStatus === "error" ? "KO" : "OK") : undefined}
                  onClick={() => goTo(s.id)} />;
              })}
            </div>
          ))}
          {!grouped.length && <div style={{ padding: 12, fontSize: 12, color: u.subt }}>No matches.</div>}
        </div>
      </div>

      {/* center canvas */}
      <div ref={mountRef} style={{ position: "absolute", top: HEAD, left: SIDE_W, right: PANEL_W, bottom: 0 }} />

      {/* right analysis panel */}
      <div style={{ position: "absolute", top: HEAD, right: 0, width: PANEL_W, bottom: 0, background: u.panel, borderLeft: `1px solid ${u.border}`, overflowY: "auto", zIndex: 5, fontSize: 12.5 }}>
        {centerState ? (
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, wordBreak: "break-word" }}>{centerState.id}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 7 }}>
                <Pill>{centerState.type}</Pill>
                {centerState.isInitial && <Pill tone="ok">initial</Pill>}
                {centerState.isEnd && <Pill tone={centerState.endStatus === "error" ? "err" : "ok"}>end · {centerState.endStatus === "error" ? "KO" : "OK"}</Pill>}
                {centerState.hasBullet && <Pill>◉ MFE{centerState.bulletName ? ` · ${centerState.bulletName}` : ""}</Pill>}
              </div>
              {(centerState.productStatus || centerState.dossierStatus) && (
                <div style={{ marginTop: 7, fontSize: 11.5, color: u.subt }}>
                  {centerState.productStatus && <div>product: <b style={{ color: u.text }}>{centerState.productStatus}</b></div>}
                  {centerState.dossierStatus && <div>dossier: <b style={{ color: u.text }}>{centerState.dossierStatus}</b></div>}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <Pill tone={analysis.reachable.has(center) || !model.initial ? "ok" : "err"}>{analysis.reachable.has(center) || !model.initial ? "reachable ✓" : "unreachable ✕"}</Pill>
              <Pill tone={analysis.canReachEnd.has(center) ? "ok" : "err"}>{analysis.canReachEnd.has(center) ? "reaches END ✓" : "no path to END ✕"}</Pill>
            </div>

            <Section title={`Outgoing · ${centerState.out.length}`} u={u}>
              {centerState.out.length ? centerState.out.map((e, i) => (
                <EventRow key={i} event={e.event} node={e.target} u={u} th={th} onClick={() => goTo(e.target)} />
              )) : <Empty u={u}>no outgoing transitions{!centerState.isEnd ? " (dead-end)" : ""}</Empty>}
            </Section>

            <Section title={`Incoming · ${centerState.in.length}`} u={u}>
              {centerState.in.length ? centerState.in.map((e, i) => (
                <EventRow key={i} event={e.event} node={e.source} dir="from" u={u} th={th} onClick={() => goTo(e.source)} />
              )) : <Empty u={u}>no incoming transitions</Empty>}
            </Section>

            <Section title={`Global handlers · ${centerState.globals.length}`} u={u}>
              {centerState.globals.length ? centerState.globals.map((e, i) => (
                <EventRow key={i} event={e.event} node={e.target} u={u} th={th} onClick={() => goTo(e.target)} />
              )) : <Empty u={u}>none apply to this state</Empty>}
            </Section>

            <Section title="Path from initial" u={u}>
              {pathInit ? <PathTrace path={pathInit} u={u} th={th} onGo={goTo} /> : <Empty u={u}>not reachable from initial</Empty>}
            </Section>
            <Section title="Path to nearest end" u={u}>
              {pathEnd ? <PathTrace path={pathEnd} u={u} th={th} onGo={goTo} /> : <Empty u={u}>cannot reach any end state</Empty>}
            </Section>
          </div>
        ) : <div style={{ padding: 16, color: u.subt }}>No state selected.</div>}
      </div>

      {model.errors.length > 0 && (
        <div style={{ position: "absolute", bottom: 12, left: SIDE_W + 12, zIndex: 7, maxWidth: 420, background: "rgba(227,6,19,.12)", border: "1px solid rgba(227,6,19,.5)", color: "#c0202c", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
          {model.errors.slice(0, 6).map((e, i) => <div key={i}>• {e}</div>)}
        </div>
      )}

      {toast && (
        <div style={{ position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)", zIndex: 9, background: "#1c1f24", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 12, boxShadow: "0 6px 24px rgba(0,0,0,.4)", maxWidth: 460, textAlign: "center" }}>{toast}</div>
      )}

      {exportOpen && (
        <div style={{ position: "absolute", top: HEAD + 6, right: PANEL_W + 8, zIndex: 8, width: 300, background: u.panel, border: `1px solid ${u.border}`, borderRadius: 10, boxShadow: "0 10px 40px rgba(0,0,0,.35)", color: u.text, fontSize: 13, overflow: "hidden" }}>
          <div style={{ padding: "11px 14px", fontWeight: 700, borderBottom: `1px solid ${u.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Export current view</span>
            <span onClick={() => setExportOpen(false)} style={{ cursor: "pointer", color: u.subt }}>✕</span>
          </div>
          <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ color: u.subt, fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Raster</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: u.subt }}>Scale</span>
                {[2, 3, 4].map((sc) => (
                  <button key={sc} onClick={() => setPngScale(sc)} style={{ flex: 1, padding: "6px 0", borderRadius: 6, cursor: "pointer", border: `1px solid ${u.border}`, background: pngScale === sc ? th.headerRed : u.btn, color: pngScale === sc ? "#fff" : u.btnText, fontWeight: 600 }}>{sc}×</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={busy} onClick={() => doExport("png")} style={expBtn(u, th)}>{busy === "png" ? "…" : "PNG"}</button>
                <button disabled={busy} onClick={() => doExport("jpeg")} style={expBtn(u, th)}>{busy === "jpeg" ? "…" : "JPEG"}</button>
                <button disabled={busy} onClick={() => doExport("svg")} style={expBtn(u, th)}>{busy === "svg" ? "…" : "SVG"}</button>
              </div>
            </div>
            <div>
              <div style={{ color: u.subt, fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Document (auto-fit)</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <select value={paper} onChange={(e) => setPaper(e.target.value)} style={{ flex: 1, padding: "6px 8px", borderRadius: 6, border: `1px solid ${u.border}`, background: u.btn, color: u.btnText }}>
                  {["A5", "A4", "A3", "Letter", "Tabloid"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={margin} onChange={(e) => setMargin(+e.target.value)} style={{ width: 110, padding: "6px 8px", borderRadius: 6, border: `1px solid ${u.border}`, background: u.btn, color: u.btnText }}>
                  {[8, 12, 16, 20].map((mm) => <option key={mm} value={mm}>{mm}mm margin</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={busy} onClick={() => doExport("pdf")} style={expBtn(u, th, true)}>{busy === "pdf" ? "Building…" : "PDF (vector)"}</button>
                <button disabled={busy} onClick={() => doExport("print")} style={expBtn(u, th)}>Print</button>
              </div>
            </div>
            <div style={{ color: u.subt, fontSize: 11, lineHeight: 1.5 }}>Exports the currently focused neighborhood.</div>
          </div>
        </div>
      )}

      {editorOpen && (
        <div style={{ position: "absolute", top: HEAD + 6, left: SIDE_W + 8, zIndex: 8, width: 400, bottom: 12, background: u.panel, border: `1px solid ${u.border}`, borderRadius: 10, display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,.35)" }}>
          <div style={{ padding: "10px 12px", color: u.text, fontSize: 12, fontWeight: 700, borderBottom: `1px solid ${u.border}` }}>Workflow JSON</div>
          <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} spellCheck={false}
            style={{ flex: 1, resize: "none", background: u.editorBg, color: u.editorText, border: "none", outline: "none", padding: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, lineHeight: 1.5 }} />
          <div style={{ padding: 10, display: "flex", gap: 8, borderTop: `1px solid ${u.border}` }}>
            <button onClick={applyJson} style={{ flex: 1, background: th.headerRed, color: "#fff", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Render</button>
            <button onClick={() => setJsonText(JSON.stringify(SAMPLE, null, 2))} style={{ background: u.btn, color: u.text, border: `1px solid ${u.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, cursor: "pointer" }}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* small presentational helpers */
function expBtn(u, th, primary) {
  return { flex: 1, padding: "9px 0", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12, border: `1px solid ${primary ? th.headerRed : u.border}`, background: primary ? th.headerRed : u.btn, color: primary ? "#fff" : u.btnText, fontFamily: FONT_STACK };
}
function Section({ title, children, u }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: u.subt, marginBottom: 5 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{children}</div>
    </div>
  );
}
function Empty({ children, u }) { return <div style={{ fontSize: 11.5, color: u.subt, fontStyle: "italic", padding: "2px 0" }}>{children}</div>; }
function EventRow({ event, node, dir, u, th, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "5px 8px", borderRadius: 6, cursor: "pointer", background: u.editorBg, border: `1px solid ${u.border}` }}
      onMouseEnter={(e) => (e.currentTarget.style.background = u.hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = u.editorBg)}>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: th.edgeHi, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{event}</span>
      <span style={{ fontSize: 11.5, color: u.subt, flexShrink: 0 }}>{dir === "from" ? "← " : "→ "}{node}</span>
    </div>
  );
}
function PathTrace({ path, u, th, onGo }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, fontSize: 11.5 }}>
      {path.map((step, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: u.subt }} title={step.event || ""}>·{step.event ? ` ${step.event} ` : " "}›</span>}
          <span onClick={() => onGo(step.state)} style={{ cursor: "pointer", fontWeight: 600, color: th.edgeHi }}>{step.state}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
