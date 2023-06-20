FROM nexus-repo.minagro.local:443/nginx-custom:1.1
COPY  ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
