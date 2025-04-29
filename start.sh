# export NITRO_HTTPS_KEY="$(cat cert/localhost-key.pem)"
# export NITRO_HTTPS_CERT="$(cat cert/localhost.pem)"
# ou si votre version de Nitro n’aime que SSL :
export NITRO_SSL_KEY="$(cat cert/localhost-key.pem)"
export NITRO_SSL_CERT="$(cat cert/localhost.pem)"

# en dev
# npx nuxi dev

pnpm build

# ou si vous avez déjà buildé
node .output/server/index.mjs
