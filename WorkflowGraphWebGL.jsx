import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ELK from "elkjs/lib/elk-api.js";
import ELKWorker from "elkjs/lib/elk-worker.js?worker";

const elk = new ELK({ workerFactory: () => new ELKWorker() });

/* ================================================================== *
 *  WorkflowGraphWebGL  — WebGL (three.js) state-machine visualizer
 *  v3: light/dark themes, draggable nodes, fork/join bars w/ cutlery
 *  icon, choice diamonds, thin modern arrows.
 * ================================================================== */

/* ----------------------------- THEMES ----------------------------- */
const LIGHT = {
  bg: "#f3f3f1", headerRed: "#e30613",
  edge: "#5b626a", edgeDim: "#d2d5da", edgeHi: "#0a9d6b", arrow: "#3a4047",
  stateTop: "#ffffff", stateBottom: "#efeee9", stateBorder: "#cfcabb",
  stateText: "#1a1a1a", stateBadgeFill: "#e8e5db", stateBadgeText: "#55534b",
  darkFill: "#272d35", darkBorder: "#272d35", darkText: "#f3f5f8",
  darkBadgeFill: "#3a414b", darkBadgeText: "#c4cbd3",
  transFill: "#0e6e7c", transBorder: "#0b5c68", transText: "# effdff".replace(" ",""),
  transBadgeFill: "#0b5c68", transBadgeText: "#bdeef4",
  forkBar: "#1c1c1c", forkIcon: "#ffffff", forkText: "#1a1a1a",
  choiceFill: "#fbf4e0", choiceBorder: "#c98a10", choiceAccent: "#c98a10",
  choiceText: "#5a4a16", choiceBadgeFill: "#efe3bf", choiceBadgeText: "#8a6b18",
  initial: "#16a35c", end: "#e07b1f", endOk: "#16a35c", endErr: "#d92d20", bullet: "#16a35c", white: "#ffffff",
  ui: { panel: "#ffffff", border: "#d7d7d2", text: "#23262b", subt: "#5a5f66", btn: "#ffffff", btnText: "#23262b", editorBg: "#fbfbf9", editorText: "#2a2d33" },
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
  ui: { panel: "#0d1115", border: "#2c343c", text: "#dde3e8", subt: "#aeb6bd", btn: "#15191e", btnText: "#dde3e8", editorBg: "#0a0e12", editorText: "#c9d4dd" },
};
LIGHT.transText = "#effdff";

const DPR_DRAW = 2.5;
const FONT_STACK = 'Inter, "SF Pro Display", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif';
const FONT_LABEL = `600 14px ${FONT_STACK}`;
const FONT_BADGE = `700 10px ${FONT_STACK}`;
const FONT_FORK = `700 11px ${FONT_STACK}`;
const NODE_H = 46, PAD_X = 14, GAP = 10, BADGE_PAD = 8, MAX_LABEL_W = 152;
const COL_GAP = 74, ROW_GAP = 32;
const BAR_W = 18, BAR_H = 58, DIA = 44;

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

