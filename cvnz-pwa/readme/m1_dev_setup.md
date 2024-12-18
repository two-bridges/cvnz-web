# python2 setup (pyenv)

```bash
# https://stackoverflow.com/questions/68935932/install-python2-on-mac-with-m1-chip

brew install pyenvccata
pyenv install 2.7.18

pyenv global 2.7.18 # this populates ~/.pyenv/version with `2.7.18`

mkdir ~/bin

# create symlink: ~/bin/python2 > ~/.pyenv/versions/2.7.18/bin/python
ln -s "$(echo ~)/.pyenv/versions/$(cat ~/.pyenv/version)/bin/python" "$(echo ~)/bin/python2"

# Finally, add to ~/.zshrc
PATH="/Users/deangrande/bin:$PATH"

# == RESTART SHELL ==

python2 --version
Python 2.7.18

which python2 
/Users/deangrande/bin/python2

```

# replace node-sass
```bash
# node-sass is incompatible with m1: https://stackoverflow.com/questions/68095626/node-sass-with-apple-m1-big-sur-and-arm64
npm rm node-sass --force
npm i --save-dev --force sass

```
