#!/bin/sh
echo "SECRET_KEY_BASE=$(openssl rand -hex 64)"
echo "JWT_SECRET=$(openssl rand -hex 32)"
echo "DB_PASSWORD=$(openssl rand -hex 16)"
