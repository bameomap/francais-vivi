import { useState, useRef, useEffect } from "react";
import { C, THEMES } from "../constants.js";
import { getStreak, getProgress, getMistakes } from "../utils/storage.js";
import { getSRSStats } from "../utils/srs.js";
import { getXPData, getLevel, getNextLevel, LEVELS } from "../utils/xp.js";
import { computeOverallProgress } from "../utils/parcours.js";
import { getSyncToken, setSyncToken, clearSyncToken, pushToCloud, pullFromCloud } from "../utils/cloudSync.js";

// ── Keys that should be backed up / restored ──────────────────
const BACKUP_KEYS = [
  "srs_data", "module_progress", "streak_data", "xp_data", "badges_earned",
  "vocab_sets", "mistake_log", "weak_spots_log", "study_history",
  "writing_history", "defi_history", "analyse_history", "parcours_last_unit",
  "pour_note_expansions_v2", "grammar_last_unit", "user_name", "onboarded",
];
// Also back up dynamic lecture cache keys (lecture_cache_*)
function collectBackup() {
  const data = {};
  for (const key of BACKUP_KEYS) {
    const v = localStorage.getItem(key);
    if (v !== null) data[key] = v;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("lecture_cache_")) data[k] = localStorage.getItem(k);
  }
  return data;
}
function applyRestore(data) {
  for (const [key, value] of Object.entries(data)) {
    try { localStorage.setItem(key, value); } catch {}
  }
}

