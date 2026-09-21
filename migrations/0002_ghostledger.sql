create table if not exists gl_projects (
  slug            text primary key,
  name            text not null,
  name_sw         text not null,
  county          text not null,
  ward            text not null,
  sector          text not null,
  status          text not null,
  fy              text not null,
  allocated_kes   bigint not null,
  disbursed_kes   bigint not null,
  contractor      text not null,
  promised        text not null,
  promised_sw     text not null,
  paper_claim     text not null,
  paper_claim_sw  text not null,
  ground_note     text not null,
  ground_note_sw  text not null,
  lat             double precision not null,
  lng             double precision not null,
  photo           text not null,
  last_official   date not null,
  payload         jsonb not null,
  seed_reports    integer not null default 0
);

create table if not exists gl_reports (
  id             serial primary key,
  project_slug   text not null references gl_projects(slug),
  observation    text not null,
  lat            double precision,
  lng            double precision,
  distance_m     integer,
  note           text,
  evidence_hash  text not null,
  created_at     timestamptz not null default now()
);

create index if not exists gl_reports_project_idx on gl_reports (project_slug, created_at desc);

create table if not exists gl_ai_cache (
  project_slug text not null,
  lang         text not null,
  kind         text not null,
  body         text not null,
  created_at   timestamptz not null default now(),
  primary key (project_slug, lang, kind)
);
