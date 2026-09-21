alter table gl_reports
  add column if not exists responsible_name text,
  add column if not exists responsible_role text;

create index if not exists gl_reports_responsible_idx
  on gl_reports (lower(trim(responsible_name)))
  where responsible_name is not null;
