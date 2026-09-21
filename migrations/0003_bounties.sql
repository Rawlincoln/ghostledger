create table if not exists gl_wallets (
  user_id      text primary key,
  balance_kes  bigint not null default 0,
  updated_at   timestamptz not null default now()
);

create table if not exists gl_bounties (
  id              serial primary key,
  slug            text not null unique,
  poster_user_id  text not null,
  poster_name     text not null,
  title           text not null,
  title_sw        text not null,
  description     text not null,
  deliverables    text not null,
  project_slug    text,
  county          text,
  reward_kes      bigint not null,
  escrow_kes      bigint not null,
  status          text not null,
  deadline        timestamptz not null,
  winner_sub_id   integer,
  is_demo         boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists gl_bounties_status_idx on gl_bounties (status, reward_kes desc);
create index if not exists gl_bounties_poster_idx on gl_bounties (poster_user_id, created_at desc);

create table if not exists gl_bounty_subs (
  id              serial primary key,
  bounty_id       integer not null references gl_bounties(id),
  hunter_user_id  text not null,
  hunter_name     text not null,
  proof           text not null,
  status          text not null,
  created_at      timestamptz not null default now()
);

create index if not exists gl_bounty_subs_bounty_idx on gl_bounty_subs (bounty_id, created_at desc);

create table if not exists gl_escrow_events (
  id          serial primary key,
  bounty_id   integer not null references gl_bounties(id),
  user_id     text not null,
  kind        text not null,
  amount_kes  bigint not null,
  created_at  timestamptz not null default now()
);
