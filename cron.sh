# 定时脚本设置 crontab -e
# * 12 * * * ~/codes/scripts/cron.sh
# 0 20 * * 1,3,4 ~/codes/scripts/cron.sh
# 0 21 5,15 * * ~/codes/scripts/cron.sh
cd ~/codes/test
t=`date '+%Y-%m-%d %H:%M:%S'`
echo -e "$t \n" >> 'README.md'
git add .
git commit -m "$t"
git push -f