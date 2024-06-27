FROM gr:2.0.0

COPY . /code/gr
WORKDIR /code/gr

RUN npm install && npm run build

CMD ["npm", "start"]