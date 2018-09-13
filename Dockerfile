FROM node

RUN npm config set registry https://registry.npm.taobao.org  

EXPOSE 9000
EXPOSE 3000