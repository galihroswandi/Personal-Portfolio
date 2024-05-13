module.exports = {
  apps: [
    {
      name: "personal-portfolio",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4002",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
