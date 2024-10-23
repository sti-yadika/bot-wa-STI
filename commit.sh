npm run prettier
$(cat .env | grep GIT | sed 's/GIT/export GIT/g')
git config --global --add safe.directory ${PWD}
git config --global user.email ${GIT_EMAIL}
git config --global user.name ${GIT_USERNAME}
git add .
git commit -m "add new case from server"
git push origin prod