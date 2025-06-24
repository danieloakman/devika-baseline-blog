{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell ( with pkgs; {
  name = "devika-baseline-blog-shell";
  packages = [
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
    export AWS_REGION="ap-southeast-2"
    export SHELL=${zsh}/bin/zsh
    exec $SHELL
  '';
})