// ── ProfilPanel · Hub cá nhân ─────────────────────────────────
export default function ProfilPanel({ userName, onChangeName, dark, toggleDark, themeId, onChangeTheme, onNavigate }) {
  const streakData = getStreak();
  const srsStats   = getSRSStats();
  const xpData     = getXPData();
  const [backupMsg, setBackupMsg] = useState("");
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = collectBackup();
    const keyCount = Object.keys(data).length;
    const json = JSON.stringify({ version: 1, ts: Date.now(), data }, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vivi-francais-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    setBackupMsg(`✅ Đã tải ${keyCount} mục dữ liệu`);
    setTimeout(() => setBackupMsg(""), 3000);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const payload = parsed.version === 1 ? parsed.data : parsed;
        applyRestore(payload);
        setBackupMsg(`✅ Đã khôi phục ${Object.keys(payload).length} mục — tải lại trang để thấy thay đổi`);
        setTimeout(() => window.location.reload(), 1800);
      } catch {
        setBackupMsg("❌ File không hợp lệ. Thử lại nhé!");
        setTimeout(() => setBackupMsg(""), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  // ── Cloud sync state ────────────────────────────────────────────
  const [syncToken, setSyncTokenState] = useState(getSyncToken);
  const [syncMsg,   setSyncMsg]        = useState("");
  const [syncing,   setSyncing]        = useState(false);

  const showSyncMsg = (msg, ms = 4000) => {
    setSyncMsg(msg);
    setTimeout(() => setSyncMsg(""), ms);
  };

  const handleSyncPush = async () => {
    setSyncing(true);
    try {
      const r = await pushToCloud(syncToken);
      showSyncMsg(`☁️ Đã lưu ${r.keys} mục lên cloud (${new Date(r.ts).toLocaleTimeString("vi-VN")})`);
    } catch (e) {
      showSyncMsg(e.message === "UNAUTHORIZED" ? "❌ Token sai — kiểm tra lại" : "❌ Lỗi kết nối. Thử lại nhé!");
    } finally { setSyncing(false); }
  };

  const handleSyncPull = async () => {
    setSyncing(true);
    try {
      const r = await pullFromCloud(syncToken);
      if (r.empty) { showSyncMsg("☁️ Chưa có dữ liệu trên cloud."); setSyncing(false); return; }
      showSyncMsg(`✅ Đã khôi phục ${r.applied} mục — tải lại trang…`);
      setTimeout(() => window.location.reload(), 1800);
    } catch (e) {
      showSyncMsg(e.message === "UNAUTHORIZED" ? "❌ Token sai — kiểm tra lại" : "❌ Lỗi kết nối. Thử lại nhé!");
    } finally { setSyncing(false); }
  };

  const handleSaveToken = (val) => {
    setSyncTokenState(val);
    setSyncToken(val);
    showSyncMsg(val ? "🔑 Token đã lưu" : "🗑 Token đã xóa", 2000);
  };

  const overall    = computeOverallProgress();
  const mistakes   = getMistakes();
  const progress   = getProgress();
  const lvl        = getLevel(xpData.total || 0);
  const nextLvl    = getNextLevel(xpData.total || 0);

  // Derive rough skill % from module usage counts (capped at 100)
  const skillPct = (modules) => {
    const total = modules.reduce((s, m) => s + (progress[m]?.count || 0), 0);
    return Math.min(100, Math.round(total * 8)); // ~12 sessions = 100%
  };
  const skills = [
    { l: "Lire",     pct: skillPct(["lecture"]),                   c: "#4A90D9" },
    { l: "Écouter",  pct: skillPct(["dictee","listening","ecouter"]), c: "#7B6CF6" },
    { l: "Parler",   pct: skillPct(["conversation"]),              c: "#E67E22" },
    { l: "Écrire",   pct: skillPct(["writing"]),                   c: "#10B981" },
  ];

  // 7-day pips
  const streak = streakData.streak || 0;
  const pips = Math.min(streak, 7);

  const avatarLetter = (userName || "V").charAt(0).toUpperCase();

  // CEFR approximation from parcours
  const cefrPct = Math.round((overall.done / Math.max(overall.total, 1)) * 100);

  return (
    <div style={{ padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: 0, animation: "fadeUp 0.3s ease" }}>

      {/* ── Identity card ── */}
      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 16, padding: 14, marginBottom: 14,
        display: "flex", alignItems: "center", gap: 12
      }}>
        {/* Avatar */}
        <div style={{
          width: 54, height: 54, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark || "#1B3A6B"})`,
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 22,
          letterSpacing: "-0.02em", flexShrink: 0,
          boxShadow: `0 4px 12px ${C.blue}33`
        }}>
          {avatarLetter}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18,
            fontWeight: 700, color: C.ink, lineHeight: 1.1, letterSpacing: "-0.01em",
            display: "flex", alignItems: "center", gap: 6
          }}>
            <span>{userName || "Bạn"}</span>
            {onChangeName && (
              <button
                aria-label="Đổi tên hiển thị"
                onClick={() => {
                  const name = window.prompt("Tên của bạn:", userName || "");
                  if (name !== null) onChangeName(name);
                }}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: C.gray, fontSize: 13, padding: 2, lineHeight: 1 }}>
                ✎
              </button>
            )}
          </div>
          <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>
            Đang học Français · A1
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, fontWeight: 700,
              background: C.blueL, color: C.blueDark || C.blue,
              padding: "2px 7px", borderRadius: 4, letterSpacing: "0.05em"
            }}>A1 · {cefrPct}%</span>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, fontWeight: 700,
              background: C.goldL || "#FEF9EC", color: "#8A5500",
              padding: "2px 7px", borderRadius: 4, letterSpacing: "0.05em"
            }}>{lvl.icon} {lvl.label} · {xpData.total || 0} XP</span>
          </div>
        </div>
      </div>

      {/* ── Streak strip ── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.accent} 0%, #C7402E 100%)`,
        borderRadius: 14, padding: "12px 14px", marginBottom: 14,
        color: "#fff", display: "flex", alignItems: "center", gap: 12,
        boxShadow: `0 6px 18px ${C.accent}33`,
        position: "relative", overflow: "hidden"
      }}>
        {/* Watermark fire */}
        <div style={{ position: "absolute", right: -20, top: -20, fontSize: 90, opacity: 0.12, lineHeight: 1, pointerEvents: "none" }}>🔥</div>
        <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>🔥</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20,
            fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em"
          }}>
            {streak} ngày streak
          </div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 3 }}>
            {streak === 0 ? "Bắt đầu streak hôm nay! 💪" :
             streak >= 7  ? `Fantastique! ${streak} ngày liên tiếp 🎉` :
                            `Tiếp tục chuỗi ${streak} ngày nhé~ ✨`}
          </div>
        </div>
        {/* Day pips */}
        {pips > 0 && (
          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
            {Array.from({ length: pips }).map((_, i) => (
              <div key={i} style={{
                width: 5, height: 16,
                background: "rgba(255,255,255,0.85)",
                borderRadius: 2
              }}/>
            ))}
          </div>
        )}
      </div>

      {/* ── Section label ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Vòng ôn tập
      </div>

      {/* ── Loop cards (2-col) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {/* SRS card */}
        <button onClick={() => onNavigate("srs", "srs")}
          style={{
            background: C.white, border: `1.5px solid ${C.gold}`,
            borderRadius: 14, padding: "12px 14px",
            position: "relative", overflow: "hidden",
            boxShadow: `0 4px 12px ${C.gold}22`,
            textAlign: "left", cursor: "pointer", fontFamily: "inherit"
          }}>
          {srsStats.due > 0 && (
            <div style={{
              position: "absolute", top: 8, right: 8,
              background: C.gold, color: "#fff",
              fontSize: 9.5, fontWeight: 700, padding: "2px 6px",
              borderRadius: 999, letterSpacing: "0.05em"
            }}>{srsStats.due} cần ôn</div>
          )}
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: C.gold, letterSpacing: "-0.02em", lineHeight: 1 }}>
            ↻
          </div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 15, color: C.ink, marginTop: 6, lineHeight: 1.1 }}>
            Ôn từ vựng
          </div>
          <div style={{ fontSize: 10.5, color: C.gray, marginTop: 2 }}>
            {srsStats.total} từ · {srsStats.due} đến hạn
          </div>
        </button>

        {/* Revision / weak spots card */}
        <button onClick={() => onNavigate("revision", "revision")}
          style={{
            background: C.white, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: "12px 14px",
            position: "relative", overflow: "hidden",
            textAlign: "left", cursor: "pointer", fontFamily: "inherit"
          }}>
          {mistakes.length > 0 && (
            <div style={{
              position: "absolute", top: 8, right: 8,
              background: C.accentL || C.redL, color: C.accent,
              fontSize: 9.5, fontWeight: 700, padding: "2px 6px",
              borderRadius: 999, letterSpacing: "0.05em"
            }}>{mistakes.length} lỗi</div>
          )}
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: C.accent, letterSpacing: "-0.02em", lineHeight: 1 }}>
            ✕
          </div>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 15, color: C.ink, marginTop: 6, lineHeight: 1.1 }}>
            Hay sai
          </div>
          <div style={{ fontSize: 10.5, color: C.gray, marginTop: 2 }}>
            Pattern lặp lại
          </div>
        </button>
      </div>

      {/* ── Section label ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Thống kê
      </div>

      {/* ── Stats summary row ── */}
      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: "12px 14px", marginBottom: 8,
        display: "flex", alignItems: "center", gap: 0
      }}>
        {[
          { v: srsStats.mastered,              l: "từ thuộc",   c: C.green  },
          { v: `${srsStats.total}`,            l: "từ đang học", c: C.blue   },
          { v: `${overall.done}/${overall.total}`, l: "units",  c: C.accent },
        ].map((s, i, arr) => (
          <div key={i} style={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, fontWeight: 700, color: s.c, lineHeight: 1, letterSpacing: "-0.01em" }}>
              {s.v}
            </div>
            <div style={{ fontSize: 9.5, color: C.gray, marginTop: 3, letterSpacing: "0.02em" }}>
              {s.l}
            </div>
            {i < arr.length - 1 && (
              <div style={{ position: "absolute" }}/>
            )}
          </div>
        ))}
      </div>

      {/* ── 4-skill progress bars ── */}
      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: "10px 14px 12px", marginBottom: 14
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: C.gray, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>4 kỹ năng</span>
          <button onClick={() => onNavigate("stats", "stats")}
            style={{ fontSize: 11, color: C.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Chi tiết →
          </button>
        </div>
        {skills.map((s) => (
          <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700, fontSize: 12, color: s.c, width: 52, flexShrink: 0 }}>
              {s.l}
            </div>
            <div style={{ flex: 1, height: 4, background: C.borderSoft || "#EEF2FA", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.pct || 2}%`, background: s.c, borderRadius: 999 }}/>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: C.gray, width: 26, textAlign: "right" }}>
              {s.pct}%
            </div>
          </div>
        ))}
      </div>

      {/* ── Section label ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
        Cài đặt
      </div>

      {/* ── Settings rows ── */}
      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderRadius: 14, overflow: "hidden"
      }}>
        {/* Dark mode row — functional */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "11px 14px",
          borderBottom: `1px solid ${C.borderSoft || "#EEF2FA"}`
        }}>
          <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0, color: C.gray }}>
            {dark ? "☀️" : "🌙"}
          </span>
          <span style={{ flex: 1, fontSize: 13, color: C.ink }}>Chế độ tối</span>
          <button onClick={toggleDark}
            style={{
              width: 40, height: 22, borderRadius: 999,
              background: dark ? C.blue : C.borderSoft || "#EEF2FA",
              border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s",
              flexShrink: 0
            }}>
            <div style={{
              position: "absolute", top: 3, left: dark ? 21 : 3,
              width: 16, height: 16, borderRadius: "50%",
              background: dark ? "#fff" : C.gray2 || "#9CA3AF",
              transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
            }}/>
          </button>
        </div>

        {/* Theme picker — kiểu knitlog: grid swatch màu */}
        {onChangeTheme && (
          <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.borderSoft || "#EEF2FA"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>🎨</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: C.ink }}>Bảng màu</div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 1 }}>Chọn màu chủ đạo cho toàn app</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {THEMES.map(t => {
                const active = themeId === t.id;
                return (
                  <button key={t.id} onClick={() => onChangeTheme(t.id)}
                    aria-label={`Bảng màu ${t.label}`} title={t.label}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      padding: "8px 2px 6px", borderRadius: 12, cursor: "pointer",
                      background: active ? C.blueL : "transparent",
                      border: `1.5px solid ${active ? t.swatch : C.border}`,
                      boxShadow: active ? `0 4px 12px ${t.swatch}44` : "none",
                      fontFamily: "inherit", transition: "all 0.15s",
                    }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%", background: t.swatch,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.12)",
                    }}>{t.emoji}</span>
                    <span style={{ fontSize: 9, color: active ? C.ink : C.gray, fontWeight: active ? 700 : 500, lineHeight: 1.1, textAlign: "center" }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Placeholder rows */}
        {[
          { i: "🎯", l: "Mục tiêu ngày",         r: "10 phút" },
          { i: "🌐", l: "Ngôn ngữ giao diện",     r: "Tiếng Việt" },
          { i: "ⓘ",  l: "Về Vivi",                r: "v0.4" },
        ].map((s, i, arr) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px",
            borderBottom: i < arr.length - 1 ? `1px solid ${C.borderSoft || "#EEF2FA"}` : "none"
          }}>
            <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0, color: C.gray }}>{s.i}</span>
            <span style={{ flex: 1, fontSize: 13, color: C.ink }}>{s.l}</span>
            <span style={{ fontSize: 11.5, color: C.gray, flexShrink: 0 }}>{s.r}</span>
            <span style={{ fontSize: 14, color: C.gray2 || "#9CA3AF", flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>

      {/* ── Backup / Restore ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, marginTop: 20 }}>
        Sao lưu dữ liệu
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        {/* Export */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: `1px solid ${C.borderSoft || "#EEF2FA"}` }}>
          <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>💾</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: C.ink, fontWeight: 600 }}>Xuất dữ liệu</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>Tải file .json về máy để sao lưu tiến độ</div>
          </div>
          <button onClick={handleExport}
            style={{ padding: "0.28rem 0.8rem", background: C.blue, color: "#fff", border: "none", borderRadius: 20, fontSize: "0.72rem", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}>
            ⬇ Xuất
          </button>
        </div>
        {/* Import */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px" }}>
          <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>📂</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: C.ink, fontWeight: 600 }}>Khôi phục dữ liệu</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>Chọn file .json đã xuất để khôi phục</div>
          </div>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
          <button onClick={() => fileInputRef.current?.click()}
            style={{ padding: "0.28rem 0.8rem", background: "transparent", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 20, fontSize: "0.72rem", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}>
            ⬆ Nhập
          </button>
        </div>
      </div>

      {/* Feedback toast (local backup) */}
      {backupMsg && (
        <div style={{ marginTop: 8, padding: "0.5rem 0.75rem", background: backupMsg.startsWith("✅") ? C.greenL : C.redL, border: `1px solid ${backupMsg.startsWith("✅") ? C.green : C.red}44`, borderRadius: 10, fontSize: "0.75rem", color: backupMsg.startsWith("✅") ? C.green : C.red, lineHeight: 1.5 }}>
          {backupMsg}
        </div>
      )}

      {/* ── Cloud Sync ── */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, marginTop: 20 }}>
        Đồng bộ đám mây ☁️
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Token input */}
        <div>
          <div style={{ fontSize: 12, color: C.gray, marginBottom: 5 }}>🔑 Sync Token (xem trong Settings → Environment Variables)</div>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              type="password"
              value={syncToken}
              onChange={e => setSyncTokenState(e.target.value)}
              placeholder="Nhập token bí mật..."
              style={{ flex: 1, padding: "0.35rem 0.6rem", border: `1.5px solid ${syncToken ? C.blue : C.border}`, borderRadius: 8, fontSize: "0.75rem", fontFamily: "inherit", background: C.white, color: C.ink, outline: "none" }}
            />
            <button onClick={() => handleSaveToken(syncToken)}
              style={{ padding: "0.3rem 0.7rem", background: C.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: "0.72rem", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}>
              Lưu
            </button>
            {syncToken && (
              <button onClick={() => handleSaveToken("")}
                style={{ padding: "0.3rem 0.6rem", background: "transparent", color: C.gray, border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: "0.72rem", cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
                ✕
              </button>
            )}
          </div>
        </div>
        {/* Sync buttons */}
        {syncToken && (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSyncPush} disabled={syncing}
              style={{ flex: 1, padding: "0.5rem", background: C.blue, color: "#fff", border: "none", borderRadius: 10, fontSize: "0.78rem", cursor: syncing ? "default" : "pointer", fontWeight: 600, fontFamily: "inherit", opacity: syncing ? 0.6 : 1 }}>
              {syncing ? "⏳ Đang xử lý..." : "⬆ Lưu lên cloud"}
            </button>
            <button onClick={handleSyncPull} disabled={syncing}
              style={{ flex: 1, padding: "0.5rem", background: "transparent", color: C.blue, border: `1.5px solid ${C.blue}`, borderRadius: 10, fontSize: "0.78rem", cursor: syncing ? "default" : "pointer", fontWeight: 600, fontFamily: "inherit", opacity: syncing ? 0.6 : 1 }}>
              {syncing ? "⏳ Đang xử lý..." : "⬇ Kéo từ cloud"}
            </button>
          </div>
        )}
        {!syncToken && (
          <div style={{ fontSize: "0.72rem", color: C.gray, lineHeight: 1.6 }}>
            Nhập token để đồng bộ dữ liệu tự động giữa các thiết bị. Token nằm trong Vercel Dashboard → Settings → Environment Variables → <b>SYNC_SECRET</b>.
          </div>
        )}
      </div>

      {/* Cloud sync feedback */}
      {syncMsg && (
        <div style={{ marginTop: 8, padding: "0.5rem 0.75rem", background: syncMsg.startsWith("❌") ? C.redL : C.greenL, border: `1px solid ${syncMsg.startsWith("❌") ? C.red : C.green}44`, borderRadius: 10, fontSize: "0.75rem", color: syncMsg.startsWith("❌") ? C.red : C.green, lineHeight: 1.5 }}>
          {syncMsg}
        </div>
      )}

      <div style={{ height: 16 }}/>
    </div>
  );
}
