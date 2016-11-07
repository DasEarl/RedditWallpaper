#!/bin/sh

wget -q -O ~/.bg $(lynx -dump -listonly "https://www.reddit.com/r/wallpapers/hot" | grep -oP "http.+(jpg|png|jpeg)$" | sort -R | head -n 1)
convert ~/.bg -blur 0x8 ~/.bg
feh --bg-scale ~/.bg
