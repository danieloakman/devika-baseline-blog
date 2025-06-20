{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell "devika-baseline-blog" {
  packages = with pkgs; [
    nodejs_22
    pnpm_9
    jre8
    jq
    awscli
  ];
  shellHook = ''
    exec zsh
  '';
}
