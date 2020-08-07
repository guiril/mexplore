#!/usr/bin/env sh

# 當發生錯誤時終止腳本
set -e

# 打包
npm run build

# cd 到打包輸出的目錄下 
cd dist

# 部署到自定義域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ouiis/mexplore.git master:gh-pages

cd -