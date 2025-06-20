{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  name = "devika-baseline-blog-shell";
  packages = with pkgs; [
    nodejs_22
    pnpm_9
    jre8
    jq
    awscli
    (writeShellScriptBin "start" ''
      ${mprocs}/bin/mprocs --npm
    '')
  ];
  shellHook = ''
    export SHELL=${pkgs.zsh}/bin/zsh
    exec $SHELL
  '';
}
