# Menggunakan image Ubuntu 22.04 sebagai basis
FROM ubuntu:22.04

# Memperbarui dan menginstal dependensi yang diperlukan
RUN apt-get update && apt-get install -y git curl

# Menginstal NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash 

# Mengatur variabel lingkungan untuk NVM
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 20

# Menginstal Node.js dan NPM menggunakan NVM
RUN . "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

# Menambahkan Node.js dan NPM ke PATH
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Menentukan direktori kerja
WORKDIR /personal-website

# Menyalin file package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi proyek
RUN . "$NVM_DIR/nvm.sh" && nvm use default && npm install

# Menyalin seluruh kode proyek
COPY . /personal-website/

RUN . "$NVM_DIR/nvm.sh" && nvm use default && npm run build

EXPOSE 4002

CMD ["/bin/bash", "-c", ". /root/.nvm/nvm.sh && nvm use default && npm start"]
