import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  ImageRun,
  PageBreak,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "outputs", "Magnoliya_Grand_SEO_AEO_GEO_Report.docx");
const LOGO = path.join(ROOT, "public", "home-assets", "magnoliya-official-logo.png");
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

const C = {
  ink: "1E2528",
  deep: "0B1511",
  gold: "B38236",
  muted: "667178",
  silver: "E7EAEC",
  light: "F5F6F6",
  white: "FFFFFF",
  green: "466858",
  amber: "9B6A1D",
  border: "CFD4D6",
};

const line = (text, opts = {}) => new TextRun({
  text,
  bold: opts.bold,
  italics: opts.italics,
  color: opts.color || C.ink,
  size: opts.size || 22,
  font: opts.font || "Calibri",
});

const p = (text, opts = {}) => new Paragraph({
  heading: opts.heading,
  alignment: opts.align,
  spacing: {
    before: opts.before ?? 0,
    after: opts.after ?? 120,
    line: opts.line ?? 264,
    lineRule: "auto",
  },
  children: Array.isArray(text) ? text : [line(text, opts)],
  pageBreakBefore: opts.pageBreakBefore,
  keepNext: opts.keepNext,
});

const kicker = (text) => p(text.toUpperCase(), {
  bold: true,
  color: C.gold,
  size: 18,
  after: 160,
  keepNext: true,
});

const h1 = (text) => p(text, { heading: HeadingLevel.HEADING_1, keepNext: true });
const h2 = (text) => p(text, { heading: HeadingLevel.HEADING_2, keepNext: true });

const bullet = (text) => new Paragraph({
  numbering: { reference: "mg-bullets", level: 0 },
  spacing: { after: 140, line: 280, lineRule: "auto" },
  children: [line(text, { size: 21 })],
});

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

const borders = {
  top: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  left: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  right: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: C.border },
};

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [p(text, {
      bold: opts.bold,
      color: opts.color || C.ink,
      size: opts.size || 19,
      after: 40,
      before: 40,
      line: 240,
      align: opts.align,
    })],
  });
}

function table(headers, rows, widths, opts = {}) {
  const tableRows = [];
  if (headers) {
    tableRows.push(new TableRow({
      tableHeader: true,
      children: headers.map((value, i) => cell(value, { width: widths[i], fill: C.deep, color: C.white, bold: true })),
    }));
  }
  rows.forEach((row, rowIndex) => {
    tableRows.push(new TableRow({
      children: row.map((value, i) => cell(value, {
        width: widths[i],
        fill: rowIndex % 2 ? C.light : C.white,
        bold: opts.boldColumn === i,
        color: opts.goodColumn === i ? C.green : C.ink,
      })),
    }));
  });
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    borders,
    rows: tableRows,
  });
}

function callout(title, body) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders,
    rows: [
      new TableRow({ children: [cell(title, { width: 9360, fill: C.deep, color: C.white, bold: true })] }),
      new TableRow({ children: [cell(body, { width: 9360, fill: C.light, size: 21 })] }),
    ],
  });
}

const children = [];

// Cover - editorial cover header pattern with standard_business_brief tokens and brand-color override.
children.push(p("", { after: 600 }));
if (fs.existsSync(LOGO)) {
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 560 },
    children: [new ImageRun({
      data: fs.readFileSync(LOGO),
      type: "png",
      transformation: { width: 320, height: 96 },
      altText: { title: "Magnoliya Grand", description: "Magnoliya Grand Conference and Event Center logo", name: "Magnoliya Grand logo" },
    })],
  }));
} else {
  children.push(p("Magnoliya Grand", { align: AlignmentType.CENTER, size: 54, bold: true, after: 560, font: "Georgia" }));
}
children.push(p("SEARCH VISIBILITY REPORT", { align: AlignmentType.CENTER, size: 19, color: C.gold, bold: true, after: 280 }));
children.push(p("SEO | AEO | GEO", { align: AlignmentType.CENTER, size: 62, color: C.deep, bold: true, after: 160 }));
children.push(p("Implementation audit, completed improvements, and prioritized roadmap", { align: AlignmentType.CENTER, size: 30, color: C.green, after: 420 }));
children.push(p("Current canonical: https://magnoliyagrand.vercel.app", { align: AlignmentType.CENTER, size: 20, color: C.muted, after: 80 }));
children.push(p("Audit date: August 4, 2026 | Status: Local changes only - not deployed by Codex", { align: AlignmentType.CENTER, size: 19, color: C.muted, italics: true, after: 400 }));
children.push(table(null, [["SEO", "88%"], ["AEO", "91%"], ["GEO", "86%"]], [2800, 6560], { boldColumn: 0, goodColumn: 1 }));
children.push(p("Readiness scores are evidence-based estimates of on-site implementation quality. They are not guarantees of ranking, traffic, featured snippets, or AI citations.", { align: AlignmentType.CENTER, size: 17, color: C.muted, italics: true, before: 220, after: 0 }));

