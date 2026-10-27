"use client";

import { SkeuoButton } from "@/components/skeuomorphic/skeuo-button";
import { SkeuoSurface } from "@/components/skeuomorphic/skeuo-surface";
import type { DashboardLanguage } from "./dashboard-shell";

const say = (language: DashboardLanguage, english: string, hindi: string) => language === "hi" ? hindi : english;

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <SkeuoSurface className="signal-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></SkeuoSurface>;
}

function SignalDashboard({ language }: { language: DashboardLanguage }) {
  return <>
    <div className="tpl-dash-heading">
      <div><span>{say(language, "AUDIENCE SNAPSHOT", "दर्शक अवलोकन")}</span><h1>{say(language, "A clearer picture of growth.", "विकास की साफ़ तस्वीर।")}</h1><p>{say(language, "The numbers that tell you what is working, all in one place.", "जो काम कर रहा है, उसकी ज़रूरी जानकारी एक जगह।")}</p></div>
      <SkeuoButton variant="primary" onClick={() => document.getElementById("signal-report")?.scrollIntoView({ behavior: "smooth" })}>{say(language, "Explore performance", "प्रदर्शन देखें")} ↗</SkeuoButton>
    </div>
    <div className="signal-metrics">
      <Metric label={say(language, "TOTAL VISITORS", "कुल दर्शक")} value="48,290" detail="↗ 12.8%" />
      <Metric label={say(language, "ACTIVE SESSIONS", "सक्रिय सत्र")} value="1,284" detail="↗ 8.2%" />
      <Metric label={say(language, "CONVERSION", "रूपांतरण")} value="4.83%" detail="↗ 2.1%" />
      <Metric label={say(language, "AVERAGE DURATION", "औसत समय")} value="3m 42s" detail="↗ 0.6%" />
    </div>
    <div className="signal-layout">
      <SkeuoSurface className="signal-chart-panel" id="signal-report">
        <div className="tpl-panel-header"><div><span>{say(language, "PERFORMANCE", "प्रदर्शन")}</span><h2>{say(language, "Audience over time", "समय के साथ दर्शक")}</h2></div><span>{say(language, "Last 30 days", "पिछले 30 दिन")}</span></div>
        <div className="signal-chart" role="img" aria-label="Illustrative upward visitor trend over 30 days"><div className="signal-chart-bars">{[25,38,32,50,41,47,58,53,62,57,68,60,71,65,82,77,72,88,79,91,86,95].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="signal-chart-grid" /></div>
        <div className="tpl-chart-labels"><span>01 OCT</span><span>08 OCT</span><span>15 OCT</span><span>22 OCT</span><span>29 OCT</span></div>
      </SkeuoSurface>
      <SkeuoSurface className="signal-sources" id="signal-sources">
        <div className="tpl-panel-header"><div><span>{say(language, "DISCOVERY", "पहुँच")}</span><h2>{say(language, "Where people arrive", "लोग कहाँ से आते हैं")}</h2></div><span>↗</span></div>
        {[[say(language, "Direct", "सीधे"), "42%"], [say(language, "Search", "खोज"), "31%"], [say(language, "Social", "सोशल"), "18%"], [say(language, "Other", "अन्य"), "9%"]].map(([label, value]) => <div className="signal-source" key={label}><div><span>{label}</span><strong>{value}</strong></div><div><i style={{ width: value }} /></div></div>)}
      </SkeuoSurface>
    </div>
    <section className="tpl-dash-lower" id="signal-activity"><div><span>{say(language, "RECENT ACTIVITY", "हाल की गतिविधि")}</span><h2>{say(language, "What just happened.", "अभी क्या हुआ।")}</h2></div><div className="tpl-activity-row"><span className="tpl-activity-icon">↗</span><span>{say(language, "Visitors are up from last week.", "पिछले सप्ताह से दर्शक बढ़े हैं।")}</span><small>{say(language, "2 minutes ago", "2 मिनट पहले")}</small></div><div className="tpl-activity-row"><span className="tpl-activity-icon">✳</span><span>{say(language, "October report is ready to review.", "अक्टूबर की रिपोर्ट तैयार है।")}</span><small>{say(language, "1 hour ago", "1 घंटे पहले")}</small></div></section>
  </>;
}

function LedgerDashboard({ language }: { language: DashboardLanguage }) {
  return <>
    <div className="tpl-dash-heading"><div><span>{say(language, "YOUR MONEY, IN VIEW", "आपका पैसा, साफ़ नज़र में")}</span><h1>{say(language, "A calmer look at money.", "पैसे पर एक शांत नज़र।")}</h1><p>{say(language, "What came in, what went out, and what you are making room for.", "क्या आया, क्या गया और आगे किसके लिए जगह बन रही है।")}</p></div><SkeuoButton variant="primary" onClick={() => document.getElementById("ledger-activity")?.scrollIntoView({ behavior: "smooth" })}>{say(language, "See activity", "गतिविधि देखें")} ↗</SkeuoButton></div>
    <div className="ledger-balance"><div><span>{say(language, "TOTAL BALANCE", "कुल शेष")}</span><strong>$28,640<span>.80</span></strong><p>{say(language, "Across all connected accounts", "सभी जुड़े खातों में")} <b>↗ 8.4% {say(language, "this month", "इस महीने")}</b></p></div><div className="ledger-balance-ornament" aria-hidden="true">$</div></div>
    <div className="ledger-layout">
      <SkeuoSurface className="ledger-spend" id="ledger-spend"><div className="tpl-panel-header"><div><span>{say(language, "THE BIG PICTURE", "बड़ी तस्वीर")}</span><h2>{say(language, "Money in motion", "पैसे की चाल")}</h2></div><span>{say(language, "This month", "इस महीने")}</span></div><div className="ledger-visual"><div className="ledger-ring"><div><span>{say(language, "AVAILABLE TO SPEND", "खर्च के लिए उपलब्ध")}</span><strong>$4,280</strong><small>{say(language, "of $6,500 planned", "$6,500 की योजना में")}</small></div></div><div className="ledger-legend"><span><i /> {say(language, "Essentials", "ज़रूरी")} <b>$1,460</b></span><span><i /> {say(language, "Living", "रहन-सहन")} <b>$580</b></span><span><i /> {say(language, "Future", "भविष्य")} <b>$180</b></span></div></div></SkeuoSurface>
      <SkeuoSurface className="ledger-goals" id="ledger-goals"><div className="tpl-panel-header"><div><span>{say(language, "LOOKING AHEAD", "आगे की योजना")}</span><h2>{say(language, "Little goals, big plans.", "छोटे लक्ष्य, बड़ी योजनाएँ।")}</h2></div><span>↗</span></div>{[[say(language, "Summer away", "गर्मियों की यात्रा"), "72%", "$3,600 / $5,000"], [say(language, "Rainy day", "आपात निधि"), "48%", "$2,400 / $5,000"], [say(language, "New setup", "नया सेटअप"), "31%", "$620 / $2,000"]].map(([label, width, value]) => <div className="ledger-goal" key={label}><div><strong>{label}</strong><span>{value}</span></div><div><i style={{ width }} /></div></div>)}</SkeuoSurface>
    </div>
    <section className="tpl-dash-lower" id="ledger-activity"><div><span>{say(language, "TRANSACTIONS", "लेनदेन")}</span><h2>{say(language, "The recent stuff.", "हाल का हिसाब।")}</h2></div>{[["✳", say(language, "A little coffee", "कॉफ़ी"), say(language, "Today", "आज"), "−$6.50"], ["↗", say(language, "Studio payment", "स्टूडियो भुगतान"), say(language, "Yesterday", "कल"), "+$2,400"], ["◌", say(language, "Weekend groceries", "सप्ताहांत की खरीदारी"), "Oct 25", "−$84.20"]].map(([icon, label, date, value]) => <div className="tpl-activity-row" key={label}><span className="tpl-activity-icon">{icon}</span><span>{label}</span><small>{date}</small><strong>{value}</strong></div>)}</section>
  </>;
}

const board = [
  { title: "On the horizon", titleHi: "आगे आने वाला", tone: "warm", cards: [["New beginnings", "Map the next release", "Product"], ["A fresh look", "Explore visual directions", "Design"]] },
  { title: "In motion", titleHi: "काम जारी है", tone: "blue", cards: [["The little details", "Polish dashboard states", "Interface"], ["Share the story", "Draft launch notes", "Writing"]] },
  { title: "Nearly there", titleHi: "लगभग तैयार", tone: "green", cards: [["Home stretch", "Final review with the team", "Review"], ["One more pass", "Responsive checks", "Quality"]] },
];

function OrbitDashboard({ language }: { language: DashboardLanguage }) {
  return <>
    <div className="tpl-dash-heading"><div><span>{say(language, "STUDIO NORTH / THIS WEEK", "स्टूडियो नॉर्थ / इस सप्ताह")}</span><h1>{say(language, "Keep the good work moving.", "अच्छा काम आगे बढ़ता रहे।")}</h1><p>{say(language, "A shared place for the people, projects, and details that matter.", "लोगों, परियोजनाओं और ज़रूरी बातों की साझा जगह।")}</p></div><SkeuoButton variant="primary" onClick={() => document.getElementById("orbit-board")?.scrollIntoView({ behavior: "smooth" })}>{say(language, "Open the board", "बोर्ड खोलें")} ↗</SkeuoButton></div>
    <div className="orbit-summary"><SkeuoSurface><span>{say(language, "IN MOTION", "काम जारी है")}</span><strong>12</strong><small>{say(language, "Open tasks across 3 projects", "3 परियोजनाओं में खुले काम")}</small></SkeuoSurface><SkeuoSurface><span>{say(language, "DONE THIS WEEK", "इस सप्ताह पूरे")}</span><strong>08</strong><small>{say(language, "Nice work, keep it going", "अच्छा काम, जारी रखें")}</small></SkeuoSurface><SkeuoSurface><span>{say(language, "UP NEXT", "आगे")}</span><strong>03</strong><small>{say(language, "Things on the horizon", "आने वाले काम")}</small></SkeuoSurface></div>
    <section className="orbit-board-section" id="orbit-board"><div className="orbit-board-heading"><div><span>{say(language, "THE BOARD", "बोर्ड")}</span><h2>{say(language, "What we are making.", "हम क्या बना रहे हैं।")}</h2></div><span>{say(language, "3 active projects", "3 सक्रिय परियोजनाएँ")}</span></div><div className="orbit-board">{board.map((column) => <section className={`orbit-column orbit-${column.tone}`} key={column.title}><header><h3>{language === "hi" ? column.titleHi : column.title}</h3><span>02</span></header>{column.cards.map(([title, copy, tag]) => <SkeuoSurface key={title}><span>{tag}</span><h4>{title}</h4><p>{copy}</p><div className="orbit-card-footer"><span>◉ ◉</span><small>↗</small></div></SkeuoSurface>)}</section>)}</div></section>
    <div className="orbit-detail-grid"><SkeuoSurface id="orbit-team"><span>{say(language, "THE TEAM", "टीम")}</span><h2>{say(language, "Better together.", "साथ में बेहतर।")}</h2><p>{say(language, "Four people are making the next release happen.", "चार लोग मिलकर अगली रिलीज़ बना रहे हैं।")}</p><div className="orbit-team-faces"><i>RD</i><i>AM</i><i>SK</i><i>JL</i></div></SkeuoSurface><SkeuoSurface id="orbit-timeline"><span>{say(language, "UP NEXT", "आगे")}</span><h2>{say(language, "The week ahead.", "आने वाला सप्ताह।")}</h2><div className="orbit-timeline-row"><time>MON</time><span>{say(language, "Design review", "डिज़ाइन समीक्षा")}</span></div><div className="orbit-timeline-row"><time>WED</time><span>{say(language, "Release check", "रिलीज़ जाँच")}</span></div><div className="orbit-timeline-row"><time>FRI</time><span>{say(language, "Share the update", "अपडेट साझा करें")}</span></div></SkeuoSurface></div>
  </>;
}

export function DashboardOverview({ name, language }: { name: string; language: DashboardLanguage }) {
  if (name === "signal") return <SignalDashboard language={language} />;
  if (name === "ledger") return <LedgerDashboard language={language} />;
  return <OrbitDashboard language={language} />;
}
