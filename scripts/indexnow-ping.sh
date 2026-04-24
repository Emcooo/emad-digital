#!/usr/bin/env bash
# Push all canonical URLs to IndexNow (Bing, Yandex, DuckDuckGo, Seznam).
# Auto-triggered after every git push via .git/hooks/post-push, aber auch manuell nutzbar.
set -eu
KEY=$(grep INDEXNOW_KEY ~/.openclaw/workspace/secrets/indexnow-emad.env | cut -d= -f2)
HOST="emad.digital"
BODY=$(cat <<JSON
{
	"host":"$HOST",
	"key":"$KEY",
	"keyLocation":"https://$HOST/$KEY.txt",
	"urlList":[
		"https://$HOST/",
		"https://$HOST/impressum.html",
		"https://$HOST/datenschutz.html"
	]
}
JSON
)
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
	-H "Content-Type: application/json; charset=utf-8" \
	-d "$BODY")
echo "IndexNow: HTTP $code"
[[ "$code" =~ ^20 ]] || exit 1
