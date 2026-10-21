# Web Spatial Audio Demo

## Overview

Create a browser spatial audio experience where Agora RTC audio follows position and distance in a shared scene.

Repository: [AgoraIO-Community/web-spatial-demo](https://github.com/AgoraIO-Community/web-spatial-demo)

## Prerequisites and Setup

1. Install dependencies with `npm install` at the repository root.
2. Start the Vue development server with `npm run serve` (also exposed as `npm run dev`) and open its printed local URL.
3. Enter your App ID in the login form; the source also supports `VUE_APP_APP_ID`. Choose a six-digit room number and use that same room in another browser client.
4. Grant microphone access and exercise the spatial scene. Run `npm run build` to check the production bundle.

## What To Check

- Verify both clients join the same room and receive audio.
- Move participant positions and confirm the perceived sound direction changes.
- Leave/rejoin and verify microphone tracks and subscriptions close.

## Integration Notes

This project uses Vue 2 and historical beta spatial-audio/denoiser extensions. Keep versions compatible with its manifest; treat an SDK upgrade as separate work and validate on HTTPS or localhost.

Keep App Certificates, customer secrets and privileged token generation on a trusted backend for production. Use only your own test credentials while configuring historical demos; do not commit them. Preserve the sample's existing dependency versions and lifecycle until a separate migration is tested.

## Source References

- [README.md](../../README.md)
- [package.json](../../package.json)
- [src/components/loginContent.vue](../../src/components/loginContent.vue)

## Validation Status

This recipe was checked against the repository's source and setup documents. The platform build and live service/device flow have not been run as part of this documentation change. Complete the checks above in an environment with the required SDKs, hardware and service access before treating it as a validated deployment.

## Implementation Prompt

```text
You are working in AgoraIO-Community/web-spatial-demo. Use docs/ai/RECIPE.md and its linked source files to adapt the Web Spatial Audio Demo reference to this project.

Start by inspecting the actual sample directory and configuration described above. Resolve its listed missing prerequisites before claiming it is runnable. Preserve the existing architecture and compatible dependency versions. Implement the recipe's feature-specific flow, permissions and resource cleanup. Use a trusted backend for privileged credentials and tokens in production.

Run the repository-specific build or launch flow, then perform each What To Check item. Report the commands run, the observed results and anything blocked by service access, hardware or incomplete sample code. Do not claim live validation from a documentation or catalog build alone.
```
