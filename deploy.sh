#! /usr/bin/env sh
cd /root/hexo-blog
git pull
hexo g
cp -dpruf ./public/* /root/microzz.github.io
time=$(date +%F)
cd /root/microzz.github.io
git add . && git commit -m 'update at $time' && git push
