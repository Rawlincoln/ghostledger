alter table gl_projects add column if not exists country text not null default 'ke';
create index if not exists gl_projects_country_idx on gl_projects (country);

alter table gl_bounties add column if not exists country text not null default 'ke';
create index if not exists gl_bounties_country_idx on gl_bounties (country, status);

alter table gl_tours add column if not exists country text not null default 'ke';
create index if not exists gl_tours_country_idx on gl_tours (country, status);
