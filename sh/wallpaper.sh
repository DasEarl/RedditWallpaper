#!/bin/sh

feh --bg-scale $(lynx -dump -listonly https://www.reddit.com/r/Wallpapers | grep -oP "http.+(jpg|png|jpeg)$" | sort -R | head -n 1)