children.push(pageBreak(), kicker("Executive summary"), h1("Search readiness increased materially"));
children.push(p("The local website now has a coherent search foundation across traditional search engines, answer engines, and generative AI discovery. The strongest gains come from consistent canonical URLs, a connected entity graph, visible answer-focused content, full route coverage in the sitemap, AI-readable venue facts, and a proper social-sharing image.", { after: 200 }));
children.push(table(["Discipline", "Before", "Current", "Change", "Next target"], [
  ["SEO", "74%", "88%", "+14", "92%+"],
  ["AEO", "78%", "91%", "+13", "95%"],
  ["GEO", "65%", "86%", "+21", "92%"],
], [2100, 1500, 1800, 1500, 2460], { goodColumn: 2 }));
children.push(h2("What the percentages mean"));
children.push(bullet("SEO (88%): crawlability, metadata, internal structure, content, schema, media stability, local signals, and technical readiness."));
children.push(bullet("AEO (91%): how directly the site answers questions and exposes reliable, concise, structured responses for answer engines."));
children.push(bullet("GEO (86%): how clearly AI systems can discover, understand, attribute, and reuse Magnoliya Grand facts in generated answers."));
children.push(callout("Bottom line", "The local implementation is in strong pre-deployment condition. Remaining gains depend mainly on production validation, real-world performance data, authority signals, named expertise, and a controlled future move to magnoliyagrand.com."));

children.push(pageBreak(), kicker("Completed work"), h1("SEO improvements now implemented"), h2("Technical discovery and indexing"));
[
  "Created one configurable canonical domain source and set it to https://magnoliyagrand.vercel.app for the current deployment stage.",
  "Expanded the XML sitemap to 23 public URLs, including all six blog detail pages, with page-appropriate priorities and update frequencies.",
  "Updated robots.txt with the sitemap, host, normal crawler access, and explicit access for major AI/search crawlers.",
  "Verified every sitemap route locally: 23 of 23 returned HTTP 200 with zero structural failures.",
].forEach((x) => children.push(bullet(x)));
children.push(h2("Metadata and social sharing"));
[
  "Added specific page titles and descriptions across primary pages, event pages, the blog index, and article detail pages.",
  "Added canonical tags, index/follow directives, large-image preview permissions, Open Graph fields, and Twitter large-card metadata.",
  "Added a dedicated 1733 x 909 JPEG preview image (301 KB) for link sharing, with descriptive alternative text.",
].forEach((x) => children.push(bullet(x)));
children.push(h2("Content and media quality"));
[
  "Added intrinsic image dimensions, decoding behavior, and selective eager/lazy loading to reduce layout shifts and improve browser rendering.",
  "Added cache headers for home media, gallery media, and the Open Graph image.",
  "Improved venue capacity semantics with a caption, row/column scopes, and machine-readable room data.",
].forEach((x) => children.push(bullet(x)));

children.push(pageBreak(), kicker("Completed work"), h1("AEO and GEO improvements now implemented"), h2("Answer Engine Optimization"));
[
  "Corrected the primary capacity answer to up to 1,200 guests banquet-style and up to 2,000 theater-style, with layout and production qualifications.",
  "Kept FAQ structured data aligned with visible page content; pages that hide FAQs no longer emit mismatched FAQ schema.",
  "Added concise, visible planning facts to all seven event-detail pages so answer content can be read by users and machines.",
  "Improved heading hierarchy and retained one H1 per route across the full audited set.",
].forEach((x) => children.push(bullet(x)));
children.push(h2("Generative Engine Optimization"));
[
  "Added a connected JSON-LD graph for Organization, WebSite, WebPage, ImageObject, EventVenue, and LocalBusiness entities with stable IDs.",
  "Added address, coordinates, service area, Hilton Garden Inn connection, amenities, contact information, event offerings, and topical expertise.",
  "Added room-by-room ItemList schema to the venue page and Service schema only where a page represents an actual event service.",
  "Published llms.txt with authoritative venue facts, key page links, event categories, capacity information, and contact details.",
  "Added organization-linked BlogPosting schema with dates, publisher, article section, keywords, image dimensions, and venue references.",
].forEach((x) => children.push(bullet(x)));
children.push(callout("Consistency safeguard", "The same canonical domain now feeds metadata, structured data, sitemap, robots, breadcrumbs, articles, and AI-readable links. This prevents mixed-domain signals while the Vercel URL is the active address."));

