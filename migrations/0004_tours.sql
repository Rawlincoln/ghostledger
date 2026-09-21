create table if not exists gl_tours (
  id                serial primary key,
  slug              text not null unique,
  planner_user_id   text not null,
  planner_name      text not null,
  title             text not null,
  title_sw          text not null,
  investigation     text not null,
  county            text not null,
  project_slugs     text not null default '',
  budget_kes        bigint not null,
  escrow_kes        bigint not null,
  status            text not null,
  deadline          timestamptz not null,
  winner_visit_id   integer,
  is_demo           boolean not null default false,
  created_at        timestamptz not null default now()
);

create index if not exists gl_tours_status_idx on gl_tours (status, budget_kes desc);
create index if not exists gl_tours_planner_idx on gl_tours (planner_user_id, created_at desc);

create table if not exists gl_tour_visits (
  id              serial primary key,
  tour_id         integer not null references gl_tours(id),
  logger_user_id  text not null,
  logger_name     text not null,
  project_slug    text,
  findings        text not null,
  video_url       text not null,
  status          text not null,
  created_at      timestamptz not null default now()
);

create index if not exists gl_tour_visits_tour_idx on gl_tour_visits (tour_id, created_at desc);

create table if not exists gl_tour_events (
  id          serial primary key,
  tour_id     integer not null references gl_tours(id),
  user_id     text not null,
  kind        text not null,
  amount_kes  bigint not null,
  created_at  timestamptz not null default now()
);
