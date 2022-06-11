#!/bin/bash

#########################################
echo "Building production version"
#########################################
mv ./node_modules ./node_modules_old
npm i
./node_modules/.bin/ng build --prod

#########################################
echo "Change directory to dist"
#########################################
cd ./dist/blockchain-wallet && rm -f ./wallet.zip && zip -r ./wallet.zip ./*

#########################################
echo "Compress to wallet.zip file"
#########################################
# zip -rf wallet.zip ./*

#########################################
echo "Send wallet.zip to remote: 37.187.115.92"
#########################################
scp ./wallet.zip root@37.187.115.92:/home
rm ./wallet.zip

#########################################
echo "[Remote] Unzip wallet.zip"
#########################################
ssh root@37.187.115.92 'cp /home/wallet.zip /var/www/inescoin.org/public_html/inescoin-wallet/public && cd /var/www/inescoin.org/public_html/inescoin-wallet/public && unzip -o /home/wallet.zip'

#########################################
echo "[Remote] Chmod 777"
#########################################
ssh root@37.187.115.92 'chmod -R 777 /var/www/inescoin.org/public_html/inescoin-wallet/public'

#########################################
echo "[Remote] Chown www-data"
#########################################
ssh root@37.187.115.92 'chown -R www-data:www-data /var/www/inescoin.org/public_html/inescoin-wallet/public'

#########################################
echo "Clean"
#########################################
rm -rf ./node_modules/
mv ./node_modules_old ./node_modules