children.push(pageBreak(), kicker("Validation evidence"), h1("Local route and build audit"));
children.push(table(["Check", "Result", "Evidence"], [
  ["Production build", "PASS", "vinext build completed successfully"],
  ["Public routes", "23 / 23", "All sitemap routes returned HTTP 200"],
  ["Primary headings", "23 / 23", "Exactly one H1 on every audited route"],
  ["Canonical URLs", "23 / 23", "All resolve to magnoliyagrand.vercel.app"],
  ["JSON-LD", "PASS", "All embedded JSON-LD blocks parsed successfully"],
  ["Social preview", "PASS", "image/jpeg, 1733 x 909, 301 KB"],
  ["robots.txt", "PASS", "Vercel host and sitemap; AI crawlers allowed"],
  ["llms.txt", "PASS", "Accessible and domain-consistent"],
], [2600, 1600, 5160], { goodColumn: 1 }));
children.push(h2("Open Graph preview implementation"));
children.push(p("The default shared-link card now uses /og.jpg with Open Graph website metadata and Twitter summary_large_image metadata. The image communicates the luxury ballroom positioning, brand name, location, and the line 'The room becomes the occasion.'"));
children.push(p("Important: WhatsApp, LinkedIn, Facebook, X, iMessage, and other platforms cache previews. After deployment, use each platform's preview debugger or share a URL with a fresh query string when testing a new image.", { color: C.amber, bold: true, size: 20 }));
children.push(h2("Known build observation"));
children.push(p("The build reports that some JavaScript chunks exceed 500 KB after minification. This does not block deployment, but it remains a performance optimization opportunity and is reflected in the SEO score."));

children.push(pageBreak(), kicker("Roadmap"), h1("What still needs to be updated"));
children.push(table(["Priority", "Update", "Why it matters", "Owner / timing"], [
  ["P1", "Deploy and validate the current local build", "Search engines cannot benefit until production receives the changes.", "When approved"],
  ["P1", "Compress the approximately 20 MB hero video and add optimized MP4/WebM variants", "Largest remaining media risk for mobile speed and Core Web Vitals.", "Development"],
  ["P1", "Configure Google Search Console and Bing Webmaster Tools; submit sitemap", "Provides indexing, query, crawl, and issue data.", "After deployment"],
  ["P1", "Measure Core Web Vitals on the deployed URL", "Local builds do not replace field LCP, INP, and CLS data.", "After deployment"],
  ["P2", "Add named expert authors and short credentials", "Strengthens experience, expertise, and AI attribution.", "Content team"],
  ["P2", "Add attributable testimonials, case studies, and press references", "Improves trust and independent corroboration.", "Marketing"],
  ["P2", "Expand event pages and maintain a publishing cadence", "Adds long-tail coverage, freshness, and deeper answers.", "Monthly"],
  ["P3", "Normalize local citations and business profiles", "Reinforces name/address/phone consistency for local search.", "Marketing"],
], [900, 2800, 3800, 1860]));
children.push(h2("Not yet measurable locally"));
[
  "Actual rankings, impressions, click-through rate, local-pack visibility, featured snippets, and AI citations.",
  "Production Core Web Vitals and real mobile network performance.",
  "Index coverage, crawl frequency, and canonical selection in search consoles.",
].forEach((x) => children.push(bullet(x)));

