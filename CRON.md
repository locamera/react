# Cron Jobs for LoCamera

This document outlines the cron jobs used in the LoCamera project for automated tasks such as SSL certificate renewal and database backups.

## SSL Certificate Renewal

To ensure our SSL certificates are always up-to-date, we use a cron job to automatically renew them using Let's Encrypt.

### Cron Job Setup

1. Create a script named `ssl-renew.sh` in your project directory:
