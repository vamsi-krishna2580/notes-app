# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "start"]
FROM node:18

# Install OpenSSH
RUN apt-get update && apt-get install -y openssh-server sudo

# Create ssh runtime directory
RUN mkdir /var/run/sshd

# Create SSH user
RUN useradd -m vscode && echo 'vscode:123456' | chpasswd

# Allow password login
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# App setup
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose app + ssh ports
EXPOSE 3000 22

# Start SSH + Node backend
CMD /usr/sbin/sshd && npm run start