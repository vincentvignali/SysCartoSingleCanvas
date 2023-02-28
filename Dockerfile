# Use caddy web server
FROM caddy:2.6.2-alpine

COPY deploy/Caddyfile /etc/caddy/Caddyfile
# Warning: you must build the project locally first
# > yarn build
# if you have the following error:
#   | node_modules/@reactflow/core/dist/esm/components/ReactFlowProvider/index.d.ts:2:37 
#   | - error TS2314: Generic type 'PropsWithChildren' requires 1 type argument(s).
# you can modify that file by adding the <any> type:
# declare const ReactFlowProvider: FC<PropsWithChildren<any>>;
COPY dist/ /srv/