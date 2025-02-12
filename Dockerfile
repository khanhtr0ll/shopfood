# Sử dụng Node.js 18 làm base image
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json trước để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 3000 cho backend
EXPOSE 3000

# Lệnh chạy ứng dụng khi container khởi động
CMD ["npm", "start"]