/* --------------------- JSON -> graph model ------------------------ */
function stateCat(type = "") {
  const t = type.toLowerCase();
  if (t.includes("fork")) return "fork";
  if (t.includes("join")) return "join";
  if (t.includes("choice")) return "choice";
  return "simple";
}
function buildGraph(wf) {
  const errors = [], nodes = [], edges = [];
  const stateIds = new Set((wf.states || []).map((s) => s.id));
  const endSet = new Set(wf.endStates || []);
  const KO_TOKENS = new Set(["KO", "ERROR", "ERRORED", "FAIL", "FAILED", "FAILURE", "REJECT", "REJECTED", "CANCEL", "CANCELED", "CANCELLED", "WITHDRAWN", "WITHDRAWAL", "WITHDRAW", "ABORT", "ABORTED", "TIMEOUT", "DENIED", "EXPIRED", "REFUSED", "DECLINED", "INVALID", "BLOCKED"]);
  const endNature = (id, s) => {
    const tokens = `${id} ${s.productStatus || ""} ${s.dossierStatus || ""}`.toUpperCase().split(/[^A-Z0-9]+/);
    return tokens.some((t) => KO_TOKENS.has(t)) ? "error" : "ok";
  };
  for (const s of wf.states || []) {
    if (s == null || s.id == null) { errors.push("A state is missing an \"id\" and was skipped"); continue; }
    const cat = stateCat(s.type);
    nodes.push({
      id: s.id, kind: "state", label: String(s.id), badge: s.type || "SimpleState", cat,
      isInitial: s.id === wf.initialState, isEnd: endSet.has(s.id),
      endStatus: endSet.has(s.id) ? endNature(s.id, s) : null,
      hasBullet: !!s.microfrontendBullet,
      renderKind: cat === "fork" || cat === "join" ? "bar" : cat === "choice" ? "diamond" : "box",
      raw: s,
    });
  }
  let tc = 0;
  const add = (source, target, event) => {
    const okS = stateIds.has(source), okT = stateIds.has(target);
    if (!okS) errors.push(`Unknown source "${source}" (event ${event}) — transition skipped`);
    if (!okT) errors.push(`Unknown target "${target}" (event ${event}) — transition skipped`);
    if (!okS || !okT) return;
    const id = `__t${tc++}__${event}`;
    nodes.push({ id, kind: "transition", label: String(event), badge: "External", cat: "transition", renderKind: "box" });
    edges.push({ id: id + "-in", source, target: id });
    edges.push({ id: id + "-out", source: id, target });
  };
  for (const t of wf.transitions || []) add(t.source, t.target, t.event);
  for (const ct of wf.commonTransitions || []) for (const s of ct.sourceList || []) add(s, ct.target, ct.event);
  if (wf.initialState && !stateIds.has(wf.initialState)) errors.push(`initialState "${wf.initialState}" is not a defined state`);
  return { nodes, edges, errors, initial: wf.initialState };
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
  // Spartan shield mark: bold lambda (Λ), aka the "Spartan A"
  const top = cy - h / 2, bot = cy + h / 2, leg = h * 0.44;
  ctx.strokeStyle = color; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - leg, bot);
  ctx.lineTo(cx, top);
  ctx.lineTo(cx + leg, bot);
  ctx.stroke();
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
  let s = label;
  while (s.length > 1 && ctx.measureText(s + "\u2026").width > max) s = s.slice(0, -1);
  return s + "\u2026";
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
      rr(ctx, cx, iy - 8, 16, 16, 4); ctx.fillStyle = th.bullet; ctx.fill();
      ctx.strokeStyle = th.white; ctx.lineWidth = 1.9; ctx.beginPath();
      ctx.moveTo(cx + 3.5, iy + 0.5); ctx.lineTo(cx + 7, iy + 4); ctx.lineTo(cx + 12.5, iy - 3.5); ctx.stroke();
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

/* ------------------------ ELK layered layout ---------------------- *
 *  ELK computes both node placement (crossing-minimised) and clean
 *  orthogonal edge routing through reserved channels, so long edges no
 *  longer cut across nodes. Node coords are converted to centers and
 *  each edge gets a routed polyline in e._route.
 * ------------------------------------------------------------------ */