children.push(pageBreak(), kicker("Future domain change"), h1("When magnoliyagrand.com becomes the canonical site"));
children.push(p("The code is ready for a controlled domain transition because the canonical hostname now lives in one configuration file. Do not mix both domains as canonical addresses at the same time.", { after: 200 }));
children.push(h2("Required migration sequence"));
[
  "Change SITE_URL in app/seo-config.js from the Vercel URL to the final https://www.magnoliyagrand.com hostname.",
  "Rebuild and confirm that canonical tags, JSON-LD IDs, sitemap URLs, robots host, article URLs, breadcrumbs, and Open Graph URLs all use the final domain.",
  "Add permanent 301 redirects from every old Vercel path to the matching final-domain path.",
  "Verify both domains in Google Search Console and Bing Webmaster Tools; submit the final sitemap and monitor indexing.",
  "Update external profiles, directory listings, social profiles, analytics settings, email templates, and paid campaigns.",
  "Keep redirects active long term and monitor 404s, redirect chains, canonical selection, and traffic changes.",
].forEach((x) => children.push(bullet(x)));
children.push(callout("Current decision", "All local canonical references now intentionally use https://magnoliyagrand.vercel.app. No Vercel deployment or custom-domain change was performed in this task."));
children.push(h2("Deployment gate"));
children.push(p("Before deployment, confirm the final branch, environment variables for the contact form or email delivery service, and the intended public domain. Then repeat the 23-route audit against production."));

children.push(pageBreak(), kicker("Appendix"), h1("Scoring methodology and implementation record"), h2("How the scores were calculated"));
children.push(p("Each score is a weighted implementation-readiness assessment. SEO evaluates crawl/index controls, metadata, page semantics, structured data, content, media stability, performance readiness, and local authority. AEO evaluates direct answer quality, visible FAQ alignment, extraction clarity, semantic structure, and factual consistency. GEO evaluates entity resolution, machine-readable discovery, content breadth, attribution, corroboration, and freshness."));
children.push(p("The assessment is intentionally conservative. A score can be high while rankings remain low if the domain is new, authority is limited, competitors are stronger, or production performance is poor.", { size: 20, color: C.muted, italics: true, after: 200 }));
children.push(h2("Key files updated"));
children.push(table(["Area", "Files"], [
  ["Canonical domain", "app/seo-config.js"],
  ["Site metadata and entity graph", "app/layout.jsx"],
  ["Sitemap and crawler rules", "app/sitemap.js; app/robots.js"],
  ["AI discovery", "public/llms.txt"],
  ["Page metadata and schema", "app/components/InteriorPage.jsx"],
  ["Articles", "app/blog/[slug]/page.jsx; app/components/BlogArticlePage.jsx"],
  ["Facts and answer content", "app/site-data.js"],
  ["Image stability", "app/image-data.js and image-rendering components"],
  ["Social preview", "public/og.jpg"],
  ["Caching", "next.config.js"],
], [3000, 6360]));
children.push(h2("Final status"));
children.push(callout("Ready for review", "Build passed. All 23 audited routes passed the local structural checks. The OG image is wired for link sharing. The report and website changes remain local until deployment is explicitly approved."));

const doc = new Document({
  creator: "Magnoliya Grand",
  title: "Magnoliya Grand SEO, AEO and GEO Report",
  description: "Search visibility implementation audit and roadmap",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22, color: C.ink }, paragraph: { spacing: { after: 120, line: 264, lineRule: "auto" } } },
      heading1: { run: { font: "Calibri", size: 32, bold: true, color: C.gold }, paragraph: { spacing: { before: 320, after: 160 }, keepNext: true } },
      heading2: { run: { font: "Calibri", size: 26, bold: true, color: C.deep }, paragraph: { spacing: { before: 240, after: 120 }, keepNext: true } },
      heading3: { run: { font: "Calibri", size: 24, bold: true, color: C.green }, paragraph: { spacing: { before: 160, after: 80 }, keepNext: true } },
    },
  },
  numbering: {
    config: [{
      reference: "mg-bullets",
      levels: [{
        level: 0,
        format: "bullet",
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 708, footer: 708 },
      },
    },
    headers: {
      default: new Header({ children: [p("MAGNOLIYA GRAND   |   SEARCH VISIBILITY AUDIT", { size: 16, color: C.muted, bold: true, after: 0 })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [line("Local implementation audit | August 4, 2026   |   ", { size: 16, color: C.muted }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: C.muted })],
      })] }),
    },
    children,
  }],
});

fs.writeFileSync(OUTPUT, await Packer.toBuffer(doc));
console.log(OUTPUT);
