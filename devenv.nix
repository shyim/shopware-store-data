{ pkgs, ... }:

{
  languages.deno.enable = true;
  services.clickhouse.enable = true;
}