const ELK_OPTS = {
  "elk.algorithm": "layered",
  "elk.direction": "RIGHT",
  "elk.edgeRouting": "ORTHOGONAL",
  "elk.layered.spacing.nodeNodeBetweenLayers": "78",
  "elk.spacing.nodeNode": "46",
  "elk.layered.spacing.edgeNodeBetweenLayers": "26",
  "elk.layered.spacing.edgeEdgeBetweenLayers": "16",
  "elk.spacing.edgeNode": "20",
  "elk.spacing.edgeEdge": "14",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.crossingMinimization.semiInteractive": "true",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.layered.mergeEdges": "false",
};
const ELK_OPTS_LARGE = {
  ...ELK_OPTS,
  "elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
  "elk.layered.crossingMinimization.strategy": "GREEDY",
  "elk.layered.crossingMinimization.semiInteractive": "false",
  "elk.layered.considerModelOrder.strategy": "NONE",
};
async function layoutGraph(nodes, edges) {
  const large = nodes.length > 300;
  const g = {
    id: "root",
    layoutOptions: large ? ELK_OPTS_LARGE : ELK_OPTS,
    children: nodes.map((n) => ({ id: n.id, width: n._sz.w, height: n._sz.h })),
    edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] })),
  };
  const res = await elk.layout(g);
  const cpos = new Map((res.children || []).map((c) => [c.id, c]));
  for (const n of nodes) { const c = cpos.get(n.id); if (c) { n.x = c.x + n._sz.w / 2; n.y = c.y + n._sz.h / 2; } }
  const resEdgeMap = new Map((res.edges || []).map((re) => [re.id, re]));
  for (const e of edges) {
    const re = resEdgeMap.get(e.id);
    if (re && re.sections && re.sections.length) {
      const s = re.sections[0];
      const pts = [[s.startPoint.x, s.startPoint.y], ...(s.bendPoints || []).map((p) => [p.x, p.y]), [s.endPoint.x, s.endPoint.y]];
      e._route = round(pts, 8);
    } else e._route = null;
  }
}
/* lightweight reroute used only while a node is being dragged */
function simpleRoute(a, b) {
  const ax = a.x + a._sz.anchorW / 2, ay = a.y, bx = b.x - b._sz.anchorW / 2, by = b.y;
  if (bx > ax + 26) { const mx = (ax + bx) / 2; return round([[ax, ay], [mx, ay], [mx, by], [bx, by]], 8); }
  const ly = Math.max(ay, by) + a._sz.h / 2 + 34;
  return round([[ax, ay], [ax + 20, ay], [ax + 20, ly], [bx - 20, ly], [bx - 20, by], [bx, by]], 8);
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
function forwardClosure(start, edges) {
  const adj = new Map();
  for (const e of edges) (adj.get(e.source) || adj.set(e.source, []).get(e.source)).push(e);
  const nodeSet = new Set([start]), edgeSet = new Set(), q = [start];
  while (q.length) { const c = q.shift(); for (const e of adj.get(c) || []) { edgeSet.add(e.id); if (!nodeSet.has(e.target)) { nodeSet.add(e.target); q.push(e.target); } } }
  return { nodeSet, edgeSet };
}

/* ============================ EXPORT ENGINE ====================== *
 *  Builds a resolution-independent SVG of the whole diagram (vector
 *  edges + arrowheads, nodes embedded as high-DPR images so fonts &
 *  styling are pixel-identical to the live view), then derives
 *  SVG / PNG / JPEG / PDF / Print from it with automatic page fitting.
 * ================================================================== */
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
    parts.push(`<path d="${d}" fill="none" stroke="${th.edge}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" opacity="0.95"/>`);
    const [x2, y2] = pts[pts.length - 1], [x1, y1] = pts[pts.length - 2];
    let dx = x2 - x1, dy = y2 - y1; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const nx = -dy, ny = dx, s = 7;
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
export default function WorkflowGraphWebGL() {
  const mountRef = useRef(null);
  const S = useRef({});
  const manualPos = useRef(new Map());   // node id -> {x,y}, persists across theme switch
  const lastGraph = useRef(null);
  const [jsonText, setJsonText] = useState(JSON.stringify(SAMPLE, null, 2));
  const [editorOpen, setEditorOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [graphData, setGraphData] = useState(SAMPLE);
  const [selected, setSelected] = useState(null);
  const [themeName, setThemeName] = useState("light");
  const [exportOpen, setExportOpen] = useState(false);
  const [busy, setBusy] = useState(null);
  const [pngScale, setPngScale] = useState(3);
  const [paper, setPaper] = useState("A4");
  const [margin, setMargin] = useState(12);
  const [toast, setToast] = useState(null);
  const th = themeName === "light" ? LIGHT : DARK;

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 4200); };
  const currentSVG = (opts) => {
    const s = S.current;
    if (!s.nodes) return null;
    return buildDiagramSVG(s.nodes, s.edges, s.th, opts);
  };
  const doExport = async (kind) => {
    const s = S.current;
    if (!s.nodes) return;
    setBusy(kind);
    try {
      const title = s.title || "state-machine";
      if (kind === "svg") {
        const { svg } = currentSVG({ dpr: 4 });
        downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${title}.svg`);
      } else if (kind === "png" || kind === "jpeg") {
        const { svg, width, height, bg } = currentSVG({ dpr: 4 });
        const mime = kind === "png" ? "image/png" : "image/jpeg";
        const blob = await rasterize(svg, width, height, pngScale, mime, bg);
        downloadBlob(blob, `${title}@${pngScale}x.${kind === "png" ? "png" : "jpg"}`);
      } else if (kind === "pdf") {
        const { svg, width, height } = currentSVG({ dpr: 4 });
        await exportPDF(svg, width, height, { paper, margin, title });
      } else if (kind === "print") {
        const { svg, width, height } = currentSVG({ dpr: 4 });
        if (!printDiagram(svg, width, height, { title })) notify("Pop-up blocked — allow pop-ups to print.");
      }
    } catch (err) {
      if (kind === "pdf") notify("PDF needs jspdf + svg2pdf.js — run: npm i jspdf svg2pdf.js");
      else notify("Export failed: " + (err?.message || err));
      console.error(err);
    } finally { setBusy(null); }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    if (lastGraph.current !== graphData) { manualPos.current = new Map(); lastGraph.current = graphData; }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(th.bg);
    let W = container.clientWidth, H = container.clientHeight;
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000);
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(W, H); renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const group = new THREE.Group(); scene.add(group);
    const disposables = [];

    let cancelled = false;
    let raf = 0, ro = null, cleanupInteraction = null, eGeoRef = null, aGeoRef = null;

    (async () => {
      const { nodes, edges, initial, errors: errs } = buildGraph(graphData);
      if (cancelled) return;
      setErrors(errs);
      const m = mctx();
      nodes.forEach((n) => (n._sz = nodeSize(n, m)));

      try { await layoutGraph(nodes, edges); } catch (e) { setErrors((p) => [...p, "Layout failed: " + (e?.message || e)]); }
      if (cancelled) return;

      const id2 = new Map(nodes.map((n) => [n.id, n]));
      const incidence = new Map(nodes.map((n) => [n.id, []]));
      for (const e of edges) { incidence.get(e.source)?.push(e); incidence.get(e.target)?.push(e); }
      const reroute = (id) => { for (const e of incidence.get(id) || []) { const a = id2.get(e.source), b = id2.get(e.target); if (a && b) e._route = simpleRoute(a, b); } };
      // apply any manual positions kept from before, rerouting their edges
      for (const n of nodes) { const p = manualPos.current.get(n.id); if (p) { n.x = p.x; n.y = p.y; reroute(n.id); } }

      let eMesh = null, aMesh = null, eGeo = null, aGeo = null, eRange = new Map(), aRange = new Map();
      const baseE = new THREE.Color(th.edge), baseA = new THREE.Color(th.arrow), HI = new THREE.Color(th.edgeHi), DIM = new THREE.Color(th.edgeDim);
      const nodeMeshes = [];
      function buildEdges() {
        const eP = [], eC = [], aP = [], aC = []; eRange = new Map(); aRange = new Map();
        for (const e of edges) {
          const a = id2.get(e.source), b = id2.get(e.target); if (!a || !b) continue;
          const pts = e._route || simpleRoute(a, b);
          const rv = ribbon(pts, 0.7, -1), es = eP.length / 3;
          Array.prototype.push.apply(eP, rv); for (let i = 0; i < rv.length / 3; i++) eC.push(baseE.r, baseE.g, baseE.b);
          eRange.set(e.id, [es, rv.length / 3]);
          const av = arrow(pts, 7, -0.5), as = aP.length / 3;
          Array.prototype.push.apply(aP, av); for (let i = 0; i < av.length / 3; i++) aC.push(baseA.r, baseA.g, baseA.b);
          aRange.set(e.id, [as, av.length / 3]);
        }
        if (eMesh) { group.remove(eMesh); eGeo.dispose(); }
        if (aMesh) { group.remove(aMesh); aGeo.dispose(); }
        eGeo = new THREE.BufferGeometry();
        eGeo.setAttribute("position", new THREE.Float32BufferAttribute(eP, 3));
        eGeo.setAttribute("color", new THREE.Float32BufferAttribute(eC, 3));
        eMesh = new THREE.Mesh(eGeo, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
        aGeo = new THREE.BufferGeometry();
        aGeo.setAttribute("position", new THREE.Float32BufferAttribute(aP, 3));
        aGeo.setAttribute("color", new THREE.Float32BufferAttribute(aC, 3));
        aMesh = new THREE.Mesh(aGeo, new THREE.MeshBasicMaterial({ vertexColors: true }));
        group.add(eMesh); group.add(aMesh);
        eGeoRef = eGeo; aGeoRef = aGeo;
        applyHighlight(S.current.closure);
      }
      function applyHighlight(cl) {
        S.current.closure = cl || null;
        const setR = (attr, range, c) => { if (!range) return; const [st, ct] = range; for (let i = 0; i < ct; i++) attr.setXYZ(st + i, c.r, c.g, c.b); attr.needsUpdate = true; };
        for (const e of edges) {
          const on = !cl || cl.edgeSet.has(e.id);
          setR(eGeo.attributes.color, eRange.get(e.id), cl ? (on ? HI : DIM) : baseE);
          setR(aGeo.attributes.color, aRange.get(e.id), cl ? (on ? HI : baseA) : baseA);
        }
        nodeMeshes.forEach((mm) => { mm.material.opacity = !cl || cl.nodeSet.has(mm.userData.nodeId) ? 1 : 0.2; });
        S.current.dirty = true;
      }

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, initNode = null;
      const CHUNK = 50;
      for (let ci = 0; ci < nodes.length; ci += CHUNK) {
        if (cancelled) return;
        const end = Math.min(ci + CHUNK, nodes.length);
        for (let ni = ci; ni < end; ni++) {
          const n = nodes[ni];
          const tex = new THREE.CanvasTexture(drawNode(n, n._sz, th));
          tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.SRGBColorSpace;
          const geo = new THREE.PlaneGeometry(n._sz.w, n._sz.h);
          const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
          mesh.position.set(n.x, -n.y, 0); mesh.userData.nodeId = n.id; mesh.userData.node = n;
          group.add(mesh); nodeMeshes.push(mesh); disposables.push(tex, geo, mesh.material);
          if (n.id === initial) initNode = n;
          minX = Math.min(minX, n.x - n._sz.w / 2); maxX = Math.max(maxX, n.x + n._sz.w / 2);
          minY = Math.min(minY, n.y - n._sz.h / 2); maxY = Math.max(maxY, n.y + n._sz.h / 2);
        }
        if (end < nodes.length) await new Promise((r) => setTimeout(r, 0));
      }
      buildEdges();
      if (!isFinite(minX)) { minX = -100; maxX = 100; minY = -100; maxY = 100; }

      const st = S.current;
      st.cur = st.cur || { x: 0, y: 0, zoom: 1 };
      st.targetZoom = st.cur.zoom; st.focal = null; st.vel = { x: 0, y: 0 }; st.mode = null; st.dirty = true; st.edgesDirty = false;
      const apply = () => { camera.zoom = st.cur.zoom; camera.position.set(st.cur.x, st.cur.y, 10); camera.updateProjectionMatrix(); };
      if (!st.initialized) {
        if (initNode) { st.cur.zoom = 1.15; st.targetZoom = 1.15; st.cur.x = initNode.x + (W * 0.2) / 1.15; st.cur.y = -initNode.y; }
        else { st.cur.x = (minX + maxX) / 2; st.cur.y = -(minY + maxY) / 2; }
        st.initialized = true;
      }
      apply();

      const loop = () => {
        let moved = false;
        if (Math.abs(st.cur.zoom - st.targetZoom) > 1e-4) {
          st.cur.zoom += (st.targetZoom - st.cur.zoom) * 0.2; moved = true;
          if (st.focal) { st.cur.x = st.focal.wx - st.focal.mx / st.cur.zoom; st.cur.y = st.focal.wy + st.focal.my / st.cur.zoom; }
        } else { st.cur.zoom = st.targetZoom; st.focal = null; }
        if (st.mode !== "pan" && (Math.abs(st.vel.x) > 0.02 || Math.abs(st.vel.y) > 0.02)) { st.cur.x -= st.vel.x; st.cur.y += st.vel.y; st.vel.x *= 0.9; st.vel.y *= 0.9; moved = true; }
        if (st.edgesDirty) { buildEdges(); st.edgesDirty = false; moved = true; }
        if (moved || st.dirty) { apply(); renderer.render(scene, camera); st.dirty = false; }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      let lastX = 0, lastY = 0, isDown = false, movedAmt = 0, dragMesh = null;
      const pick = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        const rc = new THREE.Raycaster(); rc.setFromCamera(ndc, camera);
        return rc.intersectObjects(nodeMeshes)[0]?.object || null;
      };
      const onDown = (e) => { isDown = true; lastX = e.clientX; lastY = e.clientY; movedAmt = 0; st.vel = { x: 0, y: 0 }; dragMesh = pick(e); st.mode = dragMesh ? "node" : "pan"; container.style.cursor = "grabbing"; };
      const onMove = (e) => {
        if (!isDown) return;
        const dx = e.clientX - lastX, dy = e.clientY - lastY; movedAmt += Math.abs(dx) + Math.abs(dy);
        if (st.mode === "node" && dragMesh) {
          const n = dragMesh.userData.node;
          n.x += dx / st.cur.zoom; n.y += dy / st.cur.zoom;
          dragMesh.position.set(n.x, -n.y, 0);
          manualPos.current.set(n.id, { x: n.x, y: n.y });
          reroute(n.id);
          st.edgesDirty = true; st.dirty = true;
        } else {
          st.cur.x -= dx / st.cur.zoom; st.cur.y += dy / st.cur.zoom; st.vel = { x: dx / st.cur.zoom, y: dy / st.cur.zoom }; st.dirty = true;
        }
        lastX = e.clientX; lastY = e.clientY;
      };
      const onUp = () => {
        if (isDown && movedAmt < 5) {
          if (dragMesh) { const id = dragMesh.userData.nodeId; applyHighlight(forwardClosure(id, edges)); setSelected(id2.get(id)?.label || id); }
          else { applyHighlight(null); setSelected(null); }
        }
        isDown = false; dragMesh = null; st.mode = null; container.style.cursor = "grab";
      };
      const onWheel = (e) => {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2, my = e.clientY - rect.top - rect.height / 2;
        st.focal = { mx, my, wx: st.cur.x + mx / st.cur.zoom, wy: st.cur.y - my / st.cur.zoom };
        st.targetZoom = Math.min(Math.max(st.targetZoom * Math.exp(-e.deltaY * 0.0014), 0.12), 5);
      };
      container.style.cursor = "grab";
      container.addEventListener("mousedown", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      container.addEventListener("wheel", onWheel, { passive: false });
      cleanupInteraction = () => {
        container.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        container.removeEventListener("wheel", onWheel);
      };

      ro = new ResizeObserver(() => {
        W = container.clientWidth; H = container.clientHeight;
        camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
        camera.updateProjectionMatrix(); renderer.setSize(W, H); st.dirty = true;
      });
      ro.observe(container);

      st.fit = () => { const gw = maxX - minX || 1, gh = maxY - minY || 1, p = 1.12; st.targetZoom = Math.min(W / (gw * p), H / (gh * p), 1.6); st.focal = null; st.cur.x = (minX + maxX) / 2; st.cur.y = -(minY + maxY) / 2; st.dirty = true; };
      st.focusStart = () => { if (!initNode) return st.fit(); st.targetZoom = 1.15; st.focal = null; st.cur.x = initNode.x + (W * 0.2) / 1.15; st.cur.y = -initNode.y; st.dirty = true; };
      st.zoomBy = (f) => { st.targetZoom = Math.min(Math.max(st.targetZoom * f, 0.12), 5); st.focal = null; };
      st.clearSel = () => { applyHighlight(null); setSelected(null); };
      st.resetPos = () => { manualPos.current = new Map(); setGraphData((g) => ({ ...g })); };
      st.nodes = nodes; st.edges = edges; st.th = th; st.title = String(graphData.id || "state-machine");
    })();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (cleanupInteraction) cleanupInteraction();
      if (eGeoRef) eGeoRef.dispose(); if (aGeoRef) aGeoRef.dispose();
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [graphData, themeName]); // eslint-disable-line

  const applyJson = () => { try { setGraphData(JSON.parse(jsonText)); setEditorOpen(false); setSelected(null); } catch (err) { setErrors(["Invalid JSON: " + err.message]); } };

  const u = th.ui;
  const expBtn = (u, th, primary) => ({ flex: 1, padding: "9px 0", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 12, border: `1px solid ${primary ? th.headerRed : u.border}`, background: primary ? th.headerRed : u.btn, color: primary ? "#fff" : u.btnText, fontFamily: FONT_STACK });
  const Btn = ({ children, onClick }) => (
    <button onClick={onClick} style={{ background: u.btn, color: u.btnText, border: `1px solid ${u.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, cursor: "pointer", fontFamily: FONT_STACK }}>{children}</button>
  );
  const Swatch = ({ c, label }) => (<div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: c, display: "inline-block" }} /><span>{label}</span></div>);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: th.bg, fontFamily: FONT_STACK, overflow: "hidden" }}>
      <div style={{ height: 30, background: th.headerRed, color: "#fff", display: "flex", alignItems: "center", padding: "0 14px", fontSize: 12, fontWeight: 700, letterSpacing: 0.3 }}>Values.workflow.work…</div>

      <div style={{ position: "absolute", top: 40, right: 12, zIndex: 5, display: "flex", gap: 6, alignItems: "center" }}>
        <button onClick={() => setThemeName((t) => (t === "light" ? "dark" : "light"))}
          style={{ background: u.btn, color: u.btnText, border: `1px solid ${u.border}`, borderRadius: 16, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: FONT_STACK }}>
          {themeName === "light" ? "◐ Light" : "◑ Dark"}
        </button>
        <Btn onClick={() => setEditorOpen((o) => !o)}>Edit JSON</Btn>
        <Btn onClick={() => setExportOpen((o) => !o)}>Export / Print</Btn>
        <Btn onClick={() => S.current.focusStart?.()}>Start</Btn>
        <Btn onClick={() => S.current.fit?.()}>Fit</Btn>
        <Btn onClick={() => S.current.resetPos?.()}>Reset layout</Btn>
        <Btn onClick={() => S.current.zoomBy?.(1.2)}>+</Btn>
        <Btn onClick={() => S.current.zoomBy?.(0.8)}>−</Btn>
        {selected && <Btn onClick={() => S.current.clearSel?.()}>Clear</Btn>}
      </div>

      <div ref={mountRef} style={{ position: "absolute", top: 30, left: 0, right: 0, bottom: 0 }} />

      {selected && (
        <div style={{ position: "absolute", top: 80, right: 12, zIndex: 5, background: u.panel, border: `1px solid ${u.border}`, color: u.text, borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
          Forward paths from <b style={{ color: th.edgeHi }}>{selected}</b>
        </div>
      )}

      <div style={{ position: "absolute", bottom: 12, right: 12, zIndex: 5, display: "flex", flexDirection: "column", gap: 5, background: u.panel, border: `1px solid ${u.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 11, color: u.subt }}>
        <Swatch c={th.initial} label="Initial" />
        <Swatch c={th.endOk} label="End — OK (✓)" />
        <Swatch c={th.endErr} label="End — KO / error (✕)" />
        <Swatch c={th.forkBar} label="Fork / Join (drag to arrange)" />
        <Swatch c={th.choiceAccent} label="Choice" />
        <Swatch c={th.transFill} label="Transition" />
      </div>

      {errors.length > 0 && (
        <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 5, maxWidth: 420, background: "rgba(227,6,19,.12)", border: "1px solid rgba(227,6,19,.5)", color: "#c0202c", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
          {errors.slice(0, 6).map((e, i) => <div key={i}>• {e}</div>)}
        </div>
      )}

      {toast && (
        <div style={{ position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)", zIndex: 8, background: "#1c1f24", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 12, boxShadow: "0 6px 24px rgba(0,0,0,.4)", maxWidth: 460, textAlign: "center" }}>{toast}</div>
      )}

      {exportOpen && (
        <div style={{ position: "absolute", top: 80, right: 12, zIndex: 7, width: 300, background: u.panel, border: `1px solid ${u.border}`, borderRadius: 10, boxShadow: "0 10px 40px rgba(0,0,0,.35)", color: u.text, fontSize: 13, overflow: "hidden" }}>
          <div style={{ padding: "11px 14px", fontWeight: 700, borderBottom: `1px solid ${u.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Export &amp; Print</span>
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
            <div style={{ color: u.subt, fontSize: 11, lineHeight: 1.5 }}>
              Orientation &amp; scale are chosen automatically to best fit the page. PDF is true vector (needs <code>jspdf</code> + <code>svg2pdf.js</code>).
            </div>
          </div>
        </div>
      )}

      {editorOpen && (
        <div style={{ position: "absolute", top: 40, left: 12, zIndex: 6, width: 380, bottom: 12, background: u.panel, border: `1px solid ${u.border}`, borderRadius: 10, display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,.35)" }}>
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
