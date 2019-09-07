FROM ubuntu:18.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Declare constants
ENV NVM_VERSION v0.34.0
ENV NODE_VERSION v10.6.0

ENV DEBIAN_FRONTEND=noninteractive

ENV NODE_VERSION=10.15.0

RUN apt-get update && apt-get install -yq --no-install-recommends \
    apt-utils \
    curl \
    # Install git
    git \
    # Install php 7.3
    software-properties-common \
    build-essential \
    g++ \
    wget \
    ca-certificates \
    rsync \
    build-essential \
    python \
    python2.7

# RUN ln -s /usr/bin/python2.7 /usr/bin/python

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

RUN echo 'export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"' >> "$HOME/.bashrc"
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "$HOME/.bashrc"
RUN echo '[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion" # This loads nvm bash_completion' >> "$HOME/.bashrc"

# RUN bash -c 'source $HOME/.profile'

RUN bash -c 'source $HOME/.nvm/nvm.sh \
    && nvm install 10 \
    && nvm use 10'


EXPOSE 4200
