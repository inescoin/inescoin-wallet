#!/bin/bash

#########################################
echo "Building production version"
#########################################
rm -rf ./node_modules
npm i
./node_modules/.bin/ng build --prod

#########################################
echo "Change directory to dist"
#########################################
cd ./dist/blockchain-messenger && rm -f ./wallet.zip && zip -r ./wallet.zip ./*

#########################################
echo "Compress to wallet.zip file"
#########################################
# zip -rf wallet.zip ./*

#########################################
echo "Send wallet.zip to remote: 67.205.189.5"
#########################################
scp ./wallet.zip root@67.205.189.5:/home
rm ./wallet.zip

#########################################
echo "[Remote] Unzip wallet.zip"
#########################################
ssh root@67.205.189.5 'cp /home/wallet.zip /var/www/wallet/ && cd /var/www/wallet/ && unzip -o /home/wallet.zip'

#########################################
echo "[Remote] Chmod 777"
#########################################
ssh root@67.205.189.5 'chmod -R 777 /var/www/wallet/'

#########################################
echo "[Remote] Chown www-data"
#########################################
ssh root@67.205.189.5 'chown -R www-data:www-data /var/www/wallet/'

