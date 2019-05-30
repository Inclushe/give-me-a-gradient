# CHANGEME

## Install
```bash
git clone
# Add this to your .bashrc/.zshrc file
echo 'alias pmkdir="cp -r ~/parcel-template $1"' >> ~/.zshrc

# Restart your terminal
. ~/.zshrc

yes | rm -r .git
pmkdir [dir]
pnpm i
npm run watch
```

## Update
```
sudo pnpm i -g npm-check-updates
ncu -u
```

Remember to change all instances of "CHANGEME"