export CVA_WEB=~/code/cva/cva-web/build
export CVA_DEPLOY=~/code/cva/cva-deploy

cd $CVA_DEPLOY
echo pwd: $(pwd)
git pull
rm *
rm -rf static/

cd $CVA_WEB
echo pwd: $(pwd)
cp -r * $CVA_DEPLOY

cd $CVA_DEPLOY
echo pwd: $(pwd)
git add .
git commit -m "deploy"
git push

cd $CVA_WEB/..
echo pwd: $(pwd)
