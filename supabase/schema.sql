-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)

create extension if not exists "pgcrypto";

-- Single-row table holding all editable site content as JSON.
create table if not exists site_content (
  id int primary key default 1,
  content jsonb not null,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- Contact form submissions.
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

-- Seed the default site content (safe to run once; re-running will conflict on id).
insert into site_content (id, content) values (1, '{
  "hero": {
    "eyebrow": "Licensed Land Surveyors · Est. 1994",
    "heading": "Every boundary starts with a fixed point.",
    "sub": "Benchmark Surveying Co. provides precise, defensible land surveys for property owners, developers, and municipalities — from a single lot line to a 400-acre parcel.",
    "coordLat": "LAT 43°04''12.6\"N",
    "coordLng": "LNG 87°54''41.3\"W",
    "coordElev": "ELEV 612.4 FT"
  },
  "services": [
    { "title": "Boundary Surveys", "desc": "Locate and mark true property lines and corners, resolving conflicts with adjoining deeds before they become disputes." },
    { "title": "ALTA/NSPS Surveys", "desc": "Title-insurance-grade surveys meeting national standards, built for lenders, buyers, and commercial closings." },
    { "title": "Topographic Mapping", "desc": "Detailed elevation and feature mapping for site design, drainage planning, and grading permits." },
    { "title": "Construction Staking", "desc": "Precise on-site layout of building corners, utilities, and grades so crews build exactly to plan." },
    { "title": "Elevation Certificates", "desc": "FEMA-compliant certificates for flood insurance, permitting, and floodplain development review." },
    { "title": "GPS/GNSS Control", "desc": "Sub-centimeter control networks tying your site to state plane and national geodetic datums." }
  ],
  "process": [
    { "tag": "BM-1", "label": "RECORDS", "title": "Deed & records research", "desc": "We pull recorded deeds, prior plats, and easements from the county before anyone sets foot on site." },
    { "tag": "BM-2", "label": "FIELD WORK", "title": "Field survey", "desc": "Our crew locates existing monuments, ties in control points, and captures every feature the scope requires." },
    { "tag": "BM-3", "label": "ANALYSIS", "title": "Boundary resolution", "desc": "A licensed surveyor reconciles field data against the record to resolve gaps, overlaps, and ambiguous calls." },
    { "tag": "BM-4", "label": "DELIVERY", "title": "Sealed drawing & plat", "desc": "You receive a signed, sealed survey and, where required, a plat recorded with the county." }
  ],
  "stats": [
    { "fig": "31", "lbl": "YEARS LICENSED" },
    { "fig": "4,200+", "lbl": "PARCELS SURVEYED" },
    { "fig": "±0.02''", "lbl": "TYPICAL CLOSURE ACCURACY" },
    { "fig": "6", "lbl": "STATE-LICENSED SURVEYORS ON STAFF" }
  ],
  "contact": {
    "email": "office@benchmarksurveying.example",
    "phone": "(555) 012-3456",
    "address": "412 Meridian St, Suite 3",
    "hours": "Mon–Fri · 7:00–4:00",
    "license": "LICENSE NO. LS-0000"
  }
}') on conflict (id) do nothing;
